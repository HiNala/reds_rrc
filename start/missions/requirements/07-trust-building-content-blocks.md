# Requirement — Trust-building content blocks

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Category:** content · **Priority:** must

## Objective

Add testimonials, certifications, case studies/project gallery, clear contact info, and FAQ throughout the site.

## Acceptance criteria

- [ ] Site includes testimonials, certifications, case studies or project gallery, clear contact info, and FAQ.
- [ ] Trust blocks appear on relevant conversion pages.
- [ ] Trust content supports credibility without excessive jargon.

## Rules

- Build it for REAL — no mocks/stubs/placeholders; wire to the DB/integration it needs.
- Honor `rebuild/positioning-strategy.md` for any user-facing copy.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Update `rebuild/task-list.json` and tick this off in `rebuild/requirements-coverage.md`.
