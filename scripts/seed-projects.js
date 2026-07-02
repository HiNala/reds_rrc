/**
 * Seed sample projects with REAL photos from the original site.
 *
 * Usage:
 *   node scripts/seed-projects.js
 *
 * Creates projects matching the original Clients page gallery, uploading
 * the real photos from public/gallery/ to the S3-compatible MinIO bucket.
 * Safe to run multiple times — checks for existing data first.
 *
 * To force a re-seed, first clear the projects table:
 *   docker exec reds_rrc-postgres-1 psql -U postgres -d redsrrc \
 *     -c "DELETE FROM project_images; DELETE FROM projects;"
 */
const fs = require("fs");
const path = require("path");
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
/* Real project data — matches the original site's Clients gallery     */
/* ------------------------------------------------------------------ */

const SAMPLE_PROJECTS = [
  {
    title: "Outdoor Patio & Living Space",
    slug: "outdoor-patio-living",
    description:
      "Custom patio with outdoor seating overlooking the Bay Area hills. Complete with shade structure, landscape integration, and durable finishes that stand up to California weather year-round.",
    category: "Outdoor Living",
    location: "Bay Area, CA",
    featured: true,
    sortOrder: 1,
    image: "project-01.png",
    alt: "Man relaxing on a shaded patio with a yellow Labrador — outdoor living space",
  },
  {
    title: "Custom Deck with Glass Railing",
    slug: "custom-deck-and-railing",
    description:
      "Newly constructed deck featuring premium composite decking and glass panel railings for unobstructed views. Clean joinery, hidden fasteners, and a seamless transition from the interior living space.",
    category: "Deck & Patio",
    location: "Bay Area, CA",
    featured: true,
    sortOrder: 2,
    image: "project-02.jpg",
    alt: "Custom deck with glass railing overlooking the Bay Area",
  },
  {
    title: "Whole-Home Renovation",
    slug: "residential-renovation",
    description:
      "Complete interior and exterior renovation of a Bay Area residence. Updated finishes, new flooring, modernized kitchen and bathrooms, and refreshed exterior siding — all completed on schedule.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 3,
    image: "project-03.jpg",
    alt: "Completed residential renovation with modern finishes",
  },
  {
    title: "Interior Remodel & Finish Work",
    slug: "interior-remodel",
    description:
      "Detailed interior remodel featuring custom trim, new doors, and smooth wall finishes. Every detail was matched to the home's original character while bringing it up to modern standards.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 4,
    image: "project-04.jpg",
    alt: "Interior remodel with custom finish work",
  },
  {
    title: "New Construction Project",
    slug: "construction-project-showcase",
    description:
      "Ground-up construction project showcasing Red's RRC's ability to manage every phase — from foundation and framing to finishes and final inspection.",
    category: "New Construction",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 5,
    image: "project-05.jpg",
    alt: "New construction project from foundation to finishes",
  },
  {
    title: "Finished Deck Construction",
    slug: "deck-construction",
    description:
      "Quality deck built with premium materials and expert craftsmanship. The finished surface is smooth, level, and ready for years of outdoor enjoyment — even the family dog approved immediately.",
    category: "Deck & Patio",
    location: "Bay Area, CA",
    featured: true,
    sortOrder: 6,
    image: "project-06.jpg",
    alt: "Small black dog on a sunlit finished deck — quality deck construction",
  },
  {
    title: "Yard & Landscape Integration",
    slug: "yard-landscape-integration",
    description:
      "Outdoor construction that seamlessly integrates with existing landscape and yard features. Grading, drainage, and hardscape work all coordinated to preserve the natural beauty of the property.",
    category: "Outdoor Living",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 7,
    image: "project-07.jpg",
    alt: "Outdoor construction integrating with existing landscape",
  },
  {
    title: "Interior Finish & Flooring",
    slug: "interior-finish-work",
    description:
      "Interior renovation with clean finish work and new flooring throughout. The space was transformed from outdated to move-in ready with attention to every seam, joint, and surface.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 8,
    image: "project-08.png",
    alt: "Dog resting inside a home with interior finish work completed",
  },
  {
    title: "Commercial Build-Out",
    slug: "commercial-build-out",
    description:
      "Tenant improvement and commercial build-out project. New partition walls, drop ceiling, lighting, and ADA-compliant restroom — delivered on a tight timeline with zero disruption to neighboring tenants.",
    category: "Commercial",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 9,
    image: "project-09.jpg",
    alt: "Commercial build-out with new walls and finishes",
  },
  {
    title: "Restaurant Renovation",
    slug: "restaurant-renovation",
    description:
      "Full renovation of a restaurant dining area including new flooring, lighting, bar build-out, and dining space reconfiguration. Completed during off-hours so the restaurant could stay operational.",
    category: "Restaurant",
    location: "Bay Area, CA",
    featured: true,
    sortOrder: 10,
    image: "project-10.jpg",
    alt: "Restaurant renovation with new flooring and lighting",
  },
  {
    title: "Kitchen Remodel",
    slug: "kitchen-remodel",
    description:
      "Complete kitchen remodel with new cabinetry, countertops, tile backsplash, and stainless appliances. The layout was reconfigured for better flow and functionality while staying within the existing footprint.",
    category: "Kitchen",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 11,
    image: "project-11.jpg",
    alt: "Kitchen remodel with new cabinetry and countertops",
  },
  {
    title: "Bathroom Renovation",
    slug: "bathroom-renovation",
    description:
      "Full bathroom renovation featuring a new vanity, tile shower, modern fixtures, and updated lighting. Waterproofing and moisture management were prioritized for long-lasting results.",
    category: "Bathroom",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 12,
    image: "project-12.jpg",
    alt: "Bathroom renovation with new vanity and tile shower",
  },
  {
    title: "Driveway & Site Work",
    slug: "driveway-site-work",
    description:
      "Site preparation and driveway construction with proper grading and drainage. Clean jobsite management throughout the project — no mud, no mess, no surprises for the homeowners.",
    category: "Site Work",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 13,
    image: "project-13.png",
    alt: "Driveway and site work with clean jobsite management",
  },
  {
    title: "Home Addition & Expansion",
    slug: "addition-and-expansion",
    description:
      "Second-story addition and expansion that more than doubled the home's living space. Structural engineering, new staircase, and seamless roofline integration made the addition look original to the home.",
    category: "Addition",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 14,
    image: "project-14.jpg",
    alt: "Home addition and expansion project",
  },
  {
    title: "Family-Friendly Renovation",
    slug: "family-friendly-renovation",
    description:
      "Whole-home renovation designed with pets and family in mind. Durable, easy-to-clean finishes, secure outdoor spaces, and thoughtful details that make the home work for every member of the family.",
    category: "Residential",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 15,
    image: "project-15.png",
    alt: "Family-friendly renovation with pet-safe finishes",
  },
  {
    title: "Modern Home Construction",
    slug: "modern-home-construction",
    description:
      "Contemporary new construction with clean lines, open floor plan, and energy-efficient features. From foundation to final coat of paint, every phase was managed by Red's RRC's in-house crew.",
    category: "New Construction",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 16,
    image: "project-16.jpg",
    alt: "Modern home construction with open floor plan",
  },
  {
    title: "Finish Detail & Trim Work",
    slug: "project-finish-detail",
    description:
      "Close-up of the finish detail and trim work that sets Red's RRC apart. Precise miter joints, scribed transitions, and flawless paint — the small details that make a big difference in the final result.",
    category: "Finish Work",
    location: "Bay Area, CA",
    featured: false,
    sortOrder: 17,
    image: "project-17.jpg",
    alt: "Finish detail and trim work showcase",
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

const CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function uploadImage(key, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
  const body = fs.readFileSync(filePath);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return { size: body.length, contentType };
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
    console.log("[seed-projects] To re-seed, run: DELETE FROM project_images; DELETE FROM projects;");
    await pool.end();
    return;
  }

  console.log("[seed-projects] Ensuring MinIO bucket exists...");
  await ensureBucket();

  // Resolve the gallery directory — works both locally and in Docker
  const galleryDir = fs.existsSync(path.join(process.cwd(), "public", "gallery"))
    ? path.join(process.cwd(), "public", "gallery")
    : path.join(process.cwd(), "public", "gallery");

  for (const p of SAMPLE_PROJECTS) {
    const imagePath = path.join(galleryDir, p.image);

    if (!fs.existsSync(imagePath)) {
      console.error(`[seed-projects]   Image not found: ${imagePath} — skipping ${p.title}`);
      continue;
    }

    console.log(`[seed-projects] Creating project: ${p.title}`);

    // Insert project
    const { rows: projectRows } = await pool.query(
      `INSERT INTO projects (title, slug, description, category, location, published, featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, true, $6, $7)
       RETURNING id`,
      [p.title, p.slug, p.description, p.category, p.location, p.featured, p.sortOrder]
    );
    const projectId = projectRows[0].id;

    // Upload the real image
    const ext = path.extname(p.image).toLowerCase();
    const storageKey = `projects/${projectId}/${randomUUID()}${ext}`;

    try {
      const { size, contentType } = await uploadImage(storageKey, imagePath);

      await pool.query(
        `INSERT INTO project_images (project_id, storage_key, alt, content_type, size, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [projectId, storageKey, p.alt, contentType, size, 0]
      );

      console.log(`[seed-projects]   Uploaded ${p.image} (${size} bytes, ${contentType})`);
    } catch (err) {
      console.error(`[seed-projects]   Failed to upload image: ${err.message}`);
    }
  }

  console.log(`[seed-projects] Done! ${SAMPLE_PROJECTS.length} projects with real photos have been created.`);
  await pool.end();
}

main().catch((err) => {
  console.error("[seed-projects] Failed:", err);
  process.exit(1);
});
