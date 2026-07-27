import { Readable } from "stream";
import { Router, type IRouter, type Request, type Response } from "express";
import { db, cmsData } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ObjectStorageService, ObjectNotFoundError } from "../lib/objectStorage";

const ADMIN_PASSWORD = "sevenguys@7890";
const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

// ── SSE client registry ───────────────────────────────────────────────────────
// Keeps a set of active SSE response objects; broadcast whenever CMS data changes.
const sseClients = new Set<Response>();

function broadcastCmsUpdate(key: string) {
  const payload = JSON.stringify({ key, ts: Date.now() });
  for (const client of sseClients) {
    try {
      client.write(`event: cms-update\ndata: ${payload}\n\n`);
    } catch {
      sseClients.delete(client);
    }
  }
}

function isAdmin(req: Request): boolean {
  return req.headers["x-admin-password"] === ADMIN_PASSWORD;
}

// ── GET /cms/events ─ Server-Sent Events stream ───────────────────────────────
// Must be registered BEFORE /cms/:key so "events" is not treated as a key param.
router.get("/cms/events", (req: Request, res: Response) => {
  res.setHeader("Content-Type",  "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection",    "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable nginx buffering if proxied
  res.flushHeaders();

  // Send an initial "connected" event so the client knows the stream is live.
  res.write("event: connected\ndata: {}\n\n");

  sseClients.add(res);

  // Heartbeat every 20 s — keeps the connection alive through load balancers/proxies.
  const heartbeat = setInterval(() => {
    try {
      res.write(": heartbeat\n\n");
    } catch {
      clearInterval(heartbeat);
      sseClients.delete(res);
    }
  }, 20_000);

  req.on("close", () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

// ── GET /cms ─ return all keys as { key: value } map ─────────────────────────
router.get("/cms", async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(cmsData);
    const result: Record<string, unknown> = {};
    for (const row of rows) result[row.key] = row.value;
    res.json({ success: true, data: result });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch CMS data" });
  }
});

// ── POST /cms/uploads/request-url ─ presigned GCS upload (admin only) ────────
router.post("/cms/uploads/request-url", async (req: Request, res: Response) => {
  if (!isAdmin(req)) { res.status(401).json({ success: false, error: "Unauthorized" }); return; }
  const { name, contentType } = req.body ?? {};
  if (!name || !contentType) {
    res.status(400).json({ success: false, error: "name and contentType required" });
    return;
  }
  try {
    const uploadUrl  = await objectStorageService.getObjectEntityUploadURL();
    const objectPath = objectStorageService.normalizeObjectEntityPath(uploadUrl);
    res.json({ success: true, uploadUrl, objectPath });
  } catch (err) {
    req.log.error({ err }, "Upload URL error");
    res.status(500).json({ success: false, error: "Failed to generate upload URL" });
  }
});

// ── GET /cms/:key ─────────────────────────────────────────────────────────────
router.get("/cms/:key", async (req: Request, res: Response) => {
  const key = Array.isArray(req.params.key) ? req.params.key[0] : req.params.key;
  try {
    const [row] = await db.select().from(cmsData).where(eq(cmsData.key, key));
    if (!row) { res.status(404).json({ success: false, error: "Not found" }); return; }
    res.json({ success: true, data: row.value });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch" });
  }
});

// ── PUT /cms/:key ─ upsert + broadcast (admin only) ───────────────────────────
router.put("/cms/:key", async (req: Request, res: Response) => {
  if (!isAdmin(req)) { res.status(401).json({ success: false, error: "Unauthorized" }); return; }
  const key = Array.isArray(req.params.key) ? req.params.key[0] : req.params.key;
  try {
    const now = new Date();
    await db
      .insert(cmsData)
      .values({ key, value: req.body as unknown, updatedAt: now })
      .onConflictDoUpdate({ target: cmsData.key, set: { value: req.body as unknown, updatedAt: now } });

    // Notify all connected SSE clients immediately.
    broadcastCmsUpdate(key);

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to save" });
  }
});

// ── GET /storage/public-objects/* ─ serve public assets ──────────────────────
router.get("/storage/public-objects/*filePath", async (req: Request, res: Response) => {
  try {
    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join("/") : raw;
    const file = await objectStorageService.searchPublicObject(filePath);
    if (!file) { res.status(404).json({ error: "File not found" }); return; }
    const response = await objectStorageService.downloadObject(file);
    res.status(response.status);
    response.headers.forEach((v, k) => res.setHeader(k, v));
    if (response.body) {
      Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(res);
    } else { res.end(); }
  } catch (err) {
    req.log.error({ err }, "Error serving public object");
    res.status(500).json({ error: "Failed to serve" });
  }
});

// ── GET /storage/objects/* ─ serve uploaded CMS images (no auth required) ────
router.get("/storage/objects/*path", async (req: Request, res: Response) => {
  try {
    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join("/") : raw;
    const objectPath   = `/objects/${wildcardPath}`;
    const objectFile   = await objectStorageService.getObjectEntityFile(objectPath);
    const response     = await objectStorageService.downloadObject(objectFile);
    res.status(response.status);
    response.headers.forEach((v, k) => res.setHeader(k, v));
    if (response.body) {
      Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(res);
    } else { res.end(); }
  } catch (err) {
    if (err instanceof ObjectNotFoundError) {
      res.status(404).json({ error: "Not found" }); return;
    }
    req.log.error({ err }, "Error serving object");
    res.status(500).json({ error: "Failed to serve" });
  }
});

export default router;
