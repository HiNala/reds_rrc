# Integrations Plan

| Integration | Purpose | Env vars |
|-------------|---------|----------|
| **Auth.js (NextAuth v5)** | Authentication | `AUTH_SECRET`, `AUTH_URL` |
| **Resend** | Transactional email (form submissions, notifications) | `RESEND_API_KEY` |
| **Calendly or Cal.com** | Handle online booking or consultation scheduling without building a custom scheduling backend. | `NEXT_PUBLIC_BOOKING_URL` |
| **Cloudflare Turnstile** | Protect callback and inquiry forms from spam submissions. | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |

Re-wire each with the client's own credentials. Email (Resend) handles transactional/contact-form mail; analytics tags should use the client's new IDs.
