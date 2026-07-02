# Environment Variable Plan

Variables are derived from the inferred architecture (`site-architecture.json`).

## Required Variables

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Auth.js session secret |
| `AUTH_URL` | App URL for Auth.js callbacks |
| `DATABASE_URL` | Postgres connection string |
| `NEXT_PUBLIC_BOOKING_URL` | Integration credential — see integrations-plan.md |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Integration credential — see integrations-plan.md |
| `RESEND_API_KEY` | Resend transactional email key |
| `TURNSTILE_SECRET_KEY` | Integration credential — see integrations-plan.md |

Copy into `.env.local` (and the deployment platform's secrets). Never commit secrets.
