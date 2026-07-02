# Requirement — Full SEO implementation

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** ops · **Priority:** must

## Objective

Implement metadata, sitemap.xml, robots.txt, structured data, and SEO-friendly page architecture.

## Acceptance criteria

- [ ] Core pages include optimized metadata.
- [ ] sitemap.xml and robots.txt are generated.
- [ ] Structured data is included where appropriate.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
