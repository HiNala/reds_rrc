# Analytics & Logging Plan (mandatory)

Every page, traffic source, user, login, and sign-up is tracked — no page ships untracked. Wire a provider in the root layout so **all routes** record a pageview automatically, and emit lifecycle events from the auth/lead/commerce flows.

## Core event taxonomy

| Event | When | Key props |
|-------|------|-----------|
| `pageview` | every route render | path, referrer, utm_*, device, locale |
| `session_start` | first load of a session | referrer, landing_path, utm_* |
| `signup` | account/newsletter created | method, source |
| `login` | authenticated session start | method |
| `lead` | lead/contact form submit | source, form_id |
| `purchase` | checkout/pre-order completed | amount_cents, currency, order_id |
| `cta_click` | primary CTA interaction | label, location |

## Persistence

Store every event in the `analytics_events` table (`id, event, path, user_id, session_id, referrer, utm, props(jsonb), created_at`). Respect consent / Do-Not-Track.

## Shared contract (used by tracking AND the admin dashboard)

Define events once and share the type between the client tracker, the server insert, and the admin dashboard queries so they never drift:

```ts
// src/lib/analytics.ts
export type AnalyticsEvent =
  | "pageview" | "session_start" | "signup" | "login"
  | "lead" | "purchase" | "cta_click";

export async function track(
  event: AnalyticsEvent,
  props: Record<string, unknown> = {},
): Promise<void> {
  // POST to /api/track; the server resolves user_id/session_id from cookies,
  // captures referrer + utm, and inserts one analytics_events row.
}
```

## Admin dashboard queries (wire these on `/admin`)

- **Pageviews over time** — count `pageview` by day.
- **Traffic by source** — group `session_start` by `props.referrer` / `utm_source`.
- **Top pages** — count `pageview` by `path`.
- **Signups / logins over time** — count `signup` / `login` by day.
- **Leads** — count `lead`, join the `leads` table for detail.
- **Revenue / orders** — sum `purchase` `props.amount_cents`, join `orders`.
- **Funnel** — pageview → signup → purchase conversion.

The admin dashboard mission builds the UI for these.

## Captured-site CTAs to instrument

- `cta_click` — CTA: Send
- `email_click` — CTA: Info@RedsRRC.com

## Pages to track

- `pageview` — https://www.redsrrc.com/home-1
- `pageview` — https://www.redsrrc.com/services
- `pageview` — https://www.redsrrc.com/clients
- `pageview` — https://www.redsrrc.com/service-page/client-callback
- `pageview` — https://www.redsrrc.com/services-5
- `pageview` — https://www.redsrrc.com/
- `pageview` — https://redsrrc.com/book-online
- `pageview` — https://www.redsrrc.com/story
