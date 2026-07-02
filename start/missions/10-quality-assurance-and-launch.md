# Mission 10 — QA & Launch

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

## Execution Metadata

- **Lane (owns):** `tests/ + QA` — only create/edit files here to stay collision-free.
- **Depends on:** Mission 09
- **Parallel-safe with:** none
- **Suggested wave:** 4

> **Sequential run:** do missions 01→10 in order.
> **Parallel run:** assign one agent per lane within a wave; each agent edits only its lane, marks its tasks in `rebuild/task-list.json`, and runs the matching contraction prompt before handing off. Resolve shared files (e.g. routing, theme) at wave boundaries.

## Objective

Final QA and launch preparation. Use `rebuild/smart-site-qa-checklist.md`.
Run all contraction prompts. Verify against original bundle. Output: QA report + launch readiness.

## Extracted Data Summary

- Pages to verify: 8
- Assets to verify: 253
- SEO warnings to resolve: 25
## Bundle References

- `manifest.json` — bundle index
- `pages/` — captured page data + screenshots (`<id>/desktop-full.png`)
- `global/` — site-wide rollups, incl. `layout-analysis.md`
- `rebuild/` — planning files (task-list.json, site-architecture.json, plans)
- `design-kit/` — tone-matched starter design system

## Understanding the layout (vision)

- **If you can view images:** open the page screenshots (`pages/<id>/desktop-full.png`, `mobile-full.png`) to understand layout, spacing, and components first-hand.
- **If you cannot view images:** rely on `global/layout-analysis.md` and `ai-analysis/layout_*.json` — the slurper's AI already described each page's sections, components, colors, and CTAs from the screenshots so you can rebuild without seeing them.

## Before you start (every mission)

- **Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.
- **Check `prioritize/`** for owner notes/instructions and `prioritize/priority-images/` for extra images. Treat anything found as HIGH-PRIORITY guidance that overrides defaults. If empty, ignore and proceed.
- If a `build-brief.json` is present at the bundle root, honor it (rebrand, palette, commerce, blog, asset policy).

## Definition of Done

- Work confined to this mission's lane; `rebuild/task-list.json` updated.
- Output traces to captured evidence (cite bundle paths).
- Any applicable `prioritize/` items incorporated.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Run the matching contraction prompt before handoff.
