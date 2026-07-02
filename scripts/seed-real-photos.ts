/**
 * Seed script: Uploads real project photos from /public/gallery/ to MinIO
 * and updates the project_images table to reference them.
 *
 * Run with: npx tsx scripts/seed-real-photos.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env", override: true });

import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
import path from "path";

const BUCKET = process.env.S3_BUCKET || "redsrrc-projects";
const ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:9000";
const ACCESS_KEY = process.env.S3_ACCESS_KEY || "minioadmin";
const SECRET_KEY = process.env.S3_SECRET_KEY || "minioadmin";

// Map project titles to gallery photos (matched by title, not ID)
const PROJECT_PHOTOS: Record<string, { file: string; alt: string }[]> = {
  "Modern Kitchen Renovation": [
    { file: "project-06.jpg", alt: "Modern kitchen renovation with custom cabinetry" },
    { file: "project-09.jpg", alt: "Kitchen renovation detail with custom finishes" },
    { file: "project-01.png", alt: "Kitchen renovation — adjacent dining area" },
  ],
  "Restaurant Build-Out": [
    { file: "project-03.jpg", alt: "Restaurant build-out interior" },
    { file: "project-05.jpg", alt: "Restaurant construction progress" },
  ],
  "Master Bathroom Remodel": [
    { file: "project-07.jpg", alt: "Master bathroom remodel" },
    { file: "project-11.jpg", alt: "Bathroom remodel detail" },
  ],
  "Commercial Office Build-Out": [
    { file: "project-10.jpg", alt: "Commercial office build-out interior" },
    { file: "project-04.jpg", alt: "Commercial construction progress" },
  ],
  "Custom Home Addition": [
    { file: "project-15.png", alt: "Custom home addition exterior" },
    { file: "project-17.jpg", alt: "Home addition interior space" },
  ],
  "Restaurant Kitchen Upgrade": [
    { file: "project-12.jpg", alt: "Restaurant kitchen upgrade" },
    { file: "project-14.jpg", alt: "Restaurant kitchen equipment installation" },
  ],
};

async function main() {
  // Dynamic imports after env is loaded
  const { db } = await import("../src/db");
  const { projects, projectImages } = await import("../src/db/schema");
  const { eq } = await import("drizzle-orm");
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const s3 = new S3Client({
    endpoint: ENDPOINT,
    region: "us-east-1",
    credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
    forcePathStyle: true,
  });

  console.log("Seeding real project photos to MinIO...\n");
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? "set" : "NOT SET"}`);
  console.log(`S3 endpoint: ${ENDPOINT}, bucket: ${BUCKET}\n`);

  const allProjects = await db.select().from(projects);
  console.log(`Found ${allProjects.length} projects in DB`);

  for (const project of allProjects) {
    const photos = PROJECT_PHOTOS[project.title];
    if (!photos) {
      console.log(`  Skipping project ${project.id} (${project.title}) — no photo mapping`);
      continue;
    }

    // Delete existing image records for this project
    await db.delete(projectImages).where(eq(projectImages.projectId, project.id));

    console.log(`  Project ${project.id}: ${project.title} — uploading ${photos.length} photos`);

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const filePath = path.join(process.cwd(), "public", "gallery", photo.file);
      const ext = path.extname(photo.file);
      const contentType = ext === ".jpg" ? "image/jpeg" : ext === ".png" ? "image/png" : "image/jpeg";
      const storageKey = `projects/${project.id}/${randomUUID()}${ext}`;

      try {
        const fileBuffer = await readFile(filePath);
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: storageKey,
          Body: fileBuffer,
          ContentType: contentType,
        }));

        await db.insert(projectImages).values({
          projectId: project.id,
          storageKey,
          alt: photo.alt,
          contentType,
          size: fileBuffer.length,
          sortOrder: i,
        });

        console.log(`    ✓ ${photo.file} → ${storageKey} (${fileBuffer.length} bytes)`);
      } catch (err) {
        console.error(`    ✗ Failed to upload ${photo.file}:`, err);
      }
    }
  }

  console.log("\nDone! All real photos uploaded to MinIO.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
