# Page Spec — `/services`

- **URL:** https://www.redsrrc.com/services
- **Type:** services_index
- **Screenshots:** `pages/47769ccb9f9b1156/desktop-full.png`, `pages/47769ccb9f9b1156/mobile-full.png`
- **Copy source:** `pages/47769ccb9f9b1156/analysis/text.json`, `rebuild/03-page-copy-plan.json`

## Layout overview

The page is a very sparse services landing page with a white background and a centered brand header above a full-width three-panel hero. Below the hero is a minimal secondary navigation/contact band with lots of whitespace and a certification badge on the right, followed by a mostly empty lower page area in this viewport. Overall style is clean, construction-industry oriented, and image-driven with thin typography and light spacing.

## Build blueprint

### Sections (top → bottom)

1. **Top brand header** — A white horizontal bar spans the full width. On the far left is a red stylized 'R' logo. Centered in the header is the company name on one line with a smaller italic/tagline line directly beneath it.
   - components: logo mark, site title, tagline
   - copy: Red's Residential & Restaurant Construction; 'It is our pleasure to build for you'
2. **Three-service hero grid** — Directly under the header is a full-width hero broken into three equal vertical image tiles. Each tile uses a darkened construction photo background with large white centered headline text and a small lighter subcaption near the lower portion of each tile. The left tile shows a worker by siding and reads about building maintenance; the center tile shows tools/worksite imagery and reads construction management; the right tile shows hands over blueprints and reads construction planning.
   - components: 3-column image tiles, overlay headline text, small supporting caption
   - copy: Building Maintenance / Customized to Your Preferences; Construction Management / Efficient. Reliable. Exceptional.; Construction Planning / It's All in the Details
3. **Secondary navigation and contact/info band** — Below the hero is a wide white section with centered text navigation links arranged in two rows: first row shows Home, Red's Service Division, and Our Story; second row centers Our Clients underneath. On the left lower area is licensing text and in the middle lower area are contact details with small red phone and email icons. On the far right is a TimberTech Pro Platinum badge/logo block.
   - components: text links, license text, phone icon + phone number, email icon + email address, partner badge
   - copy: Home; Red's Service Division; Our Story; Our Clients; Licensed General Contractor #1112399; 707-634-3264; info@redsrrc.com; TimberTech PRO Platinum
4. **Lower page whitespace** — The remainder of the visible viewport is largely blank white space with no additional cards or content visible.
   - components: empty white content area
   - copy: No visible content in this viewport

### Visual style (modernize — palette comes from `design-kit/`)

- **Colors:** dominant colors: white, red, charcoal/black, muted construction browns/grays; overall palette feel: Clean, minimal, and professional with strong red brand accents against a white canvas and muted industrial imagery.
- **Typography:** heading body feel: Light, modern sans-serif with thin-to-regular weight; headings are large and airy, body/utility text is smaller and understated.; scale weight: Very large hero text, medium site title, small tagline and info text; overall low-to-medium weight typography with plenty of breathing room.
- **Density:** airy
- **Corners:** Mostly square/straight edges; no prominent rounded buttons or cards visible.
- **Imagery:** Photographic, industry-focused, slightly darkened/overlayed for contrast, with three equal vertical crops and centered text overlay.

### CTAs to implement

- **Phone number 707-634-3264** (Lower middle info band)
- **Email info@redsrrc.com** (Lower middle info band)

### Captured component landmarks

section, header, footer, nav, main

### Responsive

**Mobile (from `mobile-full.png`):** A very simple, mostly white landing page with a large centered brand title at the top and a three-panel hero collage beneath it. The overall style is clean and corporate, using thin typography, lots of whitespace, and construction-themed photography with dark overlays and large white text.

- On mobile, the 3-column hero would likely stack vertically or become swipeable tiles, with centered header text likely collapsing below the logo. The centered link row and contact details would probably wrap into stacked lines, and the TimberTech badge would move beneath the contact info or into a separate block.
- Build mobile-first; verify every breakpoint (sm/md/lg/xl).

## Build checklist

- [ ] Create the route at `src/app/services/page.tsx`.
- [ ] Build each section above as a composable component (design-kit tokens).
- [ ] Wire copy from the copy plan; wire any forms/CTAs to their server actions/API (see the wiring mission).
- [ ] Apply per-page SEO metadata (`rebuild/06-metadata-map.json`) + JSON-LD.
- [ ] Emit a `pageview` analytics event; track CTA clicks.
- [ ] Verify desktop + mobile against the screenshot/this spec.
