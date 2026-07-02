# Mission 12 — Blog & Starter Content

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

## Objective

A real blog with **5 starter articles** with a generated hero image + 16:9 thumbnail preview each, full SEO + GEO metadata, and analytics.

## Tasks

- Set up the blog route (`/blog` index + `/blog/[slug]`) with MDX or a CMS.
- Write 5 on-brand starter articles (research-grounded, useful — not filler).
- Generate a hero image + thumbnail per article; optimize via `next/image`.
- Per-article SEO (title/description/canonical/OG) + JSON-LD `Article`.
- GEO/answer-engine: clear headings, FAQ/summary blocks, `Article`/`FAQPage` schema.
- Index page with thumbnail previews, tags, and pagination.
- RSS/sitemap entries; emit `pageview` analytics on article views.

## Done when

- 5 articles render with images, valid metadata, and appear in the sitemap.

## Before you start

- **Check `prioritize/`** for owner notes and extra images; treat as high-priority. Honor `build-brief.json` at the bundle root.

## Definition of Done

- Feature is REAL and fully wired (no mocks/stubs/placeholders): connected to the database/integration it needs, with env vars documented.
- `rebuild/task-list.json` updated; tests cover the happy path + one failure.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Run `CONTINUATION_MISSION.md` to harden before handoff.
