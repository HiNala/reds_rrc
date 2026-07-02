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
