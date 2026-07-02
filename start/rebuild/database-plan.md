# Database Plan

**Needs a database:** YES
**Site kind:** dynamic-app
**Engine / ORM:** PostgreSQL + Drizzle
**Confidence:** 0.80 (deterministic+ai+brief)

> The captured pages are a brochure-style construction services site with company story, services, clients, callback, and booking entry points. Lead capture and appointment requests can be handled via email or an external scheduling tool, so a custom Postgres database is not required. Brief requires a database: lead capture stores leads + sends email; blog content needs storage/indexing; site-wide analytics persists pageviews/traffic/users/logins/signups.

## Inferred Tables (Drizzle schema in `src/db/schema.ts`)

| Table | Fields | Why |
|-------|--------|-----|
| `users` | id, email, name, image, created_at, updated_at | Authenticated users |
| `sessions` | id, user_id, expires, session_token | Auth.js sessions |
| `accounts` | id, user_id, provider, provider_account_id | OAuth providers |
| `[domain_entity]` | id, user_id, …, created_at, updated_at | Primary app data the product tracks (rename per business — e.g. workouts, habits, projects). Confirm exact entities with the client / AI analysis. |
| `bookings` | id, user_id, starts_at, ends_at, status, notes | Appointments |
| `form_submissions` | id, form, payload_json, created_at | Persisted lead/contact submissions |
| `leads` |  |  |
| `posts` |  |  |
| `analytics_events` |  |  |

## Setup

- `npm i drizzle-orm pg` and `npm i -D drizzle-kit @types/pg`
- `DATABASE_URL` points at Postgres (Docker Compose locally — see `docker-stack-plan.md`)
- Define schema in `src/db/schema.ts`; run `npx drizzle-kit generate && npx drizzle-kit migrate`
- Rename `[domain_entity]` tables to real business entities (confirm with AI analysis / client)
