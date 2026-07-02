# Requirement — In-content CTAs and footer conversion paths

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** content · **Priority:** must

## Objective

Place relevant CTAs inside page content and in the footer to guide visitors into the quote/contact funnel.

## Acceptance criteria

- [ ] Key content sections include contextual CTAs.
- [ ] Footer includes contact and/or quote CTA options.
- [ ] CTA language is clear, warm, and conversion-focused.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
