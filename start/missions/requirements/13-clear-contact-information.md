# Requirement — Clear contact information

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** content · **Priority:** must

## Objective

Display clear contact information throughout the site, especially in the header/footer, contact page, and trust sections.

## Acceptance criteria

- [ ] Contact information is easy to find.
- [ ] Contact details appear on the Contact/Get-a-Quote page and footer.
- [ ] Contact presentation supports trust and conversion.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
