// Admin API client — all calls go to /api (the API server's preview path)

const ADMIN_PASSWORD = "sevenguys@7890";

const adminHeaders = (extra?: Record<string, string>) => ({
  "Content-Type": "application/json",
  "x-admin-password": ADMIN_PASSWORD,
  ...extra,
});

export async function cmsGet<T>(key: string): Promise<T | null> {
  try {
    const res = await fetch(`/api/cms/${key}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export async function cmsSave<T>(key: string, value: T): Promise<void> {
  const res = await fetch(`/api/cms/${key}`, {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Save failed");
  }
}

export async function uploadFile(file: File): Promise<string> {
  // 1. Get presigned URL
  const urlRes = await fetch("/api/cms/uploads/request-url", {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({ name: file.name, contentType: file.type }),
  });
  if (!urlRes.ok) throw new Error("Failed to get upload URL");
  const { uploadUrl, objectPath } = await urlRes.json();

  // 2. Upload directly to GCS
  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  // 3. Return the serve URL — objectPath is "/objects/<uuid>"
  const id = objectPath.replace(/^\/objects\//, "");
  return `/api/storage/objects/${id}`;
}

// ── React hook ────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useCMSPage<T>(key: string, defaults: T) {
  const [data,     setData]     = useState<T>(defaults);
  const [original, setOriginal] = useState<T>(defaults);
  const [loading,  setLoading]  = useState(true);
  const [status,   setStatus]   = useState<SaveStatus>("idle");

  useEffect(() => {
    cmsGet<T>(key).then((d) => {
      if (d !== null) { setData(d); setOriginal(d); }
      setLoading(false);
    });
  }, [key]);

  const save = useCallback(async () => {
    setStatus("saving");
    try {
      await cmsSave(key, data);
      setOriginal(data);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [key, data]);

  const cancel = useCallback(() => {
    setData(original);
    setStatus("idle");
  }, [original]);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  return { data, setData, loading, status, save, cancel, isDirty };
}
