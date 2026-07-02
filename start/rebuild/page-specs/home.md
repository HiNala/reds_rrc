# Page Spec — `/`

- **URL:** https://www.redsrrc.com/
- **Type:** homepage
- **Screenshots:** `pages/cc4a84e52c0f0d87/desktop-full.png`, `pages/cc4a84e52c0f0d87/mobile-full.png`
- **Copy source:** `pages/cc4a84e52c0f0d87/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

A very clean, centered contractor homepage with a white background, thin modern typography, and strong red accent color. The page is laid out as a simple vertical sequence: a sparse top branding area, a full-width hero image, a centered introductory copy block with a prominent red CTA, a two-tile story/clients promo strip, and a minimal footer with contact/navigation and certification badges.

## Build blueprint

### Sections (top → bottom)

1. **Header / Brand area** — At the very top left is a large red stylized 'R' logo. Centered across the top is the company name, 'Red's Residential & Restaurant Construction,' with a smaller tagline beneath in quotes. There is no visible primary navigation in the top header area, and the whole header is spacious with lots of white space.
   - components: logo mark, centered site title, tagline/subtitle
   - copy: Red's Residential & Restaurant Construction / 'It is our pleasure to build for you'
2. **Hero image slider** — A large full-width banner image dominates the page, showing an outdoor deck/patio with chairs, a small round table, glass railing, and a scenic background. Left and right chevron arrows sit over the image, indicating a carousel/slider. The image spans nearly the full content width and functions as the main visual focal point.
   - components: full-width hero image, carousel previous arrow, carousel next arrow
   - copy: No overlaid text; purely visual hero showcasing completed work
3. **Introductory statement / primary CTA** — Centered on white space beneath the hero image is a large thin all-caps headline, followed by a short paragraph describing the company’s experience in building restaurants and homes in the California Bay Area since 2012. A red rectangular button sits centered below the paragraph.
   - components: centered section headline, supporting paragraph, primary CTA button
   - copy: UNIQUE BEAUTIFUL SPACES / Red's Construction has been delighting clients with building restaurants and homes in the California Bay Area since 2012... / GET IN TOUCH
4. **Two-column story/clients feature strip** — A wide gray divider band separates the intro from a two-panel grid below. The grid alternates image and text blocks: on the left, a portrait photo; next to it, a white text card titled 'OUR STORY' with a brief line about meeting the founder and a red 'READ' button. On the right side, a photo of a black dog in a kitchen; next to it, another white text card titled 'OUR CLIENTS' with a short playful line about clients and their pets, also ending with a red 'READ' button.
   - components: photo tile, text tile, section title, secondary CTA button
   - copy: OUR STORY / Meet Devin Aloise, our founder. / READ; OUR CLIENTS / and their pets share their love. / READ
5. **Footer** — The footer sits on a white background with centered navigation links arranged in two rows, contact details along the bottom center, licensing text on the left, and a certification badge/logo on the right. The footer feels sparse and airy, using small text and lots of whitespace.
   - components: footer navigation links, license text, phone/email contact row, partner/certification badge
   - copy: Home / Red's Service Division / Our Story / Our Clients / Licensed General Contractor #1112399 / 707-634-3264 / info@redsrrc.com / TimberTech PRO

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white, red, light gray, black/dark charcoal, soft natural greens and blues in photography; overall palette feel: Clean, minimal, and contractor-professional. The bright red accent is used sparingly for buttons, logo, and small highlights against a mostly white and neutral canvas.
- **Typography:** heading body feel: Headings use a thin, modern sans-serif with generous letter spacing and a refined look. Body text is small, light, and centered, with an understated corporate feel.; scale: Large but elegant top title, oversized hero-supporting headline, and small-to-medium body copy.; weight: Predominantly light/regular weights; buttons and some footer/nav text are slightly stronger for emphasis.
- **Density:** Airy
- **Corners:** Mostly sharp rectangular corners; buttons appear flat and squared rather than rounded.
- **Imagery:** Large photographic tiles with natural light and real-world project/staff imagery. The style is authentic and candid rather than polished studio photography.

### CTAs to implement

- **GET IN TOUCH** (Centered below the introductory paragraph under the hero image)
- **READ** (In the 'Our Story' text card within the two-column feature strip)
- **READ** (In the 'Our Clients' text card within the two-column feature strip)

### Captured component landmarks

section, header, footer, nav, main

### Responsive

**Mobile (from `mobile-full.png`):** A simple, vertically stacked one-page business homepage with lots of white space, centered typography, and strong red accent buttons. The page feels like a straightforward small-agency/contractor site: logo and company name at top, a large hero image, an intro section with a single CTA, then two promotional tiles and a sparse footer with contact details.

- The top brand header likely collapses into a simpler stacked layout on mobile, with the logo and title centered or stacked vertically., The hero image would scale full-width and retain carousel arrows, possibly moving arrows closer to the edges or hiding them on small screens., The intro text and CTA would stack into a single centered column with more vertical spacing., The two-feature strip would likely become two stacked cards or a single-column sequence, with images and text alternating vertically., Footer navigation and contact info would likely collapse into stacked centered rows.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
