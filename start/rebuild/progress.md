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
- `npm run lint` → 0 errors, 1 warning (react-hook-form `watch()` React
  Compiler informational — cannot fix without removing autosave)
- `npm run build` → EXIT=0, 48 pages generated (Turbopack)
- `npm test` → 23/23 tests pass (3 test files)

**Local boot verified:**
- Docker Compose: Postgres (postgres:16-alpine) + web service
- Drizzle migrations applied cleanly to local Postgres
- Dev server (`npm run dev`) boots in ~2s, all pages return 200:
  - `/` (158KB), `/services`, `/story`, `/clients`, `/blog`, `/contact`,
    `/privacy`, `/terms`, `/book-online`, `/sitemap.xml`, `/robots.txt`,
    `/blog/[slug]`, `/blog/tag/[tag]`, `/blog/rss.xml`, `/services/[slug]`
- API routes verified end-to-end with DB persistence:
  - `POST /api/track` → 200 (analytics event persisted)
  - `POST /api/contact` → 200 (lead persisted to `leads` table)
  - `POST /api/quote` → 200 (lead persisted with source="quote")
  - `POST /api/newsletter` → 200 (subscriber persisted)
  - `POST /api/admin/login` → 401 for wrong credentials (correct)
- Database tables verified: `analytics_events`, `leads`,
  `newsletter_subscribers` all accepting inserts

**Additional fixes applied during local boot QA:**
- `src/components/site/project-gallery.tsx` — fixed `alt: string` →
  `alt: string | null` to match DB type; use `?? project.title` fallback
- `src/components/site/project-lightbox.tsx` — same `alt` type fix; removed
  unused `useState` import
- `src/lib/analytics-queries.ts` — added `as LeadWithDetails[]` casts to
  `getLeads()`, `getLeadById()`, `getRecentLeads()` to resolve
  `utm: unknown` vs `utm: Record<string, unknown> | null` mismatch
  (Drizzle types `jsonb` as `unknown`; runtime is always the record or null)
- `src/app/admin/projects/page.tsx` — removed unused `Trash2` import
- `src/app/admin/projects/_components/image-gallery-manager.tsx` — removed
  unused `Button` import
- `src/app/admin/page.tsx` — `<a>` → `<Link>` for internal navigation
  (eslint `no-html-link-for-pages` rule)
- Cleaned stale eslint-disable directives in `analytics-tracker.tsx`,
  `faq-section.tsx`, `db/index.ts`; fixed unused var in `validators.test.ts`

**Remaining warnings (non-blocking):**
- `middleware` file convention deprecated in Next.js 16 → rename to
  `proxy.ts`.
- `DATABASE_URL` not set at build time — expected; DB-backed routes are
  dynamic (ƒ) and will connect at runtime.
- react-hook-form `watch()` React Compiler informational — known limitation.

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

## Final Verification Pass (2026-07-02)

**Role:** Final QA — verify navigation, sitemap, redirects, forms, and all pages
are complete and polished before deployment.

**Verification results (all green):**
- **All 25 pages return 200**: /, /services, /story, /clients, /blog, /contact,
  /book-online, /privacy, /terms, /services/[slug] (3), /blog/[slug] (5),
  /blog/tag/[tag] (2), /blog/rss.xml, /sitemap.xml, /robots.txt, /llms.txt,
  /admin/login, /newsletter/confirmed, /newsletter/invalid
- **All 4 redirects work (308 permanent)**: /home-1 → /, /services-5 → /services,
  /service-page/client-callback → /contact, /client-callback → /contact
- **All API endpoints work**: /api/contact, /api/quote, /api/newsletter,
  /api/track, /api/admin/login — all return 200 with DB persistence
- **Admin dashboard works**: /admin, /admin/leads, /admin/analytics all render
  with authenticated session
- **Sitemap.xml**: Complete with all routes (marketing, services, blog articles,
  tags, legal) + image references
- **Robots.txt**: Allows all public content, disallows /admin + /api/, includes
  AI/answer-engine bot rules for AEO/GEO, points to sitemap
- **Navigation**: Header (Home, Services, Our Story, Our Clients, Blog + phone +
  Get a Free Quote CTA), Footer (Explore links, Contact, Newsletter form),
  Mobile sticky CTA — all functional
- **Forms**: Contact form, multi-step quote form, newsletter form, lead capture
  popup — all submit correctly and persist to database

**Code quality:**
- `npx tsc --noEmit` → EXIT=0 (clean)
- `npx vitest run --no-file-parallelism` → 23/23 pass (3 test files)
- `npm run lint` → 0 errors, 1 warning (known react-hook-form watch() issue)
- `npx next build --webpack` → EXIT=0, 50 static pages generated

**Infrastructure fixes applied:**
- Made all 24 OG image routes dynamic (`export const dynamic = "force-dynamic"`)
  to prevent build worker memory crashes during static page generation
- Added `analyze-images.js` to eslint ignore (CommonJS utility script)
- Removed unused `Image` import from clients/page.tsx
- Docker Compose web service builds and runs the production app successfully
  (containerized Next.js with standalone output, Postgres, MinIO)

**Remaining tasks:**
- T012 (Integrations): ✅ Code hooks in place for Auth.js, Resend,
  Calendly/Cal.com. Turnstile (spam protection) not yet implemented — optional.
  Needs client credentials to be fully functional.
- T027 (QA): ✅ All functional QA verified. Lighthouse/WCAG testing requires
  browser devtools (not available in CLI).
- T028 (Deploy): Pending — requires Railway credentials and configuration.
