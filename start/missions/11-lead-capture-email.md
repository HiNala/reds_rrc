# Mission 11 — Lead Capture & Email

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

## Objective

Real email + lead capture wired to **resend**, persisting leads to the database.

## Tasks

- Build accessible capture forms (hero/footer/exit-intent as appropriate) with client + server validation.
- Server action/route stores leads in the DB and triggers a transactional email via resend (`RESEND_API_KEY` or equivalent in `.env.example`).
- Newsletter opt-in + double opt-in confirmation.
- Send a welcome/confirmation email; handle errors + duplicates gracefully.
- Emit `lead` / `signup` analytics events on submit.

## Done when

- Submitting a form writes a DB row and a real email is sent in test. No fake handlers.

## Before you start

- **Check `prioritize/`** for owner notes and extra images; treat as high-priority. Honor `build-brief.json` at the bundle root.

## Definition of Done

- Feature is REAL and fully wired (no mocks/stubs/placeholders): connected to the database/integration it needs, with env vars documented.
- `rebuild/task-list.json` updated; tests cover the happy path + one failure.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Run `CONTINUATION_MISSION.md` to harden before handoff.
