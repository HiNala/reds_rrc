# Master Context — redsrrc-com-bundle

## Source Site

- **URL:** https://www.redsrrc.com/
- **Captured by:** Slurper v0.1.0
- **Bundle ID:** bundle-redsrrc-com-bundle

## What This Bundle Contains

This bundle is a complete reconstruction package for the website at `https://www.redsrrc.com/`.
A downstream coding agent uses it to rebuild the site as a modern Next.js application.

### Folder Structure

- `manifest.json` — index of all bundle contents with status and version info
- `pages/<page_id>/` — per-page data: `page.json`, `raw/`, `screenshots/`, `analysis/`
- `assets/` — downloaded images, documents, and `asset-manifest.json`
- `global/` — site-wide rollups: navigation, footer, SEO audit, GEO audit, site summary
- `ai-analysis/` — AI enrichment results (if AI was enabled)
- `missions/` — 10 rebuild missions + Contraction Mission + contraction prompts
- `rebuild/` — planning files: URL map, copy plan, component map, build plan, etc.
- `legal/` — capture authorization / consent record

## Stack Defaults

The rebuild target stack (see `rebuild/site-architecture.json` for the
per-site decision on what's actually needed):

- **Framework:** Next.js (App Router) + TypeScript + Turbopack — scaffolded
  with `create-next-app@latest` (see `rebuild/09-nextjs-build-plan.md`)
- **Styling:** Tailwind CSS + shadcn/ui (design tokens are *inspiration*)
- **Database:** PostgreSQL + Drizzle ORM — **only if** the architecture says so
- **Email/Integrations:** Resend, Stripe, Auth.js, analytics — per `integrations-plan.md`
- **Deployment:** Docker Compose → Railway

## How to Read This Bundle

1. Start with `START_AGENT_HERE.md`
2. Read `AGENT_INSTRUCTIONS.md` for operating rules
3. Follow the mission sequence in `missions/00-mission-index.md`
4. Use `rebuild/` planning files as your task backlog
