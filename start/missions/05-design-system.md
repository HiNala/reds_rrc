# Mission 05 — Design System

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

## Execution Metadata

- **Lane (owns):** `design system + theme` — only create/edit files here to stay collision-free.
- **Depends on:** Mission 01
- **Parallel-safe with:** Mission 02, Mission 03, Mission 04, Mission 06
- **Suggested wave:** 1

> **Sequential run:** do missions 01→10 in order.
> **Parallel run:** assign one agent per lane within a wave; each agent edits only its lane, marks its tasks in `rebuild/task-list.json`, and runs the matching contraction prompt before handing off. Resolve shared files (e.g. routing, theme) at wave boundaries.

## Objective

Extract design tokens from screenshots and computed styles.
Use `pages/*/screenshots/` and `pages/*/analysis/` to derive colors, typography, spacing.
Output: `rebuild/design-token-plan.md`.

## Extracted Data Summary

- Component types: FooterColumn, Form, Header, Main, Navbar, Section
- **Starter system + palette/type tokens:** `design-kit/` (`tokens.json`, `tone.json`, `globals.css`, `tailwind.theme.ts`)
- **Color/type/density impressions** per page: `global/layout-analysis.md`
- Design tokens (source, as inspiration) in `rebuild/design-token-plan.md`
- If the brief changed the palette (complementary/custom) or asked for new assets, follow `design-kit/tokens.json` + `design-kit/asset-generation-brief.md` — do not reuse dated source styling
- Downloaded CSS files available in `assets/`
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
