# Requirement — Preserve company identity, offerings, and market positioning

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** content · **Priority:** must

## Objective

Keep the company's existing name, service offerings, and market positioning while refreshing the presentation, UX, visual identity, and conversion flow.

## Acceptance criteria

- [ ] Company name remains unchanged.
- [ ] Core service offerings from the existing business are represented.
- [ ] Messaging continues to position the company around trust, expertise, responsiveness, quality, and results.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
