# Design Kit — cohesive starter system

**Detected tone from the source site** (`tone.json`):

| Property | Value |
|----------|-------|
| Mood | clean, trustworthy SaaS with crisp blue energy |
| Corners | slightly-rounded (~1px) |
| Shadows | soft |
| Density | comfortable |
| Color temperature | cool |
| Primary | `#ffa311` |
| Accent | `#722b32` |
| Heading font | Avenir Next |
| Body font | Helvetica Neue |

## Purpose

Recreate the *feeling* of the original (rounded vs squared, soft vs flat, warm vs
cool) on a **modern** stack — not a pixel clone. These files are a starting point:

- `globals.css` — CSS variables (drop into `src/app/globals.css`)
- `tailwind.theme.ts` — theme extension (merge into `tailwind.config`)
- `tokens.json` — machine-readable tokens
- `Button.tsx`, `Card.tsx` — reference components tuned to the tone

## Build the real components from these sources

Use shadcn/ui as the base, then pull richer pieces that match the tone above:

1. **shadcn/ui** — `npx shadcn@latest add button card dialog …` (base primitives)
2. **21st.dev** — https://21st.dev — curated shadcn-compatible components/blocks
   (heroes, pricing, feature sections). Pick ones matching the **clean, trustworthy SaaS with crisp blue energy** mood
   and **slightly-rounded** corners.
3. **Aceternity UI** — https://ui.aceternity.com — animated sections & micro-interactions
4. **Magic UI** — https://magicui.design — motion components

Keep corner radius, shadow depth, and the palette consistent with `tokens.json` so the
whole site feels cohesive. Apply tasteful micro-interactions (the original likely lacks
them).


---

## Your brief
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

**Build mode — `modern_rebuild`:** A **modern version**: reuse the captured **structure/layout** but NOT its colors, brand, copy, or positioning.

**Palette:** complementary direction — source primary `#116dff` → new primary `#ffa311` (hue-rotated, same energy, clearly distinct).

**Tone:** professional, confident, warm, clear, trustworthy, premium, approachable.

**Assets:** generate brand-new imagery/logo/typography — the captured assets are **reference-only** (do not ship them). See `asset-generation-brief.md`.

**Responsive:** mobile-first, fully responsive. **Analytics:** always on (pageviews, traffic, users, logins, signups).
