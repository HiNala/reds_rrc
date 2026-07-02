# Requirement — FAQ with schema

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** content · **Priority:** must

## Objective

Create FAQ content and implement structured data schema where appropriate.

## Acceptance criteria

- [ ] FAQ section exists on relevant pages.
- [ ] FAQ answers are clear and customer-friendly.
- [ ] FAQ schema is implemented where applicable.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
