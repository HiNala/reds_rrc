# Page Spec — `/clients`

- **URL:** https://www.redsrrc.com/clients
- **Type:** unknown
- **Screenshots:** `pages/6986a2a20dce035d/desktop-full.png`, `pages/6986a2a20dce035d/mobile-full.png`
- **Copy source:** `pages/6986a2a20dce035d/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

A very minimal, centered, mostly white client/testimonials page for Red's Residential & Restaurant Construction, with a small logo and brand name at the top, a large “OUR CLIENTS” intro, and a prominent red “GET IN TOUCH” button. Below that is a wide gray testimonial carousel and a “More love” section featuring a large project/lifestyle photo, ending with a sparse footer that contains navigation, license/contact info, and a certification badge.

## Build blueprint

### Sections (top → bottom)

1. **Header / Brand strip** — At the very top-left is a red stylized RR logo. Centered near the top is the company name “Red’s Residential & Restaurant Construction” with the tagline beneath it in quotes. There is no visible horizontal nav bar in the header area; the top feels open and airy.
   - components: Logo mark, Brand name, Tagline
   - copy: Company branding and slogan.
2. **Clients hero / intro** — Centered in a large white section is the page heading “OUR CLIENTS” in a thin, modern font. Under it is a short paragraph about treating clients, families, belongings, and pets with care, followed by a centered red call-to-action button.
   - components: Section heading, Support paragraph, Primary CTA button
   - copy: Introduces the clients page and emphasizes care, trust, and community legacy.
3. **Testimonial carousel** — A full-width light-gray band contains a centered testimonial. Above the quote is the client name and project/location label, followed by a thin divider line. Left and right chevron arrows sit midway on the far edges, and small pagination dots appear near the bottom center, indicating a slider.
   - components: Carousel container, Testimonial author line, Quote text, Prev/next chevrons, Pagination dots
   - copy: A client quote praising communication, schedule, and budget reliability.
4. **More love / photo showcase** — Below the carousel is another centered heading, “More love,” with a smaller subtitle saying these are new and dear friends made on projects. Under the text is a large, square-ish photo aligned centrally, showing a man with curly hair beside a dog; a faint right-arrow overlay suggests another image in a gallery or carousel.
   - components: Section heading, Subheading, Large image gallery item, Gallery navigation arrow
   - copy: Showcases friendly behind-the-scenes project moments and positive relationships.
5. **Footer** — The footer is sparse and centered. It includes text links for Home, Red’s Service Division, Our Story, and Our Clients (highlighted in red). Contact details appear below with phone and email icons, plus a contractor license line on the left. On the right is a TimberTech Pro platinum badge/logo.
   - components: Footer nav links, License text, Phone contact, Email contact, Certification badge
   - copy: Basic site navigation, license number, phone, email, and supplier certification.

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white, light gray, red accents, black/dark gray text; overall palette feel: Clean, restrained, and neutral with strong red brand accents; the palette feels professional, minimal, and airy.
- **Typography:** heading body feel: Thin, elegant sans-serif headings with lighter-weight body text. The overall typography is modern and understated.; scale: Large page heading, medium brand name, smaller supporting copy, small footer text.; weight: Mostly light to regular weights; the testimonial author line is slightly bolder than body copy.
- **Density:** airy
- **Corners:** Mostly sharp corners; the button appears rectangular with little or no visible rounding.
- **Imagery:** Lifestyle/documentary photography with a casual, personal feel; images are large and unframed, presented with generous whitespace.

### CTAs to implement

- **GET IN TOUCH** (Centered below the “OUR CLIENTS” intro copy)

### Captured component landmarks

section, header, footer, nav, main, button

### Responsive

**Mobile (from `mobile-full.png`):** The page is a clean, white, centered client/testimonial landing page for Red’s Residential & Restaurant Construction with a minimal, editorial feel. It uses thin typography, lots of whitespace, and small red accents for branding and calls to action, followed by a large testimonial slider and a personal “More love” photo section before a sparse footer.

- On mobile, the centered sections would likely stack vertically with reduced image width., The footer nav and contact details would probably collapse into single-column rows., Carousel arrows would remain on the sides or move closer to the content; pagination dots would stay centered., The large image in the “More love” section would scale down to fit the viewport width.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/clients/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
