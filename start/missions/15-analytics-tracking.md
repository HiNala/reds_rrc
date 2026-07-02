# Mission 15 — Analytics & Tracking (site-wide)

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

## Objective

Full analytics + logging across the ENTIRE site — every page, traffic source, user, login, and sign-up — per `rebuild/analytics-plan.md`.

## Tasks

- Stand up analytics (self-hosted); add a tracking provider in the root layout so **every route** records a pageview automatically.
- Capture traffic context (referrer, UTM, device, locale) on first load.
- Emit lifecycle events: `signup`, `login`, `lead`, and `purchase` (wired from the auth, lead-capture, and commerce missions).
- Persist events to the database with a queryable schema; add a minimal internal dashboard or documented queries.
- Respect consent/DNT; document all events in `rebuild/analytics-plan.md`.

## Done when

- Navigating any page logs a pageview, and signup/login/lead/purchase each emit a tracked event persisted to the DB. No untracked pages.

## Before you start

- **Check `prioritize/`** for owner notes and extra images; treat as high-priority. Honor `build-brief.json` at the bundle root.

## Definition of Done

- Feature is REAL and fully wired (no mocks/stubs/placeholders): connected to the database/integration it needs, with env vars documented.
- `rebuild/task-list.json` updated; tests cover the happy path + one failure.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Run `CONTINUATION_MISSION.md` to harden before handoff.
