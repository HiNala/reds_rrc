# Rebuild Progress

## Status: In Progress

Multiple agents working in parallel. Lead agent owns foundations (scaffold,
shadcn/theme, root layout, forms, API routes, db, analytics lib, admin). Wedge
agents own disjoint file sets and coordinate via this file + `decisions.md` +
`task-list.json`.

## In Progress

(none — both wedges complete)

## QA Pass (2026-07-01)

**Role:** QA/bugfix — diagnose and resolve cross-cutting type/build errors
left by concurrent development.

**Fixes applied:**
1. `src/content/blog/registry.ts` — fixed broken import
   (`./kitchen-bath-remodel-roi` → `./kitchen-bath-roi`) to match actual
   filename.
2. `src/lib/site-config.ts` — added missing `siteConfig` and `absoluteUrl`
   exports required by `src/components/seo/json-ld.tsx` and blog pages.
3. `src/components/forms/multi-step-quote-form.tsx` — added `as never` cast
   on `zodResolver(quoteSchema)` to resolve the zod input/output type
   mismatch caused by `newsletterOptIn: z.boolean().optional().default(false)`
   (output type has `newsletterOptIn: boolean` required; zodResolver infers
   input type where it's optional). Matches the pattern already used in
   `contact-form.tsx`.

**Issues observed and resolved by other agents during QA:**
- `pg` (Node.js PostgreSQL client) was being bundled into client components
  via `@/lib/analytics` → `@/db/client` → `pg`. Fixed by splitting analytics
  into `@/lib/analytics` (client-safe) and `@/lib/analytics-server`
  (server-only with `import "server-only"`).
- DB schema `id` type mismatch (uuid → serial) and missing columns —
  resolved by the lead agent's schema refactor before QA pass completed.

**Final verification:**
- `npx tsc --noEmit` → EXIT=0 (clean)
- `npm run lint` → clean (no errors)
- `npm run build` → EXIT=0, 49 pages generated (Turbopack)
- `npm test` → 23/23 tests pass (3 test files)

**Remaining warnings (non-blocking):**
- Multiple lockfiles detected (parent `pnpm-lock.yaml` + repo
  `package-lock.json`) — set `turbopack.root` in `next.config.ts` or remove
  the parent lockfile.
- `middleware` file convention deprecated in Next.js 16 → rename to
  `proxy.ts`.
- `DATABASE_URL` not set at build time — expected; DB-backed routes are
  dynamic (ƒ) and will connect at runtime.

## Completed Missions / Wedges

- **wedge:trust-services** (page builds: /services + /services/[slug], /story, /clients, /book-online; reusable FAQ + CTA band + section heading components) — DONE, type-clean
  - Pages: `/services` (3 service tiles + trust band + CTA), `/services/[slug]` (generateStaticParams + generateMetadata + Breadcrumb/LocalBusiness JSON-LD + FAQ section with FAQPage JSON-LD + CTA), `/story` (founder story + values + portrait + CTA), `/clients` (testimonials grid + project gallery + CTA), `/book-online` (embedded scheduler via NEXT_PUBLIC_BOOKING_URL or fallback to /contact + call).
  - Content: `src/content/services/detail.ts` (per-service intro, includes, process steps, FAQ).
  - Assets: code-based SVGs in `public/services/`, `public/story/`, `public/clients/`.
  - Reusable: `src/components/site/faq.tsx` (native `<details>` + FAQPage JSON-LD), `src/components/site/cta-band.tsx` (tracked CTA + call link), `src/components/site/section-heading.tsx`.
  - Consumes the lead's content layer (`SITE`, `SERVICES`, `VALUES`, `TESTIMONIALS`, `PRIMARY_CTA` from `src/lib/site-config.ts`).
  - Sitemap updated to include `/services/[slug]` routes.
  - Tasks: T014, T015, T019, T020 completed.

- **wedge:blog-seo** (Mission 12 Blog + Mission 06 SEO/GEO + legal pages) — DONE, type-clean
  - Blog: 5 research-grounded TSX articles in `src/content/blog/` + registry;
    code-based SVG thumbnails in `public/blog/`; `/blog` index, `/blog/[slug]`
    (generateStaticParams + generateMetadata + Article/FAQ/Breadcrumb JSON-LD),
    `/blog/tag/[tag]`, `/blog/rss.xml` RSS 2.0 feed.
  - SEO/GEO: `src/app/sitemap.ts`, `src/app/robots.ts`, `public/llms.txt`,
    `src/components/seo/json-ld.tsx` (LocalBusiness/GeneralContractor, WebSite,
    Article, BreadcrumbList, FAQPage), per-page metadata for blog + legal pages.
  - Legal: `/privacy`, `/terms` (review-by-attorney noted).
  - Analytics: blog CTA clicks instrumented via `src/components/analytics/track-click.tsx`
    (fire-and-forget POST to `/api/track`).
  - Helpers: `src/lib/site-config.ts` (NAP + base URL), `src/lib/format.ts`.
  - Tasks: T022 completed; T025 + T026 in_progress (pending: marketing-page
    metadata + root-layout JSON-LD wiring, owned by lead).

## Notes for the integrator (lead)

1. ✅ DONE (2026-07-02): `<LocalBusinessJsonLd />` and `<WebSiteJsonLd />` from
   `@/components/seo/json-ld` added to `src/app/layout.tsx` — site-wide
   structured data renders on every page.
2. ✅ DONE: `metadataBase` set in root layout to `new URL(SITE.url)`.
3. Fill NAP (phone/address) via `NEXT_PUBLIC_BUSINESS_*` env vars when the
   owner provides them — `site-config.ts` reads them and the LocalBusiness
   JSON-LD conditionally includes the address block. (No street address is
   published for the business, so the PostalAddress block is intentionally
   omitted rather than fabricated.)
4. The blog deliberately avoids importing `@/lib/analytics` (server-only) and
   `@/db` so it stays decoupled from the in-flux db/analytics modules.

## Integrator Pass (2026-07-02)

**Role:** lead:integrator / bug-fixer / PM — integrate all wedge work, close
cross-cutting seams, harden, and commit/push for the team.

**Completed:**
- Wired `<LocalBusinessJsonLd />` + `<WebSiteJsonLd />` into the root layout
  (the integrator-owned seam from T026). Closed T025/T026.
- Built the lead capture popup (`src/components/layout/lead-capture-popup.tsx`)
  — exit-intent + 25s timed fallback, "Free Project Planning Checklist" lead
  magnet, posts to `/api/newsletter`, 7-day suppression, suppressed on
  /contact, /book-online, /admin. Fully instrumented. Mounted in root layout.
- Honored the contact form's `newsletterOptIn`: `/api/contact` now
  best-effort subscribes opted-in contacts (unique-constraint-safe).
- Removed unused imports/vars left by the wedges (services, story, clients,
  blog/[slug], terms, admin layout, leads-table, auth, validators test).
- Verified marketing pages all export per-page Metadata.

**Verification (all green):**
- `npx tsc --noEmit` → EXIT=0 (clean)
- `npm run lint` → 0 errors, 5 warnings (harmless: unused eslint-disable
  directives + the known react-hook-form `watch()` compiler skip)
- `npm run build` → EXIT=0, all routes generated
- `npm test` → 23/23 pass
