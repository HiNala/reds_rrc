# Page Spec — `/service-page/client-callback`

- **URL:** https://www.redsrrc.com/service-page/client-callback
- **Type:** unknown
- **Screenshots:** `pages/a50d937238dfdfff/desktop-full.png`, `pages/a50d937238dfdfff/mobile-full.png`
- **Copy source:** `pages/a50d937238dfdfff/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

Minimalist service-booking page on a white background with a centered content column and lots of whitespace. The page uses thin modern typography, a small red brand logo, a prominent red booking button, and a sparse footer-like area with contact info, navigation links, and certification badges.

## Build blueprint

### Sections (top → bottom)

1. **Brand/header area** — At the very top left is a red stylized 'R' logo. Centered across the top is the company name 'Red's Residential & Restaurant Construction' with the tagline in quotes directly underneath. No visible menu bar or search; the header feels more like a static brand masthead than a conventional nav.
   - components: logo mark, centered site title, tagline text
   - copy: Company branding and slogan.
2. **Service detail / booking block** — Centered below the header is the service title 'Client Callback' in large thin type. A short supporting sentence says 'We will call you back at this time.' Beneath that is a small bordered time selector showing '15 min', followed by a bright red rectangular 'Book Now' button.
   - components: service title, supporting description, duration selector, primary booking button
   - copy: Schedule a 15-minute client callback and book it now.
3. **Contact details divider block** — A thin horizontal divider line separates the booking area from contact details. The next block is titled 'Contact Details' with an email address underneath: 'Devin@Redsrrc.com'. Another thin divider line appears below.
   - components: section heading, email link, horizontal rules
   - copy: Direct contact email for the business.
4. **Footer/navigation and trust marks** — The lower portion acts like a footer on a large white canvas. Centered text links include 'Home', 'Red's Service Division', 'Our Story', and below them 'Our Clients'. On the lower left is licensing text 'Licensed General Contractor #1112399'. Along the bottom center are contact icons with a phone number and email address. On the lower right is a gray TimberTech Pro Platinum certification badge.
   - components: footer nav links, license text, phone icon + number, email icon + address, certification logo/badge
   - copy: Footer navigation, license credentials, and contact methods.

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white background, black/dark gray text, red brand accents, light gray divider lines, gray certification badge; overall palette feel: Clean, sparse, and high-contrast with red used sparingly for brand emphasis and CTA.
- **Typography:** heading body feel: Thin, modern sans-serif type with a light, elegant feel.; scale: Large centered title/header text, medium section title, smaller body/support text.; weight: Mostly light-to-regular weight; CTA text is slightly heavier by contrast.
- **Density:** airy
- **Corners:** Mostly sharp, rectangular corners; the time selector and button are boxy rather than rounded.
- **Imagery:** No lifestyle photography; only a logo mark and a small trust badge/logo image.

### CTAs to implement

- **Book Now** (Centered beneath the 15 min selector in the main service block)

### Captured component landmarks

section, header, footer, nav, main, div

### Responsive

**Mobile (from `mobile-full.png`):** A very minimal, mostly white booking page with a simple branded header, a large service title, one scheduling CTA, and a sparse contact section. The page feels airy and understated, using thin typography, lots of whitespace, and a small amount of red accent color for buttons and icons.

- On mobile, the centered single-column booking content would likely stack vertically with the logo and header text compressed near the top. Footer items would likely wrap into one or two columns, with the badge moving below or beside the contact details and links stacking in a vertical list.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/service-page/client-callback/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
