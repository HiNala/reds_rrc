# Requirement — Progressive disclosure forms

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** feature · **Priority:** must

## Objective

Forms should ask only what is needed, avoid overwhelming visitors, and use progressive disclosure for longer inquiries.

## Acceptance criteria

- [ ] Short forms request only essential information.
- [ ] Longer inquiries are handled through progressive disclosure or multi-step flow.
- [ ] Users are not presented with an overwhelming long form on first interaction.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
