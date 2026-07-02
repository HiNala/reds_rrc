<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Build & verification commands

- `npx next dev` — start dev server (Turbopack) on http://localhost:3000
- `npx tsc --noEmit` — typecheck (zero errors expected)
- `npx next build` — production build (must kill dev server first; only one `next` process can run at a time on Windows)
- Before running `next build`, always kill node processes (`taskkill /f /im node.exe`) and remove `.next` cache to avoid "Another next build process is already running" errors

## Key conventions (Next.js 16)

- Use `src/proxy.ts` (NOT `middleware.ts`) — the `middleware` file convention is deprecated and renamed to `proxy`. Export a `proxy` function (or default export).
- When using `@base-ui/react` `Button` with `render={<Link/>}` or `render={<a/>}`, always pass `nativeButton={false}` to avoid accessibility console errors.
- `turbopack.root` should be set in `next.config.ts` to the project root (`__dirname`) to avoid lockfile root warnings.

## Docker stack

- `docker compose up -d` — boot full stack (postgres + minio + web)
- `docker compose down` — stop all containers
- `docker compose down -v` — stop and delete data volumes (fresh start)
- `docker compose build web` — rebuild the web image after code changes
- The `docker-entrypoint.sh` runs `mark-migration.js` → `migrate.js` → `seed-projects.js` → `node server.js`
- The Dockerfile installs `drizzle-orm`, `pg`, and `@aws-sdk/client-s3` in the runner stage because the standalone Next.js output doesn't include them
- Shell scripts must use LF line endings — the Dockerfile runs `sed -i 's/\r$//'` as a safety net
- Default admin credentials: `admin@redsrrc.com` / `admin123` (set in `.env`)
- MinIO console: http://localhost:9001 (minioadmin / minioadmin)

## Database

- Drizzle migrations in `drizzle/` — run via `node scripts/migrate.js`
- If migrations fail because columns already exist (from a prior `drizzle-kit push`), run `node scripts/mark-migration.js` to mark them as applied
- Seed sample projects: `node scripts/seed-projects.js` (skips if projects already exist)
- The `projects` table has a `slug` column (varchar(220), NOT NULL, unique) — always set it when creating projects

## Project structure

- Public site: `/`, `/services`, `/projects`, `/clients`, `/blog`, `/story`, `/contact`, `/book-online`
- Admin dashboard: `/admin` (login at `/admin/login`)
- Project gallery: DB-backed projects with MinIO-stored images, managed via `/admin/projects`
- Static projects: 8 projects with real photos in `/public/gallery/` (defined in `src/lib/static-projects.ts`)
- The `/clients` page shows static projects (real photos); the `/projects` page shows both static and DB projects
