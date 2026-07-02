# Requirement — Multi-step quote form with progress indicator

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** feature · **Priority:** should

## Objective

Provide a multi-step form option for longer inquiries with visible progress and an autosave feel.

## Acceptance criteria

- [ ] Multi-step quote form includes a progress indicator.
- [ ] Users can move through the form in manageable steps.
- [ ] The experience gives an autosave feel through preserved entered data during the session.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
