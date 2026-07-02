/**
 * Seed script: Uploads real project photos from /public/gallery/ to MinIO
 * and updates the project_images table to reference them.
 *
 * Run with: npx tsx scripts/seed-real-photos.ts
 */
import "dotenv/config";
import { db } from "../src/db";
import { projects, projectImages } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
import path from "path";

const BUCKET = process.env.S3_BUCKET || "redsrrc-projects";
const ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:9000";
const ACCESS_KEY = process.env.S3_ACCESS_KEY || "minioadmin";
const SECRET_KEY = process.env.S3_SECRET_KEY || "minioadmin";

const s3 = new S3Client({
  endpoint: ENDPOINT,
  region: "us-east-1",
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  forcePathStyle: true,
});

// Map project IDs to gallery photos
const PROJECT_PHOTOS: Record<number, { file: string; alt: string }[]> = {
  1: [
    { file: "project-06.jpg", alt: "Modern kitchen renovation with custom cabinetry" },
    { file: "project-09.jpg", alt: "Kitchen renovation detail with custom finishes" },
    { file: "project-01.png", alt: "Kitchen renovation — adjacent dining area" },
  ],
  2: [
    { file: "project-03.jpg", alt: "Restaurant build-out interior" },
    { file: "project-05.jpg", alt: "Restaurant construction progress" },
  ],
  3: [
    { file: "project-07.jpg", alt: "Master bathroom remodel" },
    { file: "project-11.jpg", alt: "Bathroom remodel detail" },
  ],
  4: [
    { file: "project-10.jpg", alt: "Commercial office build-out interior" },
    { file: "project-04.jpg", alt: "Commercial construction progress" },
  ],
  5: [
    { file: "project-15.png", alt: "Custom home addition exterior" },
    { file: "project-17.jpg", alt: "Home addition interior space" },
  ],
  6: [
    { file: "project-12.jpg", alt: "Restaurant kitchen upgrade" },
    { file: "project-14.jpg", alt: "Restaurant kitchen equipment installation" },
  ],
};

async function main() {
  console.log("Seeding real project photos to MinIO...\n");

  const allProjects = await db.select().from(projects);
  console.log(`Found ${allProjects.length} projects in DB`);

  for (const project of allProjects) {
    const photos = PROJECT_PHOTOS[project.id];
    if (!photos) {
      console.log(`  Skipping project ${project.id} (${project.title}) — no photo mapping`);
      continue;
    }

    // Delete existing SVG images for this project
    const existingImgs = await db
      .select()
      .from(projectImages)
      .where(eq(projectImages.projectId, project.id));
    
    // Delete old objects from MinIO
    for (const img of existingImgs) {
      if (img.storageKey.endsWith(".svg")) {
        try {
          await s3.send(new PutObjectCommand({
            Bucket: BUCKET,
            Key: img.storageKey,
            Body: Buffer.alloc(0),
          }));
        } catch {
          // ignore
        }
      }
    }

    // Delete old DB records
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
