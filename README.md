# Red's Residential & Restaurant Construction

Website for Red's RRC — a licensed Bay Area general contractor specializing in residential construction, restaurant build-outs, and building maintenance since 2012.

**Live:** [redsrrc-production.up.railway.app](https://redsrrc-production.up.railway.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router, standalone output)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** PostgreSQL with Drizzle ORM
- **Object Storage:** MinIO (S3-compatible) for project images
- **Email:** Resend (transactional + lead notifications)
- **Auth:** jose (stateless JWT sessions for admin dashboard)
- **Analytics:** Built-in event tracking (page views, CTA clicks, form submissions)
- **Testing:** Vitest
- **Deployment:** Railway (Docker)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with full-bleed hero, services summary, testimonials |
| `/services` | Service overview with 3 core offerings |
| `/services/[slug]` | Service detail pages (planning, management, maintenance) |
| `/story` | Company story — founder portrait, lifestyle images, values |
| `/clients` | Testimonials + project gallery with real construction photos |
| `/projects` | Project portfolio with stats and category filtering |
| `/projects/[slug]` | Project detail with hero image, gallery, related projects |
| `/contact` | Contact form with lead capture and analytics tracking |
| `/blog` | Blog index with article cards |
| `/blog/[slug]` | Blog article pages with full content and JSON-LD |
| `/book-online` | Booking page (embeds external scheduler or falls back to contact) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/admin` | Admin dashboard (auth-protected) — leads, projects, analytics |

## SEO / AEO / GEO

- Dynamic OpenGraph + Twitter card images per page (ImageResponse)
- JSON-LD structured data (LocalBusiness, Organization, WebSite, Blog)
- `llms.txt` for AI crawler discovery
- `robots.txt` with explicit AI crawler rules
- `sitemap.xml` with all routes and image references
- Web app manifest with branded icons

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL 16+ (or use Docker Compose)
- MinIO (optional — static fallback photos work without it)

### Install & Run

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your database URL and secrets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker Compose (full stack)

```bash
cp .env.example .env
docker compose up --build
```

This starts the app, PostgreSQL, and MinIO together.

## Environment Variables

See [`.env.example`](.env.example) for the full list. Key variables:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | JWT signing secret (generate with `openssl rand -hex 32`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin dashboard credentials |
| `S3_ENDPOINT` / `S3_PUBLIC_URL` | MinIO endpoint for project images |
| `S3_ACCESS_KEY` / `S3_SECRET_KEY` | MinIO credentials |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO/canonical links |
| `SEED_ON_BOOT` | Set to `false` to skip DB seeding on container boot |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:push` | Push schema directly (dev only) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Seed demo data |

## Static Fallback Gallery

The clients and projects pages use a static fallback gallery with real construction photos from `/public/gallery/` when the database is unavailable or contains seed SVG placeholders. This ensures the site always looks professional with real project photos, whether or not MinIO is running.

## Deployment (Railway)

The app is deployed on Railway with a managed PostgreSQL database and Dockerfile builder.

```bash
# Create project and services
railway init --name reds-rrc
railway add --database postgres
railway add --service reds_rrc

# Configure source
railway environment edit --service-config reds_rrc source.repo <repo-url>
railway environment edit --service-config reds_rrc source.branch main
railway environment edit --service-config reds_rrc build.builder DOCKERFILE

# Set variables
railway variable set DATABASE_URL='${{Postgres.DATABASE_URL}}' --service reds_rrc
railway variable set AUTH_SECRET=<secret> --service reds_rrc
# ... see .env.example for all variables

# Deploy
railway up --service reds_rrc --detach

# Generate domain
railway domain --service reds_rrc
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    admin/                # Admin dashboard (auth-protected)
    api/                  # API routes (contact, newsletter, analytics)
    blog/                 # Blog index + article pages
    clients/              # Client testimonials + project gallery
    contact/              # Contact form
    projects/             # Project portfolio + detail pages
    services/             # Service overview + detail pages
    story/                # Company story
  components/
    brand/                # Logo
    layout/               # Header, footer, lead-capture popup
    marketing/            # Hero, services summary, testimonials
    site/                 # Project gallery, section headings, CTA bands
    seo/                  # JSON-LD structured data
    ui/                   # shadcn/ui primitives
    forms/                # Contact + newsletter + multi-step quote forms
    analytics/            # Event tracking
  lib/
    db/                   # Drizzle schema + connection
    static-projects.ts    # Static fallback gallery data
    site-config.ts        # Site metadata, nav, testimonials
    storage.ts            # S3/MinIO upload helpers
    auth.ts               # JWT auth helpers
    analytics-queries.ts  # Analytics dashboard queries
  db/
    schema.ts             # Drizzle table definitions
public/
  gallery/                # Original site project photos
  story/                  # Founder portraits + lifestyle images
  testimonials/           # Client avatar photos
  hero/                   # Hero background images
  brand/                  # Logo
```

## License

Proprietary — Red's Residential & Restaurant Construction.
