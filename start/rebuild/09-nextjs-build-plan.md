# Next.js Build Plan

**Site kind:** `dynamic-app` · **Database:** required

## 0. Scaffold FIRST — do not hand-write the project skeleton

Always bootstrap with the official boilerplate (latest stable Next.js, App Router, TypeScript, Tailwind, ESLint, `src/`, Turbopack). Run exactly:

```bash
npx create-next-app@latest . --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack
```

Then layer shadcn/ui (`npx shadcn@latest init`) and add components as needed. Never assemble the Next.js skeleton file-by-file by hand — scaffold, then build on top.

## 1. Routes

| Route | Page ID | Type |
|-------|---------|------|
| `/home-1` | 3d4bed22e1184b72 | unknown |
| `/services` | 47769ccb9f9b1156 | services_index |
| `/clients` | 6986a2a20dce035d | unknown |
| `/client-callback` | a50d937238dfdfff | unknown |
| `/services-5` | b2f46b066843f600 | unknown |
| `/` | cc4a84e52c0f0d87 | homepage |
| `/book-online` | d55ee22b4a6a506c | unknown |
| `/story` | ec69494d9113d28d | unknown |

## 2. Layouts

- Root layout (header + footer from `global/navigation.json` and `global/footer.json`)
- Per-route layouts as needed based on component analysis

## 3. Component Inventory

- `FooterColumn`
- `Form`
- `Header`
- `Main`
- `Navbar`
- `Section`

## 4. Data Strategy

- **Dynamic app** — PostgreSQL + Drizzle. See `database-plan.md`.
- API route handlers under `src/app/api/` — see `api-contracts.md`.
- SSG/ISR for marketing pages; server components + DB queries for app pages.
- Auth via Auth.js (NextAuth v5) — protect app routes with middleware.

## 5. Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Turbopack
- PostgreSQL + Drizzle ORM, Zod-validated API routes
- Integrations: see `integrations-plan.md` · Env: see `env-var-plan.md`
- Design: treat the source as **inspiration, not a clone** — see `design-token-plan.md`
