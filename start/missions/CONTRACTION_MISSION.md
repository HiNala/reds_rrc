# Continuation & Hardening Mission

> Run this **after each wave** and **at the very end**. It is a recursive
> review → test → fix → polish → re-verify loop. You are builder, reviewer, QA
> engineer, security auditor, and the next developer — all at once. Do not start
> new features until the current state is real, working, and better than you found it.

## Non-negotiable end state

The mission is only done when ALL of these hold:

- The app **builds** and **runs** with no errors.
- **All tests pass**; lint and type checks are clean (zero errors).
- **No mocks, stubs, fakes, or placeholders** remain in shipped code.
- If the architecture calls for a database (`rebuild/site-architecture.json`
  `needs_database: true`), the app is **really connected to Postgres via the ORM**
  with real migrations — **no mocked data layers**. If it's a static facade, there is
  **no** database and forms post through the real serverless route (Resend).
- Every page renders with proper **loading, empty, error, and success** states.
- SEO + GEO are complete (metadata, JSON-LD, sitemap.xml, robots.txt, llms.txt);
  Lighthouse > 95; WCAG AA.
- `rebuild/task-list.json` is fully updated; `progress.md` and `decisions.md` current.

## Phase 1 — Orientation
Read `rebuild/progress.md`, `rebuild/task-list.json`, and recent changes. Determine what
was just completed, what's next, and which lanes are affected.

## Phase 2 — Reality check
Build a checklist from the task list, plans, and contraction reports. Inspect the real
implementation. Classify every finding: must-fix-now / should-fix-if-nearby / follow-up /
ignore. Hunt specifically for: happy-path-only code, fakes/placeholders, hardcoded values,
untyped boundaries, missing error/loading/empty states, missing validation or auth,
mock data layers where a real DB is required, and docs that don't match behavior.

## Phase 3 — Patch & improve
Fix all must-fix items (and adjacent low-risk should-fix). Prefer real implementations,
typed contracts, explicit errors, small functions, and reuse over duplication.

## Phase 4 — Three-perspective review
- **User:** correct loading/empty/error/success states; honest output; smooth flow.
- **Future developer:** clear names/boundaries; discoverable commands; easy to extend.
- **Production operator:** dependency failures handled; input validated; secrets safe;
  migrations safe; external calls isolated; sane retries/timeouts/fallbacks.

## Phase 5 — Self-improving loops (repeat until low-value)
1. **Break it on purpose** — invalid/empty/duplicate/stale data, failed network,
   unauthorized access, repeated submit, partial state. Add handling + tests.
2. **Remove the weakest assumption** — "env var always exists", "list never empty",
   "API shape never changes", "user always has access". Eliminate or document it.
3. **Tighten the contract** — fix any frontend/backend, API/schema, DB/model, or
   docs/code mismatch with types, Zod schemas, validation, or tests.
4. **Shrink accidental complexity** — delete dead code, dupes, speculative options.
5. **Improve the next run** — sharpen the highest-friction README/command/fixture.

## Phase 6 — Validation gauntlet
Run the strongest practical checks (prefer project scripts): install, format, lint,
typecheck, unit + integration + e2e tests, build, DB migrations, `docker compose config`,
local health check. On failure: read it, fix the root cause, re-run it and anything related.
Never claim a check passed that you did not run.

## Phase 7 — Final diff audit & commit
Verify every changed file is intentional; no secrets, no debug code, docs/tests match
behavior, migrations ordered. Commit with a clear message and update `rebuild/progress.md`.

## Per-wave verification against the capture
1. Compare each rebuilt page to its captured counterpart in `pages/`.
2. Confirm assets in `assets/asset-manifest.json` are used or intentionally replaced.
3. Check metadata against `rebuild/06-metadata-map.json`; forms/CTAs against the
   conversion strategy; architecture against `rebuild/site-architecture.json`.
4. Write a contraction report to `rebuild/contraction-reports/`.

## Handoff
End with: what you audited, defects found, fixes made, loops completed, files changed,
commands run + results, and whether the repo is ready for the next mission.

## Captured Site Overview

## Captured Site Overview

- **Pages:** 8
- **Text blocks:** 282
- **Total words:** 957
- **Components:** 70 (FooterColumn, Form, Header, Main, Navbar, Section)
- **Image candidates:** 253
- **CTAs:** 17
- **Forms:** 3
- **Structured data types:** WebSite
- **SEO warnings:** 25

### Page URLs

- https://www.redsrrc.com/home-1
- https://www.redsrrc.com/services
- https://www.redsrrc.com/clients
- https://www.redsrrc.com/service-page/client-callback
- https://www.redsrrc.com/services-5
- https://www.redsrrc.com/
- https://redsrrc.com/book-online
- https://www.redsrrc.com/story
