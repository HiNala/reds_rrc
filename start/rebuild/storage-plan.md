# Storage Plan

## Asset Storage: MinIO/S3

### Assets to store: ~253 images + CSS, fonts, JS, video

### Bucket structure (mirrors the captured `assets/` layout):

- `assets/images/` — all downloaded images (incl. logos)
- `assets/icons/` — favicons, apple-touch-icons
- `assets/styles/` — downloaded stylesheets (.css)
- `assets/fonts/` — woff2/woff/ttf/otf font files
- `assets/scripts/` — JavaScript bundles (.js/.mjs)
- `assets/documents/` — PDFs and downloadable docs
- `assets/media/` — self-hosted video/audio files
- `assets/meta/` — web app manifests

### Upload strategy:

- Upload during build step
- Reference via CDN URL in production
- Cache headers: 1 year for hashed assets
