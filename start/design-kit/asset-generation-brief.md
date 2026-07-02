# Asset Generation Brief

The owner asked for **brand-new assets** — do NOT reuse the captured logo, imagery, or
typography. The slurped assets are reference-only (composition/subject inspiration).

**Brand:** the new brand
**Palette:** complementary to the source (see `tokens.json`)
**Tone:** professional, confident, warm, clear, trustworthy, premium, approachable · corners slightly-rounded · soft shadows

## Generate

1. **Logo / wordmark** — a clean, modern mark for *the new brand*. Deliver SVG + favicon +
   apple-touch-icon. Avoid imitating the source logo.
2. **Hero imagery** — on-brand, original (generated or licensed). Match the tone above.
3. **Typography** — pick a modern pairing (heading/body) via `next/font`; do not copy
   the source's exact typefaces.
4. **Section/feature illustrations + icons** — consistent style, the palette above.
5. **Blog thumbnails** — one per starter article (see the blog mission), 16:9, on-brand.

## Where assets go

`public/` (favicons, og-image), `src/assets/` or a CDN. Reference originals from the
bundle's `assets/` only to understand layout/placement — never to ship.
