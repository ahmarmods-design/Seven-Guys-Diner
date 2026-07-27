---
name: CMS Architecture
description: Full CMS implementation for Seven Guys — all schema, API routes, context, admin pages, and public component wiring.
---

## Status: Complete (all 18 pages registered, TypeScript clean)

## Key CMS keys stored in DB
- `deals` — `CMSDeal[]` (with startDate, endDate, imageUrl)
- `menu` — `CMSMenuData` (Record<categoryName, CMSMenuItem[]>)
- `categories` — `string[]`
- `branches` — `CMSBranch[]`
- `business_hours` — `CMSBusinessHours`
- `gallery` — `CMSGalleryItem[]`
- `reviews` — `CMSReview[]`
- `homepage` — `CMSHomepage` (heroTagline, heroDescription, heroTitle, heroSubtitle, heroCtaPrimary, heroCtaSecondary, bannerImages)
- `website` — `CMSWebsiteSettings` (phone, whatsapp, email, address, footer, social, SEO, ogImage)
- `delivery` — `CMSDeliverySettings` (available, minimumOrder, deliveryCharge, freeDeliveryAbove, estimatedTime, areas, note)

## Admin navigation
- `AdminNavContext` (`src/admin/context/AdminNavContext.tsx`) provides `navigate(key)` globally.
- Pages that need to navigate (DashboardHome, WebsiteSettings) use `useAdminNav()` hook.
- `AdminLayout` renders `<PageComponent />` without props — all navigation via context.
- Sidebar has all 18 items grouped: Content, Locations, Online, Website, System.

## Auth
- Password: `sevenguys@7890` (hardcoded, checked client-side in AdminAuthContext)
- Header: `x-admin-password` sent with every CMS API call

## Critical rules
- **Why ogImage in `CMSWebsiteSettings`**: SEOSettings.tsx reads/writes `data.ogImage`; must stay in the type.
- **Why `delivery` is a separate CMS key**: delivery settings are independent from website branding/contact info; avoids merge conflicts between sub-pages.
- **Express v5 params**: always narrow with `Array.isArray(req.params.x) ? req.params.x[0] : req.params.x`.
- **DB project references**: after schema changes in `lib/db`, run `cd lib/db && npx tsc -p tsconfig.json` before API server TypeScript checks.
- **Gallery fallback**: empty CMS gallery → static @assets mosaic; non-empty → CMS responsive grid.
- **Branch image fallback**: `branch.imageUrl` → `FALLBACK_IMAGES[branch.id]` keyed by `br1/br2/br3`.
- **`useIsMobile()` over Tailwind CSS** for all mobile conditional rendering (Tailwind v4 `hidden md:block` unreliable here).

## How to apply
Any new admin page: create in `src/admin/pages/`, export named function, add to `PAGE_REGISTRY` in `AdminLayout.tsx`, add nav item to `NAV_ITEMS` in `AdminSidebar.tsx`. Use `useCMSPage<T>(key, DEFAULT)` for load/save. Use `SaveBar` component for bottom save bar.
