# Requirement — Lighthouse performance above 95

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** ops · **Priority:** must

## Objective

Optimize performance, accessibility, SEO, and best practices with Lighthouse targets above 95.

## Acceptance criteria

- [ ] Lighthouse scores target above 95.
- [ ] Images and assets are optimized.
- [ ] Core pages are fast-loading and stable.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
