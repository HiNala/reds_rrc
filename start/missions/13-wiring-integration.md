# Mission 13 — Wiring & Integration (make it real)

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

## Objective

Connect the UI to real data and behavior end-to-end — no dead buttons, no mock data. Every interactive surface is wired to a server action/route, the database, or the right integration.

## Tasks

- **Forms → server actions → DB.** Every form (lead capture, contact, checkout, auth) posts to a server action/route with Zod validation and persists real rows; show success/error/empty states.
- **Components → API contracts.** Wire data components to the routes in `rebuild/api-contracts.md`; type the responses; handle loading + error + empty.
- **Auth gating.** Protect account/app/admin routes (Auth.js v5); redirect unauthenticated users; thread the session to the UI.
- **Integrations.** Wire Stripe/Resend/etc. with env vars from `rebuild/env-var-plan.md`; document them in `.env.example`.
- **Analytics events.** Fire `signup`/`login`/`lead`/`purchase`/`cta_click` from the real handlers (see the analytics mission + `src/lib/analytics.ts`).
- **No facades.** Replace every placeholder/TODO/mock with the real implementation.

## Done when

- Every button/form/CTA does something real and persists/affects state; the app builds and the wired flows pass tests (happy path + one failure each).

## Before you start

- **Check `prioritize/`** for owner notes and extra images; treat as high-priority. Honor `build-brief.json` at the bundle root.

## Definition of Done

- Feature is REAL and fully wired (no mocks/stubs/placeholders): connected to the database/integration it needs, with env vars documented.
- `rebuild/task-list.json` updated; tests cover the happy path + one failure.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Run `CONTINUATION_MISSION.md` to harden before handoff.
