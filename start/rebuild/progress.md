# Rebuild Progress

## Status: In Progress

Multiple agents working in parallel. Lead agent owns foundations (scaffold,
shadcn/theme, root layout, forms, API routes, db, analytics lib, admin). Wedge
agents own disjoint file sets and coordinate via this file + `decisions.md` +
`task-list.json`.

## In Progress

(none — both wedges complete)

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

1. Add `<LocalBusinessJsonLd />` and `<WebSiteJsonLd />` from
   `@/components/seo/json-ld` to `src/app/layout.tsx` so site-wide structured
   data renders on every page.
2. Set `metadataBase` in root layout to `new URL(siteConfig.url)` so relative
   OG image URLs resolve. Blog/legal pages already use absolute URLs via
   `absoluteUrl()`, so they're safe either way.
3. Fill NAP (phone/address) via `NEXT_PUBLIC_BUSINESS_*` env vars when the
   owner provides them — `site-config.ts` reads them and the LocalBusiness
   JSON-LD conditionally includes the address block.
4. The blog deliberately avoids importing `@/lib/analytics` (server-only) and
   `@/db` so it stays decoupled from the in-flux db/analytics modules.
