# Start Agent Here — redsrrc-com-bundle

> **Building autonomously?** Open **`KICKOFF.md`** at the bundle root — it's a single
> master prompt that drives the entire build end-to-end on a loop until done.

## Quick Start

1. **Read** `KICKOFF.md` — the master build prompt (loop until the Definition of Done)
2. **Read** `MASTER_CONTEXT.md` for the big picture
3. **Read** `AGENT_INSTRUCTIONS.md` for operating rules
4. **Check** `manifest.json` for bundle status and contents
5. **Open** `missions/00-mission-index.md` for the mission sequence

## Mission Sequence

Follow these in order. After each mission, run its contraction prompt.

1. Mission 01 — Site Understanding
2. **Contraction** → `missions/contraction-prompts/after-mission-01.md`
3. Mission 02 — Information Architecture
4. **Contraction** → `missions/contraction-prompts/after-mission-02.md`
5. Mission 03 — Content & Copy
6. **Contraction** → `missions/contraction-prompts/after-mission-03.md`
7. Mission 04 — Assets & Media
8. **Contraction** → `missions/contraction-prompts/after-mission-04.md`
9. Mission 05 — Design System
10. **Contraction** → `missions/contraction-prompts/after-mission-05.md`
11. Mission 06 — SEO & GEO
12. **Contraction** → `missions/contraction-prompts/after-mission-06.md`
13. Mission 07 — Components & Layouts
14. **Contraction** → `missions/contraction-prompts/after-mission-07.md`
15. Mission 08 — Forms / Integrations / Conversions
16. **Contraction** → `missions/contraction-prompts/after-mission-08.md`
17. Mission 09 — Next.js Build Plan
18. **Contraction** → `missions/contraction-prompts/after-mission-09.md`
19. Mission 10 — QA & Launch
20. **Contraction** → `missions/contraction-prompts/after-mission-10.md`

## Rebuild Planning Files

Before starting Mission 01, review the pre-seeded planning files in `rebuild/`:

- `task-list.json` — task skeleton
- `progress.md` — progress tracker
- `missing-info.md` — information gaps requiring client input
- `decisions.md` — architectural decisions log
- `business-model-analysis.md` — business model (AI-seeded or manual)
- `conversion-strategy.md` — conversion strategy (AI-seeded or manual)
- `02-url-map.json` — URL mapping (old → new)
- `02-new-sitemap.md` — proposed sitemap
- `03-page-copy-plan.json` — copy plan per page
- `06-metadata-map.json` — SEO metadata per page
- `07-component-map.json` — component inventory
- `08-conversion-system.md` — CTAs and forms per page
- `09-nextjs-build-plan.md` — scaffold command, routes, layouts, data strategy
- `site-architecture.json` — DB-vs-facade decision, tables, integrations, API
- `api-contracts.md` / `api-contracts.json` — API route contracts (if dynamic)
- `integrations-plan.md` — third-party integrations + env vars
- `design-token-plan.md` — colors, fonts, spacing (inspiration, modernize)
- `analytics-event-plan.md` — tracked events from CTAs
- `database-plan.md` — DB decision + inferred tables (Postgres + Drizzle)
- `deployment-plan.md` — Railway deployment config
- `docker-stack-plan.md` — docker-compose.yml template
- `storage-plan.md` — S3/MinIO bucket structure
- `worker-plan.md` — background jobs
- `env-var-plan.md` — required environment variables
- `smart-site-qa-checklist.md` — per-page and site-wide QA checklist
- `traffic-optimization-plan.md` — SEO traffic recommendations
