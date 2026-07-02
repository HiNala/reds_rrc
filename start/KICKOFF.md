# KICKOFF — build this site end to end

You are an autonomous build agent working **inside this folder**. This is your master
prompt. Your job: take this capture-and-plan bundle and **build the complete, polished,
fully-functional new website** — every mission, every task, all layouts, overviews, API
contracts, pages, and the blog — and don't stop until it's truly done.

## What you're building

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

Build a **modern version** — reuse the captured structure and layout only; do NOT copy the source colors, brand, copy, or positioning.

- Use the **complementary** palette in `design-kit/tokens.json`.
- Generate **brand-new assets** (`design-kit/asset-generation-brief.md`) — do not ship captured assets.
- **Lead capture + email** via resend.
- **Blog** with 5 generated articles + images + thumbnails + SEO/GEO.
- Fully **mobile-responsive**.
- **Full analytics** + admin dashboard (pageviews, traffic, users, logins, signups).

**Positioning:** message the angle in `rebuild/positioning-strategy.md` — persuasive, trust-building; don't state operational gating bluntly.

**Goals/targets:** Increase qualified lead generation from website visitors.; Create a complete high-converting lead funnel across the homepage, service pages, blog, and contact page.; Make it possible for a visitor to submit a quote/contact request in under 60 seconds using only essential fields.; Build authority and organic traffic with 5 starter SEO articles.; Achieve WCAG AA accessibility and Lighthouse scores above 95.; Instrument the full funnel from pageview through thank-you confirmation.

**30 requirements** captured — work them via `missions/requirements/` and tick off `rebuild/requirements-coverage.md` (nothing left unplanned).

Source captured: **https://www.redsrrc.com/** · pages captured: **8**

## Operating loop (repeat until done — set this on a loop)

Work in a continuous loop. **Do not stop, ask for confirmation, or hand back until the
Definition of Done below is fully met.** Each iteration:

1. **Read state.** Open `rebuild/task-list.json` (your authoritative checklist) and
   `rebuild/progress.md`. If `prioritize/` has owner notes/images, treat them as
   high-priority. Re-read `build-brief.json` if present.
2. **Pick the next unblocked task** (top-to-bottom; respect the wave/dependency order in
   `missions/00-mission-index.md`). Mark it `in_progress`.
3. **Do the work for real.** No mocks, stubs, placeholders, TODOs, or fake data. If a
   task needs a database/integration, wire it for real.
4. **Verify.** Build must compile; run lint, types, and tests for what you touched.
5. **Mark `completed`**, update `rebuild/progress.md` and `rebuild/decisions.md`.
6. **At each wave boundary and whenever you think you're done**, run
   `missions/CONTINUATION_MISSION.md` — the hardening loop. It finds gaps, breaks things,
   and tightens until green. Then continue the loop.
7. Repeat until **every** task is `completed` and the Definition of Done holds.

## Order of work

1. **Scaffold first** (task T001): the official `create-next-app@latest … --yes --ts
   --tailwind --app --src-dir --turbopack`. Never hand-roll the Next.js skeleton.
2. **Design system** from `design-kit/` (tone, tokens, components) — modernize, don't clone.
3. **Understand each page's layout**: if you can view images, open
   `pages/<id>/desktop-full.png`; otherwise read `global/layout-analysis.md` +
   `ai-analysis/layout_*.json` (the slurper already described every screenshot).
4. **Backend** only if `rebuild/site-architecture.json` calls for it — `database-plan.md`,
   `api-contracts.md`, `integrations-plan.md`.
5. **Build every page/route**, then feature missions (commerce, lead-capture, blog, …).
6. **SEO + GEO** (`rebuild/06-metadata-map.json`, JSON-LD, sitemap, robots, llms.txt).
7. **Analytics** site-wide (`rebuild/analytics-plan.md`) — no page ships untracked.
8. **Polish**: micro-interactions, responsive states, accessibility.
9. **QA + launch** (`rebuild/smart-site-qa-checklist.md`, `deployment-plan.md`).

Read `missions/00-mission-index.md` for the full mission list and the parallel/sequential execution plan.

## Definition of Done (all must be true)

- [ ] Every task in `rebuild/task-list.json` is `completed`; every mission is finished.
- [ ] The app **builds** with no errors; **lint and type checks are clean**; **all tests pass**.
- [ ] Every captured page/route is rebuilt and looks polished on desktop **and** mobile.
- [ ] Layouts match the intended structure (from screenshots / `layout-analysis.md`).
- [ ] All needed imagery/logos exist (generated per the asset brief if requested) — no
      broken images, no Lorem-Ipsum, no placeholder art.
- [ ] If a blog was requested: every article is written, with images + thumbnails + SEO/GEO.
- [ ] If the architecture needs a database: it's **really connected** (no mocks); commerce/
      lead-capture/analytics persist real rows; integrations use env vars (`.env.example`).
- [ ] SEO + GEO complete; **analytics tracks pageviews, traffic, users, logins, signups**.
- [ ] **Every requirement in `rebuild/requirements-coverage.md` is built and checked off**
      (including each mission in `missions/requirements/`).
- [ ] If a funnel/presale was requested: the primary CTA + payment schedule work end-to-end
      and progress toward the target is tracked (`rebuild/goals-and-funnel.md`).
- [ ] Copy follows `rebuild/positioning-strategy.md` (the angle, not a literal feature dump).
- [ ] `CONTINUATION_MISSION.md` runs clean with nothing left to fix.
- [ ] The site looks genuinely good — cohesive, modern, on-brand.

## Rules

- **Real, not facade.** Nothing locked, faked, stubbed, or mocked (when a DB is called for).
- **Keep the task list updated** as you go; append tasks/missions if the site needs more.
- **Design = inspiration**, never a pixel clone (unless build mode is `clone`).
- **Check `prioritize/`** at least once per mission.
- When in doubt, prefer finishing and hardening over asking.

---

### Master prompt (paste this to start, then loop)

> Read `KICKOFF.md` in this folder and execute it. Work the loop in
> `rebuild/task-list.json` + the missions end to end — scaffold, design, build every page,
> wire the backend/integrations for real, generate assets/blog/images, SEO+GEO, full
> analytics — running `missions/CONTINUATION_MISSION.md` to harden. **Do not stop until the
> Definition of Done in KICKOFF.md is fully met and the site builds, all tests pass, and it
> looks great.** Keep `rebuild/task-list.json` and `rebuild/progress.md` updated as you go.
