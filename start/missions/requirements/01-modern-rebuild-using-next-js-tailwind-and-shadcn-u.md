# Requirement — Modern rebuild using Next.js, Tailwind, and shadcn/ui

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** feature · **Priority:** must

## Objective

Use Next.js, Tailwind CSS, and shadcn/ui as the core frontend stack, with a current component-driven architecture and premium professional UI.

## Acceptance criteria

- [ ] Site is implemented with Next.js, Tailwind CSS, and shadcn/ui components.
- [ ] Pages load quickly and support mobile-first responsive layouts.
- [ ] The rebuilt site does not reuse the dated visual presentation of the reference site.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
