# Page Build — `/home-1`

Project: redsrrc-com-bundle
Source page: https://www.redsrrc.com/home-1

**Approach — modern rebuild:** reuse the captured **structure and layout** as examples, but DO NOT copy the source's colors, brand, copy, or positioning. Build a fresh modern identity.

## Objective

Build the `/home-1` route as a polished, responsive page that matches the intended layout and is fully wired.

## Work from the spec

- **Spec:** `rebuild/page-specs/home-1.md` — section-by-section layout, visual cues, CTAs, components, and responsive notes.
- **Screenshots:** `pages/3d4bed22e1184b72/desktop-full.png`, `pages/3d4bed22e1184b72/mobile-full.png` (view if you can; else use the spec).
- **Copy:** `rebuild/03-page-copy-plan.json` + `pages/3d4bed22e1184b72/analysis/text.json`.
- **Metadata:** `rebuild/06-metadata-map.json` for this route.

## Build

1. Create `src/app/home-1/page.tsx`.
2. Compose each section from the spec as design-kit components (modernize — don't clone the dated source).
3. Wire CTAs/forms to their server actions/API (see the wiring mission).
4. Apply SEO metadata + JSON-LD; ensure it's in the sitemap.
5. Emit a `pageview` event; track CTA clicks.
6. Verify desktop **and** mobile against the spec/screenshots.

## Definition of Done

- Route renders, matches the spec layout, is responsive, and looks polished.
- All interactive elements are wired for real (no dead buttons/mocks).
- **Analytics & logging:** instrument every page/route/form/auth surface you touch (pageview + traffic, and where relevant signup, login, lead-capture, and purchase events) per `rebuild/analytics-plan.md`. No page ships untracked.
- `rebuild/task-list.json` updated.
