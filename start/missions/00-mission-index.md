# Mission Index — redsrrc-com-bundle

Source site: https://www.redsrrc.com/
Pages captured: 8

## Rebuild Missions

01 — [Site Understanding](01-site-understanding.md)
02 — [Information Architecture](02-information-architecture.md)
03 — [Content & Copy](03-content-copy.md)
04 — [Assets & Media](04-assets-media.md)
05 — [Design System](05-design-system.md)
06 — [SEO & GEO](06-seo-geo.md)
07 — [Components & Layouts](07-components-layouts.md)
08 — [Forms / Integrations / Conversions](08-forms-integrations-conversions.md)
09 — [Next.js Build Plan](09-nextjs-build-plan.md)
10 — [QA & Launch](10-quality-assurance-and-launch.md)

## Feature & Development Missions

11 — [Lead Capture & Email](11-lead-capture-email.md)
12 — [Blog & Starter Content](12-blog-content.md)
13 — [Wiring & Integration (make it real)](13-wiring-integration.md)
14 — [Admin Dashboard (wired to analytics)](14-admin-dashboard.md)
15 — [Analytics & Tracking (site-wide)](15-analytics-tracking.md)

## Page Build Missions

One mission per captured page (build each route from its `rebuild/page-specs/` blueprint): [page-builds/index.md](page-builds/index.md)

## Supplemental

- [SMART_SITE_SUPPLEMENT](SMART_SITE_SUPPLEMENT.md)
- [CONTINUATION_MISSION](CONTINUATION_MISSION.md) — run after each wave & at the end

## Contraction Prompts

- [After Mission 01](contraction-prompts/after-mission-01.md)
- [After Mission 02](contraction-prompts/after-mission-02.md)
- [After Mission 03](contraction-prompts/after-mission-03.md)
- [After Mission 04](contraction-prompts/after-mission-04.md)
- [After Mission 05](contraction-prompts/after-mission-05.md)
- [After Mission 06](contraction-prompts/after-mission-06.md)
- [After Mission 07](contraction-prompts/after-mission-07.md)
- [After Mission 08](contraction-prompts/after-mission-08.md)
- [After Mission 09](contraction-prompts/after-mission-09.md)
- [After Mission 10](contraction-prompts/after-mission-10.md)

## Execution Modes

**Sequential:** run Missions 01 → 10 in order, then `CONTINUATION_MISSION.md` until the app is polished, fully tested, and error-free.

**Parallel:** assign one agent per lane within a wave. Agents in the same wave work concurrently on disjoint lanes, update `rebuild/task-list.json`, and run their contraction prompt before the wave boundary. Run `CONTINUATION_MISSION.md` after each wave and at the end.

| Mission | Wave | Depends on | Lane (owns) |
|---------|------|-----------|-------------|
| 01 Site Understanding | 0 | — | `docs/understanding` |
| 02 Information Architecture | 1 | 01 | `app routing + sitemap` |
| 03 Content & Copy | 1 | 01 | `content/ (MDX/copy)` |
| 04 Assets & Media | 1 | 01 | `public/ assets + media` |
| 05 Design System | 1 | 01 | `design system + theme` |
| 06 SEO & GEO | 1 | 01 | `SEO metadata + structured data` |
| 07 Components & Layouts | 2 | 05 | `src/components/` |
| 08 Forms / Integrations / Conversions | 2 | 01 | `src/app/api/ + forms` |
| 09 Next.js Build Plan | 3 | 02, 05, 07 | `src/app/ wiring (integration)` |
| 10 QA & Launch | 4 | 09 | `tests/ + QA` |

**Wave plan:** Wave 0 → M01 · Wave 1 → M02,M03,M04,M05,M06 · Wave 2 → M07,M08 · Wave 3 → M09 · Wave 4 → M10 · then CONTINUATION until green.

## Build Brief

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

> A modern version of https://www.redsrrc.com/ â€” a complete modernization, not a clone. Keep the company's name, offerings, and market positioning, but rebuild the structure and layout into a fast, modern, mobile-first Next.js + Tailwind + shadcn/ui site with a fresh, trust-building, professional design and a complementary palette that feels current and premium. Generate brand-new assets (logo refresh, hero imagery, icons, typography) â€” do not reuse the old site's dated imagery.

The primary goal is CONVERSION: turn visitors into qualified leads. Bake a full high-converting lead funnel into the architecture and every page:
- A clear value proposition and hero CTA above the fold on the homepage.
- Multiple low-friction entry points to contact (header CTA, sticky mobile CTA, in-content CTAs, footer).
- A dedicated 'Get a Quote' / 'Contact' landing page optimized for form completion.
- Simple, stylish, easy-to-use contact and lead-capture forms built with shadcn/ui components (Input, Textarea, Select, Checkbox, Button, Form with react-hook-form + zod validation, accessible labels, inline success/error states, progressive disclosure â€” only ask what is needed, no overwhelming long forms).
- A multi-step form option for longer inquiries with a progress indicator and an autosave feel.
- Email + lead capture via Resend, persisting every submission to the database with timestamp, source page, and UTM/campaign attribution.
- Newsletter signup in the footer.
- Trust signals throughout: testimonials, certifications, project gallery/case studies, clear contact info, FAQ.
- Analytics always on â€” instrument the full funnel: pageview -> CTA click -> form start -> form submit -> thank-you, plus traffic sources, users, logins, signups.

Positioning: lead with trust, expertise, and ease of working with us; emphasize responsiveness, quality, and results; avoid jargon and high-pressure sales language. Tone: professional, confident, warm, clear.

Add a blog with 5 starter SEO articles (with generated thumbnails) to build authority and organic traffic, full SEO + GEO (metadata, JSON-LD LocalBusiness, sitemap.xml, robots.txt, llms.txt), and ensure WCAG AA accessibility and Lighthouse > 95.

Requirements (each must get a mission and acceptance criteria):
1. High-converting homepage lead funnel with hero CTA, social proof, services summary, and a final CTA band â€” must have at least 3 conversion entry points.
2. Dedicated conversion-optimized Contact/Get-a-Quote page with a simple, stylish, accessible shadcn/ui form (react-hook-form + zod), inline validation, success state, and Resend delivery â€” acceptance: a visitor can submit in under 60 seconds with only essential fields.
3. Reusable shadcn/ui form component library (ContactForm, LeadForm, NewsletterForm, MultiStepQuoteForm) shared across the site.
4. Lead persistence + admin: every form submission stored in Postgres with source/UTM, viewable in a protected leads dashboard.
5. Sticky mobile CTA + header CTA on every page.
6. Trust-building content blocks: testimonials, certifications, case studies/project gallery, FAQ with schema.
7. Services pages with per-service CTAs feeding the lead funnel.
8. About/Team page building credibility.
9. Blog with 5 generated articles + thumbnails, category/tag pages, and per-article CTAs.
10. Full SEO + GEO + analytics funnel instrumentation.
11. Mobile-first responsive design at every breakpoint, WCAG AA, Lighthouse > 95.
12. Loading, empty, error, and success states on every dynamic surface.

| Aspect | Decision |
|--------|----------|
| Target | https://www.redsrrc.com/ |
| Build mode | modern_rebuild |
| Color policy | complementary (Use a fresh complementary palette that feels current, premium, professional, and trust-building. Do not reuse the old site's dated color treatment.) |
| Asset policy | regenerate |
| Lead capture | resend (forms + email) |
| Blog | 5 starter articles (images=True) |
| Responsive | True |
| Analytics | always on (pageviews, traffic, users, logins, signups) |

**Positioning:** see `rebuild/positioning-strategy.md` — message the angle, don't list operations bluntly.

**Goals / targets:**
- Increase qualified lead generation from website visitors.
- Create a complete high-converting lead funnel across the homepage, service pages, blog, and contact page.
- Make it possible for a visitor to submit a quote/contact request in under 60 seconds using only essential fields.
- Build authority and organic traffic with 5 starter SEO articles.
- Achieve WCAG AA accessibility and Lighthouse scores above 95.
- Instrument the full funnel from pageview through thank-you confirmation.

**Requirements:** 30 captured — see `rebuild/requirements-coverage.md` and `missions/requirements/`.


## Captured Site Overview

- **Pages:** 8
- **Text blocks:** 282
- **Total words:** 957
- **Components:** 70 (FooterColumn, Form, Header, Main, Navbar, Section)
- **Image candidates:** 253
- **CTAs:** 17
- **Forms:** 3
- **Structured data types:** WebSite
- **SEO warnings:** 25

### Page URLs

- https://www.redsrrc.com/home-1
- https://www.redsrrc.com/services
- https://www.redsrrc.com/clients
- https://www.redsrrc.com/service-page/client-callback
- https://www.redsrrc.com/services-5
- https://www.redsrrc.com/
- https://redsrrc.com/book-online
- https://www.redsrrc.com/story
