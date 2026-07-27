---
name: Seven Guys CMS Architecture
description: Complete CMS system built for the Seven Guys restaurant website — storage, API, admin panel, and public wiring.
---

## Architecture

- **Storage**: PostgreSQL table `cms_data (key TEXT PK, value JSONB, updated_at TIMESTAMPTZ)` via `@workspace/db` Drizzle ORM.
- **API routes**: All in `artifacts/api-server/src/routes/cms.ts`, mounted in `routes/index.ts`.
  - `GET /api/cms` — returns all keys as `{ key: value }` map
  - `POST /api/cms/uploads/request-url` — presigned GCS upload URL (x-admin-password required)
  - `GET /api/cms/:key` — single key
  - `PUT /api/cms/:key` — upsert (x-admin-password required)
  - `GET /api/storage/objects/*path` — serve uploaded images (no auth)
  - `GET /api/storage/public-objects/*filePath` — serve public assets
- **CMS keys**: `deals`, `menu`, `categories`, `branches`, `business_hours`, `gallery`, `reviews`, `homepage`, `website`
- **Admin auth**: `x-admin-password: sevenguys@7890` header for all mutating API calls
- **Image upload flow**: POST to `/api/cms/uploads/request-url` → PUT file to GCS presigned URL → serve at `/api/storage/objects/<uuid>`

## Frontend

- **CMSContext**: `artifacts/seven-guys/src/context/CMSContext.tsx` — polls `/api/cms` every 30s, falls back to hardcoded defaults if empty.
- **Admin API client + hook**: `src/admin/lib/api.ts` — `cmsGet`, `cmsSave`, `uploadFile`, `useCMSPage<T>` hook.
- **Shared admin components**: `SaveBar.tsx`, `ImageUploader.tsx` in `src/admin/components/`.
- **9 admin pages**: MenuManager, DealsManager, CategoryManager, BranchSettings, BusinessHours, GalleryManager, ReviewsManager, HomepageContent, WebsiteSettings.
- **Public components wired to CMS**: Deals, Reviews, Gallery, Branches, ContactAndFooter, MenuSection.

## Key Decisions

- **Gallery fallback**: If CMS gallery is empty, Gallery component shows static @assets mosaic. Once admin uploads images, CMS gallery takes over with simpler grid layout.
- **Branch images**: Branch component checks `branch.imageUrl`; falls back to hardcoded @assets import keyed by branch id (`br1`, `br2`, `br3`).
- **MenuSection**: Uses `useCMS().menu` and `useCMS().categories`; normalizes CMS types to legacy card types so PizzaCard/SimpleCard need no changes.
- **TypeScript project references**: After adding new schema files to `lib/db`, always run `cd lib/db && npx tsc -p tsconfig.json` to regenerate `.d.ts` in `dist/` before checking API server types.
- **Express v5 route params**: `req.params.key` is `string | string[]` in Express v5 — always narrow with `Array.isArray(req.params.key) ? req.params.key[0] : req.params.key`.

**Why:**
- Progressive enhancement: defaults baked in so site looks identical before admin makes changes.
- No Replit Auth in admin — simple `x-admin-password` header avoids OAuth complexity for a single-owner restaurant.
