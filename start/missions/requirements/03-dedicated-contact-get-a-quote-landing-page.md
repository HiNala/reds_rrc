# Requirement — Dedicated Contact / Get a Quote landing page

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** page · **Priority:** must

## Objective

Build a dedicated Contact/Get-a-Quote page optimized for form completion with a simple, stylish, accessible shadcn/ui form using react-hook-form and zod.

## Acceptance criteria

- [ ] A visitor can submit the form in under 60 seconds using only essential fields.
- [ ] Form includes accessible labels, inline validation, success state, and error state.
- [ ] Submission is delivered via Resend.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
