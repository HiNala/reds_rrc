# Requirement — GEO and AI-search readiness

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** ops · **Priority:** must

## Objective

Implement GEO elements including JSON-LD LocalBusiness, llms.txt, and structured business/service information.

## Acceptance criteria

- [ ] JSON-LD LocalBusiness schema is implemented.
- [ ] llms.txt is provided.
- [ ] Business/service information is structured clearly for AI and search systems.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
