/**
 * Updates the DB project_images to point to the real gallery photos
 * in /public/gallery/ instead of the generated SVG placeholders in MinIO.
 *
 * Run with: node scripts/seed-real-images.js
 */
const { Client } = require("pg");

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/redsrrc";

// Map DB project IDs to real gallery image paths
const IMAGE_MAP = {
  1: ["/gallery/project-06.jpg", "/gallery/project-09.jpg", "/gallery/project-16.jpg"],
  2: ["/gallery/project-03.jpg", "/gallery/project-05.jpg"],
  3: ["/gallery/project-08.png", "/gallery/project-11.jpg"],
  4: ["/gallery/project-10.jpg", "/gallery/project-04.jpg"],
  5: ["/gallery/project-07.jpg", "/gallery/project-12.jpg"],
  6: ["/gallery/project-05.jpg", "/gallery/project-14.jpg"],
};

async function main() {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  // Update project titles and descriptions to match real work
  const projectUpdates = [
    { id: 1, title: "Modern Kitchen Renovation", description: "Custom kitchen remodel with modern cabinetry, stone counters, and integrated lighting.", category: "Residential", location: "Bay Area, CA", featured: true },
    { id: 2, title: "Restaurant Build-Out", description: "Full restaurant interior construction — framing, MEP, finishes, and hood installation.", category: "Restaurant", location: "Bay Area, CA", featured: true },
    { id: 3, title: "Master Bathroom Remodel", description: "Complete bath renovation with custom tile, glass shower, and modern fixtures.", category: "Residential", location: "Bay Area, CA", featured: false },
    { id: 4, title: "Commercial Office Build-Out", description: "Tenant improvement for commercial space — walls, flooring, and custom build-outs.", category: "Commercial", location: "Bay Area, CA", featured: false },
    { id: 5, title: "Custom Home Addition", description: "Whole-home renovation including framing, drywall, trim, and outdoor living space.", category: "Residential", location: "Bay Area, CA", featured: false },
    { id: 6, title: "Restaurant Kitchen Upgrade", description: "Commercial kitchen upgrade with new equipment installation and finishes.", category: "Restaurant", location: "Bay Area, CA", featured: false },
  ];

  for (const p of projectUpdates) {
    await client.query(
      `UPDATE projects SET title = $1, description = $2, category = $3, location = $4, featured = $5 WHERE id = $6`,
      [p.title, p.description, p.category, p.location, p.featured, p.id]
    );
    console.log(`Updated project ${p.id}: ${p.title}`);
  }

  // Update image storage keys to point to real gallery photos
  for (const [projectId, images] of Object.entries(IMAGE_MAP)) {
    // Get existing image rows for this project
    const { rows } = await client.query(
      `SELECT id, sort_order FROM project_images WHERE project_id = $1 ORDER BY sort_order`,
      [projectId]
    );

    for (let i = 0; i < rows.length && i < images.length; i++) {
      const imgPath = images[i];
      const altText = imgPath
        .replace("/gallery/", "")
        .replace(/\.\w+$/, "")
        .replace(/-/g, " ");
      await client.query(
        `UPDATE project_images SET storage_key = $1, alt = $2 WHERE id = $3`,
        [imgPath, altText, rows[i].id]
      );
      console.log(`  Updated image ${rows[i].id} -> ${imgPath}`);
    }
  }

  console.log("\nDone! All projects now use real gallery photos.");
  await client.end();
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
