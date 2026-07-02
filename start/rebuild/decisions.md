# Decisions Log

Architectural and design decisions made during the rebuild.

## 2026-07-01 — wedge:blog-seo

### Blog content as TSX data modules (no MDX)
Blog articles are authored as TSX files in `src/content/blog/` — each exports a
`meta` object and a default React body component, wired together by
`registry.ts`. Chosen over MDX to avoid adding `@next/mdx` and a loader config
(owned by the lead), to keep the blog fully typed, and to stay build-time
static with zero extra runtime deps. Trade-off: authoring requires editing TSX
rather than Markdown; acceptable for 5 starter articles and an editor can swap
to MDX later without touching the route layer (the registry is the seam).

### Code-based SVG thumbnails (not raster)
Per owner decision (asset approach = code-based SVG assets), each article has a
hand-authored 16:9 SVG in `public/blog/` using the brand palette
(`#ffa311` amber primary, `#722b32` maroon accent). Rendered via `next/image`
with `unoptimized` — the correct choice for vector art per the Next.js image
docs, and it avoids any `next.config.js` SVG allow-list change (owned by lead).

### Blog decoupled from `@/lib/analytics` and `@/db`
The server-side `track()` in `@/lib/analytics` is `"server-only"` and the db
schema is mid-refactor (serial ids). To keep the blog wedge type-clean and
robust to that churn, blog pages do not import those modules. CTA-click
instrumentation is done client-side via `TrackClick` (fire-and-forget POST to
`/api/track`). Auto pageview tracking remains the root-layout provider's job
(lead, T024).

### JSON-LD component, not per-page inline
Structured data lives in `src/components/seo/json-ld.tsx` (LocalBusiness,
WebSite, Article, BreadcrumbList, FAQPage) so it's reusable and consistent.
LocalBusiness + WebSite are rendered on the blog index and legal pages now;
the integrator should add them to the root layout for site-wide coverage.

### NAP is env-driven, not fabricated
The captured site exposed only an email (`info@redsrrc.com`); no phone/address
was captured (`geo-audit.json` has empty `nap_records`). Rather than fabricate
NAP, `site-config.ts` reads `NEXT_PUBLIC_BUSINESS_*` env vars and the
LocalBusiness JSON-LD conditionally includes the address block only when
street/locality/region are all present. Owner must supply these before launch.

### Legal pages are template-quality
`/privacy` and `/terms` are real, sensible policies but carry an explicit
"review by a qualified attorney" note. They are not legal advice.

## 2026-07-01 — wedge:trust-services

### Consumed the lead's centralized content layer
Rather than re-declaring business info per page, all marketing pages consume
`SITE`, `SERVICES`, `VALUES`, `TESTIMONIALS`, and `PRIMARY_CTA` from
`src/lib/site-config.ts` (owned by the lead). This keeps a single source of
truth for NAP, services, and testimonials. Per-service long-form content
(intro, includes, process, FAQ) lives in a new, disjoint module:
`src/content/services/detail.ts`.

### /book-online: real booking surface, not a password gate
The source site's `/book-online` was a password gate (no real booking flow
behind it in the capture). The modern rebuild replaces it with a real booking
page: if `NEXT_PUBLIC_BOOKING_URL` is set (Calendly/Cal.com/etc.), we embed the
scheduler in an iframe; otherwise we fall back to a clear CTA to `/contact`
plus a call link. No password gate — that pattern doesn't serve a modern
conversion goal.

### FAQ as native `<details>` with FAQPage JSON-LD
`src/components/site/faq.tsx` uses native `<details>`/`<summary>` for
zero-JS accessibility and no dependency, paired with `FaqJsonLd` for rich
results. Reused on service detail pages and available for any future page.

### Testimonials as a grid, not a carousel
The source had a JS testimonial carousel. The rebuild presents testimonials as
a responsive grid — all quotes visible at once, no JS, no carousel
accessibility pitfalls, and better for SEO (all content in the initial HTML).
The captured testimonials are real quotes from the source's `text.json`.

### Code-based SVG assets for all marketing imagery
Consistent with the blog wedge and the owner's asset decision: service tiles,
founder portrait, and project gallery are hand-authored SVGs using the brand
palette. No raster assets, no captured photography. Rendered via `next/image`
with `unoptimized` (correct for vector art).
