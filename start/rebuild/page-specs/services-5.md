# Page Spec — `/services-5`

- **URL:** https://www.redsrrc.com/services-5
- **Type:** unknown
- **Screenshots:** `pages/b2f46b066843f600/desktop-full.png`, `pages/b2f46b066843f600/mobile-full.png`
- **Copy source:** `pages/b2f46b066843f600/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

A very minimal, white-background services page for Red’s Residential & Restaurant Construction, with a small logo/header at the top, a centered title, and a simple two-column grid of service cards. The page uses lots of whitespace, thin divider lines, light gray service tiles, and a straightforward contact form above a sparse footer with navigation and trust badges.

## Build blueprint

### Sections (top → bottom)

1. **Top brand header** — At the very top-left is a red 'R' logo. Centered near the top is the company name 'Red's Residential & Restaurant Construction' with the tagline in quotes directly below it. This area is not a full nav bar; it reads more like a simple branded masthead.
   - components: logo mark, company name text, tagline text
   - copy: Brand name and slogan: 'It is our pleasure to build for you.'
2. **Page title** — Centered below the brand header is a large page title, 'Red's Service Division,' with a thin horizontal rule underneath. The typography is large, black, and airy, giving the page a clean brochure-like feel.
   - components: centered H1, horizontal divider
   - copy: Service Division landing heading.
3. **Service cards grid** — A two-column grid of large square service tiles appears below the title. Each card has a photo area on top and a caption strip at the bottom. The first row contains real service examples: left card labeled 'Drywall Repair' and right card labeled 'Framing & Trim'; each image appears to be a before/after or split-image style visual with a small centered chevron/slider-like mark over the image. The second row shows two gray placeholder cards with the text 'Service Name' centered near the bottom, indicating unfinished or templated entries.
   - components: service card, image tile, card caption bar, placeholder service tile, split-image or slider-like icon overlay
   - copy: Service offerings presented as cards; visible labels include 'Drywall Repair,' 'Framing & Trim,' and two placeholders 'Service Name.'
4. **Contact form section** — Centered further down is a 'Contact Us' heading with a short divider line and the subheading 'A Problem for You, is a Job for Us!' underneath. Below that is a compact form with three single-line inputs in one row ('First Name', 'Last Name', 'Email *'), followed by a larger textarea labeled 'Describe the Job *'. A red rectangular 'Send' button sits to the lower right of the textarea area.
   - components: section heading, subheading, text inputs, textarea, submit button
   - copy: Encourages users to contact the company for project requests; fields collect name, email, and job description.
5. **Footer** — The footer is sparse and centered with simple text links. It includes 'Home', 'Red's Service Division' (highlighted in red), 'Our Story', and 'Our Clients'. On the left is licensing text, and along the bottom center are contact icons with a phone number and email address. On the right is a TimberTech PRO platinum badge/logo, serving as a certification/trust element.
   - components: footer nav links, license text, phone icon + number, email icon + address, partner/certification badge
   - copy: Navigation and contact details, plus contractor licensing and TimberTech PRO branding.

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white, black, light gray, red accents; overall palette feel: Clean, neutral, and minimal with strong red brand accents used sparingly for logo, submit button, and selected footer link; overall feels understated and contractor-corporate.
- **Typography:** heading body feel: Modern sans-serif throughout, with a mix of large thin/regular-weight headings and smaller light body labels. The page uses centered headings and understated text styling.; scale weight: Headings are large but not heavy; body and labels are small to medium, mostly regular or light weight.
- **Density:** airy
- **Corners:** Mostly sharp corners; inputs and buttons appear rectangular with minimal rounding, if any
- **Imagery:** Practical construction photography, cropped into square service tiles; no decorative imagery, mostly real work examples with straightforward presentation

### CTAs to implement

- **Send** (Bottom-right of the contact form section)

### Captured component landmarks

section, header, footer, nav, main, form

### Responsive

**Mobile (from `mobile-full.png`):** Mobile-page layout with a very minimal white background, a small top logo/header area, a centered page title, then a vertical stack of large service tiles/cards. The style is sparse and clean, using thin gray rules, lots of whitespace, light gray placeholders, and small thin typography, ending with a compact contact form and a simple footer.

- On mobile, the two-column service grid would likely stack into a single column, with the form fields collapsing into vertical rows. The centered typography and simple footer would likely remain but wrap more tightly, and the top logo/company text would likely compress into a stacked header.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/services-5/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
