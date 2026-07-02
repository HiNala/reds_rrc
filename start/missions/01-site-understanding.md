# Mission 01 — Site Understanding

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

## Execution Metadata

- **Lane (owns):** `docs/understanding` — only create/edit files here to stay collision-free.
- **Depends on:** none (start here)
- **Parallel-safe with:** none
- **Suggested wave:** 0

> **Sequential run:** do missions 01→10 in order.
> **Parallel run:** assign one agent per lane within a wave; each agent edits only its lane, marks its tasks in `rebuild/task-list.json`, and runs the matching contraction prompt before handing off. Resolve shared files (e.g. routing, theme) at wave boundaries.

## Objective

Analyze the captured site to understand its purpose, audience, and business model.
Read `MASTER_CONTEXT.md`, `global/site-summary.md`, and `pages/*/page.json`.
Output: a site understanding document confirming the business model and audience.

## Extracted Data Summary

- Pages captured: 8
- Navigation items: 5
- Schema.org types found: WebSite
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
