# Page Spec — `/home-1`

- **URL:** https://www.redsrrc.com/home-1
- **Type:** unknown
- **Screenshots:** `pages/3d4bed22e1184b72/desktop-full.png`, `pages/3d4bed22e1184b72/mobile-full.png`
- **Copy source:** `pages/3d4bed22e1184b72/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

The page is a simple, vertically stacked landing page for a construction company, using a white header, a large full-width image hero, a bold red contact block, and a light cream testimonials section. The visual style is minimal and utilitarian, with centered content, thin typography, and strong color contrast rather than a polished multi-section marketing layout.

## Build blueprint

### Sections (top → bottom)

1. **Header / top branding** — A white horizontal header spans the full width. On the far left is a red stylized 'R' logo. Centered in the header is the company name on one line with a smaller tagline directly beneath it; no visible navigation links or utility icons are shown in the screenshot.
   - components: logo mark, centered brand title, tagline/subtitle
   - copy: Red's Residential & Restaurant Construction; 'It is our pleasure to build for you'
2. **Hero image / project showcase** — Below the header is a large full-width photo of an interior flooring installation, filling most of the viewport width with little framing. The image appears to function like a slideshow or gallery, with a row of small pagination dots near the lower center of the photo indicating multiple slides.
   - components: large hero image, carousel pagination dots
   - copy: No overlaid headline; purely visual project imagery
3. **Contact callout panel** — A solid bright red section follows immediately under the hero image. At the top of the block is a centered prompt encouraging users to call, text, or message for a free in-person bid. In the center are stacked contact details, then a simple contact form with three underlined fields and a wide white submit button. The form is centered and vertically spacious, leaving a lot of red negative space below.
   - components: centered callout text, phone number, email address, text input fields, submit button
   - copy: Do you have a project in mind? Call, Text, or Message us for free in person bid.; 707-909-4686; Info@RedsRRC.com; Send
4. **Testimonials section** — After the red block, the page switches to a light cream background with a centered section heading 'Testimonials' in red, followed by a smaller linked subheading/tagline beneath it. A large quote-mark icon sits above a long centered testimonial paragraph, and the customer name appears below the body text. The section is very open and airy, with a narrow text column and lots of whitespace.
   - components: section heading, subheading/link, quote icon, testimonial paragraph, author name
   - copy: Testimonials; 'A Contractor that’s also a human being'; a long praise-filled review; Blake Young

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: bright construction red, white, warm cream/beige, neutral gray-brown flooring tones; overall palette feel: Simple and high-contrast, with the red brand color dominating the contact area and the cream testimonial area softening the page.
- **Typography:** heading body feel: Light, modern sans-serif typography with centered headings and understated body text.; scale: Small-to-medium overall; headings are not oversized and the layout relies more on color blocks than typographic hierarchy.; weight: Mostly regular/light weight, with occasional bold emphasis in contact details and testimonial text.
- **Density:** comfortable
- **Corners:** Mostly square edges and straight dividers; the design appears sharp and linear rather than rounded.
- **Imagery:** Real-life contractor/project photography, unfiltered and documentary-like, used as a large showcase image.

### CTAs to implement

- **Call/Text/Message us** (Top of the red contact section)
- **Send** (Bottom of the contact form in the red section)

### Captured component landmarks

section, header, footer, nav, main, form

### Responsive

**Mobile (from `mobile-full.png`):** A very minimal, vertically stacked mobile homepage for a construction company, using a clean white/cream-and-red palette with lots of whitespace and centered text. The page is mostly a hero area, a large red contact form band, a testimonials section, and a simple footer with navigation and credentials badges.

- On mobile, the centered header branding would likely stack vertically, the hero image would shrink to full width with the carousel dots retained, and the red contact form would become a single-column stack with full-width fields and button. The testimonial text would likely reflow into a narrower column with increased vertical length.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/home-1/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
