/**
 * Seed sample projects with placeholder images uploaded to MinIO.
 *
 * Usage:
 *   node scripts/seed-projects.js
 *
 * Creates 6 realistic sample projects, each with 1-3 generated SVG
 * placeholder images uploaded to the S3-compatible MinIO bucket.
 * Safe to run multiple times — checks for existing data first.
 */
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const {
  S3Client,
  PutObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
} = require("@aws-sdk/client-s3");
const { randomUUID } = require("crypto");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("[seed-projects] DATABASE_URL is not set.");
  process.exit(1);
}

// S3 / MinIO config
const ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:9000";
const PUBLIC_URL = (process.env.S3_PUBLIC_URL || ENDPOINT).replace(/\/$/, "");
const ACCESS_KEY = process.env.S3_ACCESS_KEY || "minioadmin";
const SECRET_KEY = process.env.S3_SECRET_KEY || "minioadmin";
const BUCKET = process.env.S3_BUCKET || "redsrrc-projects";
const REGION = process.env.S3_REGION || "us-east-1";

const pool = new Pool({ connectionString });
const db = drizzle(pool);

const s3 = new S3Client({
  endpoint: ENDPOINT,
  region: REGION,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  forcePathStyle: true,
});

/* ------------------------------------------------------------------ */
/* SVG placeholder generator                                           */
/* ------------------------------------------------------------------ */

const PALETTES = [
  { bg: "#1e3a5f", accent: "#f59e0b", text: "#ffffff" },   // Navy + amber
  { bg: "#7c2d12", accent: "#fed7aa", text: "#ffffff" },   // Rust + peach
  { bg: "#064e3b", accent: "#a7f3d0", text: "#ffffff" },   // Forest + mint
  { bg: "#3b0764", accent: "#ddd6fe", text: "#ffffff" },   // Purple + lavender
  { bg: "#831843", accent: "#fbcfe8", text: "#ffffff" },   // Rose + pink
  { bg: "#0c4a6e", accent: "#7dd3fc", text: "#ffffff" },   // Sky + light blue
];

function generateProjectSvg(title, category, palette, index) {
  const variations = [
    // Variation 0: Diagonal split with icon
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bg}"/>
      <stop offset="100%" stop-color="${palette.bg}" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <path d="M 0 420 L 800 280 L 800 600 L 0 600 Z" fill="${palette.accent}" opacity="0.15"/>
  <path d="M 0 480 L 800 340 L 800 600 L 0 600 Z" fill="${palette.accent}" opacity="0.1"/>
  <rect x="60" y="60" width="80" height="6" rx="3" fill="${palette.accent}"/>
  <text x="60" y="180" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="${palette.text}">${title}</text>
  <text x="60" y="220" font-family="Arial, sans-serif" font-size="20" fill="${palette.text}" opacity="0.7">${category}</text>
  <rect x="60" y="540" width="120" height="3" rx="1.5" fill="${palette.accent}" opacity="0.5"/>
</svg>`,

    // Variation 1: Centered with frame
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="${palette.bg}"/>
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="${palette.accent}" stroke-width="2" opacity="0.3" rx="8"/>
  <rect x="56" y="56" width="688" height="488" fill="none" stroke="${palette.accent}" stroke-width="1" opacity="0.15" rx="4"/>
  <text x="400" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="${palette.text}">${title}</text>
  <text x="400" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="${palette.text}" opacity="0.6">${category}</text>
  <rect x="340" y="360" width="120" height="4" rx="2" fill="${palette.accent}" opacity="0.6"/>
</svg>`,

    // Variation 2: Top accent bar
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="${palette.bg}"/>
  <rect x="0" y="0" width="800" height="12" fill="${palette.accent}"/>
  <rect x="0" y="588" width="800" height="12" fill="${palette.accent}" opacity="0.3"/>
  <text x="60" y="300" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="${palette.text}">${title}</text>
  <text x="60" y="340" font-family="Arial, sans-serif" font-size="20" fill="${palette.text}" opacity="0.6">${category}</text>
  <circle cx="700" cy="100" r="50" fill="${palette.accent}" opacity="0.1"/>
  <circle cx="700" cy="100" r="30" fill="${palette.accent}" opacity="0.15"/>
  <circle cx="700" cy="100" r="10" fill="${palette.accent}" opacity="0.3"/>
</svg>`,
  ];

  return variations[index % variations.length];
}

/* ------------------------------------------------------------------ */
/* Sample project data                                                 */
/* ------------------------------------------------------------------ */

const SAMPLE_PROJECTS = [
  {
    title: "Modern Kitchen Renovation",
    description: "Complete gut renovation of a 1990s kitchen in a Craftsman home. New custom cabinetry, quartz countertops, tile backsplash, stainless appliances, and recessed lighting. The homeowners wanted an open-concept layout that connected the kitchen to the dining area — we removed a load-bearing wall and installed a structural beam to make it happen.",
    category: "Kitchen",
    location: "Oakland, CA",
    featured: true,
    sortOrder: 1,
    imageCount: 3,
  },
  {
    title: "Restaurant Build-Out",
    description: "Full build-out of a 2,800 sq ft restaurant space in the Mission District. Included commercial kitchen installation, dining area finish-out, bar construction, ADA-compliant restrooms, and all HVAC, electrical, and plumbing work. Passed SF Health Department inspection on the first visit.",
    category: "Restaurant",
    location: "San Francisco, CA",
    featured: true,
    sortOrder: 2,
    imageCount: 2,
  },
  {
    title: "Master Bathroom Remodel",
    description: "Luxury master bathroom remodel featuring a walk-in glass shower with rainfall showerhead, freestanding soaking tub, double vanity with marble countertops, and heated tile floors. The client wanted a spa-like retreat — and that's exactly what we delivered.",
    category: "Bathroom",
    location: "Berkeley, CA",
    featured: false,
    sortOrder: 3,
    imageCount: 2,
  },
  {
    title: "Commercial Office Build-Out",
    description: "Tenant improvement project for a tech startup in Walnut Creek. Built out 5,000 sq ft of open office space including conference rooms, phone booths, a kitchen/break area, and reception. All work completed on a tight 8-week schedule with zero change orders.",
    category: "Commercial",
    location: "Walnut Creek, CA",
    featured: false,
    sortOrder: 4,
    imageCount: 2,
  },
  {
    title: "Custom Home Addition",
    description: "Second-story addition to a single-story ranch home in Napa Valley. Added a primary suite with bedroom, walk-in closet, and en-suite bathroom. Project required structural engineering, new staircase, and seamless integration with the existing roofline.",
    category: "Addition",
    location: "Napa, CA",
    featured: false,
    sortOrder: 5,
    imageCount: 1,
  },
  {
    title: "Restaurant Kitchen Upgrade",
    description: "Brought a 30-year-old restaurant kitchen up to current SF Health Department code. Replaced all commercial equipment, installed new exhaust hood with fire suppression, upgraded electrical service, and installed NSF-certified flooring and wall systems. Restaurant stayed operational throughout — we worked nights and weekends.",
    category: "Restaurant",
    location: "San Francisco, CA",
    featured: false,
    sortOrder: 6,
    imageCount: 2,
  },
];

/* ------------------------------------------------------------------ */
/* MinIO helpers                                                       */
/* ------------------------------------------------------------------ */

let bucketReady = false;

async function ensureBucket() {
  if (bucketReady) return;
  try {
    await s3.send(new HeadBucketCommand({ Bucket: BUCKET }));
    bucketReady = true;
  } catch {
    try {
      await s3.send(new CreateBucketCommand({ Bucket: BUCKET }));
      bucketReady = true;
      console.log(`[seed-projects] Created bucket: ${BUCKET}`);
    } catch (err) {
      console.error(`[seed-projects] Failed to create bucket ${BUCKET}:`, err.message);
      throw err;
    }
  }
}

async function uploadSvg(key, svgContent) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(svgContent),
      ContentType: "image/svg+xml",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

/* ------------------------------------------------------------------ */
/* Main seed logic                                                     */
/* ------------------------------------------------------------------ */

async function main() {
  console.log("[seed-projects] Starting project seeding...");

  // Check if projects already exist
  const { rows: existing } = await pool.query(
    "SELECT COUNT(*) as count FROM projects"
  );
  if (parseInt(existing[0].count, 10) > 0) {
    console.log(`[seed-projects] ${existing[0].count} projects already exist — skipping seed.`);
    await pool.end();
    return;
  }

  console.log("[seed-projects] Ensuring MinIO bucket exists...");
  await ensureBucket();

  for (let i = 0; i < SAMPLE_PROJECTS.length; i++) {
    const p = SAMPLE_PROJECTS[i];
    const palette = PALETTES[i % PALETTES.length];

    console.log(`[seed-projects] Creating project: ${p.title}`);

    // Insert project
    const { rows: projectRows } = await pool.query(
      `INSERT INTO projects (title, description, category, location, published, featured, sort_order)
       VALUES ($1, $2, $3, $4, true, $5, $6)
       RETURNING id`,
      [p.title, p.description, p.category, p.location, p.featured, p.sortOrder]
    );
    const projectId = projectRows[0].id;

    // Generate and upload images
    for (let imgIdx = 0; imgIdx < p.imageCount; imgIdx++) {
      const svg = generateProjectSvg(p.title, p.category, palette, imgIdx);
      const storageKey = `projects/${projectId}/${randomUUID()}.svg`;

      try {
        await uploadSvg(storageKey, svg);

        await pool.query(
          `INSERT INTO project_images (project_id, storage_key, alt, content_type, size, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            projectId,
            storageKey,
            `${p.title} - image ${imgIdx + 1}`,
            "image/svg+xml",
            Buffer.byteLength(svg),
            imgIdx,
          ]
        );

        console.log(`[seed-projects]   Uploaded image ${imgIdx + 1}/${p.imageCount}`);
      } catch (err) {
        console.error(`[seed-projects]   Failed to upload image ${imgIdx + 1}: ${err.message}`);
      }
    }
  }

  console.log("[seed-projects] Done! 6 sample projects with images have been created.");
  await pool.end();
}

main().catch((err) => {
  console.error("[seed-projects] Failed:", err);
  process.exit(1);
});
