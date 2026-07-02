# Page Spec — `/book-online`

- **URL:** https://redsrrc.com/book-online
- **Type:** unknown
- **Screenshots:** `pages/d55ee22b4a6a506c/desktop-full.png`, `pages/d55ee22b4a6a506c/mobile-full.png`
- **Copy source:** `pages/d55ee22b4a6a506c/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

The page is an extremely minimal full-screen password gate on a white background. A small close “X” icon sits in the top-right corner, while a centered guest access form with a title, instruction text, single password field, and a bright red submit button occupies the middle of the screen.

## Build blueprint

### Sections (top → bottom)

1. **Full-page guest access overlay** — A blank white screen with a single centered authentication form. There is no visible site navigation, content feed, or footer; the interface is designed purely to request a password before entry.
   - components: Close icon button in the top-right corner, Centered heading, Instructional text, Single-line password input, Primary submit button
   - copy: Guest Area / Please enter the password below. / Password / Go

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white, black, red, light gray; overall palette feel: Very sparse and high-contrast, with a clean white canvas and a single strong red call-to-action.
- **Typography:** heading body feel: Modern, thin sans-serif typography.; scale: Large, airy headline with smaller supporting copy and input label.; weight: Light/regular weight for the title; regular weight for supporting text; button text appears medium-weight.
- **Density:** airy
- **Corners:** Mostly square and sharp; the button and field appear minimally rounded or nearly square.
- **Imagery:** No imagery present.

### CTAs to implement

- **Go** (Centered below the password field)
- **Close (X)** (Top-right corner)

### Captured component landmarks

form

### Responsive

**Mobile (from `mobile-full.png`):** This mobile page is a very minimal password gate rather than a full booking flow. The screen is mostly white space, with a centered guest access prompt, a single password field, and a prominent red submit button; a small close X sits near the top right.

- On mobile, the form would likely remain centered with the same vertical stack: title, instruction, password field, then button. The close icon would stay pinned in the top-right, and spacing would probably tighten while maintaining the minimalist full-screen white layout.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/book-online/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
