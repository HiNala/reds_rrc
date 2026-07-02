# Mission 14 — Admin Dashboard (wired to analytics)

Project: redsrrc-com-bundle
Source: https://www.redsrrc.com/

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

## Objective

Build a REAL, auth-protected `/admin` dashboard custom-wired to the `analytics_events` table and domain tables — so the owner can see traffic, users, and revenue at a glance. Not a static mockup: live queries against the database.

## Tasks

- Protect `/admin` (Auth.js v5; admin-only role). Never expose it publicly.
- Build the data layer with the queries in `rebuild/analytics-plan.md`:
  - Pageviews over time + top pages
  - Traffic by source (referrer / utm_source)
  - Signups & logins over time
  - Leads (count + recent, from the `leads` table)
  - Revenue & orders (from `purchase` events + the `orders` table)
  - Conversion funnel (pageview → signup → purchase)
- Render KPI cards + charts (a charting lib) + recent-activity tables; date-range filter; server-side aggregation (don't ship raw rows to the client).
- Use the **same** `AnalyticsEvent` types as the tracker so they never drift.
- Empty/loading/error states; fast queries (index `analytics_events(event, created_at)`).

## Done when

- `/admin` requires auth and shows live metrics computed from real rows in the DB; creating a pageview/signup/lead/order is reflected in the dashboard.

## Before you start

- **Check `prioritize/`** for owner notes and extra images; treat as high-priority. Honor `build-brief.json` at the bundle root.

## Definition of Done

- Feature is REAL and fully wired (no mocks/stubs/placeholders): connected to the database/integration it needs, with env vars documented.
- `rebuild/task-list.json` updated; tests cover the happy path + one failure.
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- Run `CONTINUATION_MISSION.md` to harden before handoff.
