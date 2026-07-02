# API Contracts

App Router route handlers under `src/app/api/`. Validate inputs with Zod.

| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| POST | `/api/auth/[...nextauth]` | Auth.js handler | no |
| GET | `/api/[domain-entity]` | List [domain-entity] | yes |
| POST | `/api/[domain-entity]` | Create [domain-entity | yes |
| GET | `/api/[domain-entity]/[id]` | Get one [domain-entity] | yes |
| PATCH | `/api/[domain-entity]/[id]` | Update [domain-entity] | yes |
| DELETE | `/api/[domain-entity]/[id]` | Delete [domain-entity] | yes |
| GET | `/api/bookings` | List bookings | yes |
| POST | `/api/bookings` | Create booking | yes |
| GET | `/api/bookings/[id]` | Get one bookings | yes |
| PATCH | `/api/bookings/[id]` | Update bookings | yes |
| DELETE | `/api/bookings/[id]` | Delete bookings | yes |
| POST | `/api/contact` | Handle form submissions | no |

Conventions: JSON request/response, Zod schemas in `src/lib/validators/`, typed responses, 4xx on validation error, auth via Auth.js middleware.
