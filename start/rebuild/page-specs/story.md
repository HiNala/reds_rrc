# Page Spec — `/story`

- **URL:** https://www.redsrrc.com/story
- **Type:** unknown
- **Screenshots:** `pages/ec69494d9113d28d/desktop-full.png`, `pages/ec69494d9113d28d/mobile-full.png`
- **Copy source:** `pages/ec69494d9113d28d/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

A very minimal, centered, white-background company story page with lots of vertical whitespace and thin typography. The page presents a small logo in the upper left, a centered founder story section with a circular portrait, then a values section with three numbered statements, ending in a simple footer with navigation, contact info, and a partner badge.

## Build blueprint

### Sections (top → bottom)

1. **Header / top branding** — At the very top, a red stylized 'R' logo sits flush near the upper-left corner with no visible horizontal nav bar across the top. The page feels mostly content-first rather than menu-driven, with the branding acting as the only persistent header element in view.
   - components: logo mark, top-left brand anchor
   - copy: Red's Residential & Restaurant Construction branding
2. **Intro brand line and hero story block** — Centered near the top is the company name in a thin, elegant font, followed by the tagline in quotation marks: 'It is our pleasure to build for you'. Beneath that is a small circular portrait photo of the founder, then a large section title 'OUR STORY', a centered paragraph introducing Devin Aloise and the company, and a prominent red rectangular button labeled 'GET IN TOUCH'.
   - components: centered headline, tagline, circular founder portrait, section heading, body paragraph, primary CTA button
   - copy: Founder intro, background in Bay Area restaurants, shift into design/construction, emphasis on transparency and communication
3. **Our Values section** — A second centered section begins with the large heading 'OUR VALUES'. Below it are three vertically stacked value entries, each with a small red number, a thin uppercase value title, and a centered explanatory paragraph. The three values are spaced generously and read as standalone statements rather than cards.
   - components: section heading, numbered value items, uppercase subheads, centered paragraphs
   - copy: 01 Transparency: clear communication and change orders; 02 Efficiency: on-time, considerate scheduling; 03 Community: support for local causes and volunteer efforts
4. **Footer / bottom info strip** — The bottom area is still very open and airy, with a small set of centered footer links and contact information spread across the lower width. On the left appears licensing text, in the center are footer links ('Home', 'Red's Service Division', 'Our Story', 'Our Clients') and a phone/email row, while the right side shows a TimberTech Pro Platinum badge/logo.
   - components: footer navigation links, license text, phone icon + number, email icon + address, partner badge
   - copy: Licensed General Contractor #1112399, contact phone 707-634-3264, email info@redsrrc.com, footer links to site sections

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white, black/dark gray text, red accent, subtle warm tones in portrait; palette feel: Clean, sparse, and modern with strong red brand accents on an otherwise white, neutral canvas.
- **Typography:** heading body feel: Thin, minimalist sans-serif headings with wide spacing; body text is centered and readable with moderate line height.; scale weight: Large section headings, medium company title, smaller tagline and body copy; overall light font weight.
- **Density:** airy
- **Corners:** Mostly sharp rectangular elements; the portrait image is circular and the CTA button is a simple rectangle with straight edges.
- **Imagery:** Single small circular portrait photo; otherwise no decorative imagery or background photography.

### CTAs to implement

- **GET IN TOUCH** (Centered below the story paragraph in the hero/about block)

### Captured component landmarks

section, header, footer, nav, main

### Responsive

**Mobile (from `mobile-full.png`):** A very minimal, mostly white one-page "Our Story" layout with all content centered in a narrow mobile column and lots of vertical whitespace. The design is sparse and text-forward, using thin modern typography, small red accents, a circular portrait, and one prominent red call-to-action button.

- On mobile, the centered layout likely collapses into a single vertical column with the logo at top, portrait and story text stacked, then the values items one after another. Footer links and contact details would likely stack vertically, with the badge moving below or above the contact block for readability.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/story/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
