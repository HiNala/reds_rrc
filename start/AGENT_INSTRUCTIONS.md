# Agent Instructions

## Build Philosophy (read first)

- **Scaffold, never hand-roll.** Bootstrap the project with the official
  boilerplate before writing any app code — see the exact command in
  `rebuild/09-nextjs-build-plan.md` (`create-next-app@latest … --yes --ts
  --tailwind --eslint --app --src-dir --turbopack`). Do NOT assemble the
  Next.js skeleton file-by-file; scaffold first, then build on top with
  shadcn/ui.
- **Work the task list.** `rebuild/task-list.json` is your authoritative,
  ordered checklist. Mark each task `in_progress` then `completed` and KEEP
  IT UPDATED as you go. Append new tasks (and new mission files) if the site
  needs more than the initial set (e.g. a blog CMS, extra landing pages).
- **Design = inspiration, not a clone.** The source site is often dated. Start
  from the tone-matched starter kit in `design-kit/` (it captures the site's
  *feeling* — rounded vs squared corners, soft vs flat shadows, palette,
  typography — see `design-kit/tone.json` and `design-kit/README.md`), pull
  cohesive components from the sources it lists (shadcn/ui, 21st.dev), and use
  `rebuild/design-token-plan.md` for brand colors/logo. Then build a **modern,
  beautiful** system with real micro-interactions. Never copy the old styling
  pixel-for-pixel — recreate the feeling on a modern stack.
- **Architecture-driven backend.** `rebuild/site-architecture.json` decides
  whether this site needs a database. If it does, follow `database-plan.md`
  (Postgres + Drizzle), `api-contracts.md`, and wire auth/integrations per
  `integrations-plan.md`. If it's a static facade, do NOT add a database —
  handle forms with a serverless route + Resend.
- **Understand the layout before building.** If you can view images, open the page
  screenshots (`pages/<id>/desktop-full.png`, `mobile-full.png`) to see the real
  layout. If you cannot, the slurper's AI already analyzed those screenshots into
  text — read `global/layout-analysis.md` and `ai-analysis/layout_*.json` for each
  page's sections, components, colors, and CTA placement, and rebuild from those.
- **SEO + GEO are first-class.** Apply `06-metadata-map.json`, emit
  structured data (JSON-LD), `sitemap.xml`, `robots.txt`, and an `llms.txt`
  for generative-engine optimization. Target Lighthouse > 95 and WCAG AA.
- **Check `prioritize/` every mission.** The owner may drop special
  instructions/notes and extra images (`prioritize/priority-images/`) there.
  Check at least once per mission and treat anything found as high-priority
  guidance that overrides defaults. If empty, ignore it.
- **Continuation/hardening.** After each wave and at the end, run
  `missions/CONTINUATION_MISSION.md` until the app builds, all tests pass, lint
  and types are clean, and (if the architecture needs a DB) it's really wired to
  Postgres — no mocks.

## Operating Rules

1. **Traceability.** Every claim about the client's site must reference
   a source file in the bundle. If you can't cite a source, don't make
   the claim.

2. **Don't invent client facts.** Use only what's in the bundle. If
   information is missing, add it to `rebuild/missing-info.md` and flag
   for client confirmation.

3. **Contraction workflow.** After each rebuild mission, run the
   corresponding contraction prompt from
   `missions/contraction-prompts/`. This validates your work against
   the captured evidence.

4. **Update tracking files.** Keep `rebuild/progress.md`,
   `rebuild/decisions.md`, and `rebuild/missing-info.md` current as
   you work.

5. **Partial bundles.** If the bundle status is `partial`, some pages
   or assets may be missing. Work with what's available and document
   gaps.

6. **AI enrichment is optional.** If `ai-analysis/` is absent or
   marked "AI disabled," proceed with deterministic extraction data
   only.

7. **Consent.** The `legal/capture-authorization.md` file documents
   the client's authorization. Do not redistribute bundle contents
   beyond the authorized scope.

## File Conventions

- All paths in `manifest.json` are relative to the bundle root.
- Page IDs are stable identifiers (not URLs) — use them to
  cross-reference.
- Asset IDs are content-hashed; the same asset may appear under
  multiple URLs (see `aliases` in `asset-manifest.json`).
