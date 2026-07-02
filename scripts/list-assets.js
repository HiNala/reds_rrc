const fs = require("fs");
const path = require("path");

const manifest = JSON.parse(
  fs.readFileSync("C:\\Users\\NalaBook\\Desktop\\reds_rrc\\start\\assets\\asset-manifest.json", "utf8")
);

// Filter to only image assets with local files
const images = manifest.assets.filter(
  (a) => a.asset_type === "image" && a.local_path && a.content_type?.startsWith("image/")
);

console.log(`Found ${images.length} image assets:\n`);
for (const img of images) {
  const ext = img.content_type.split("/")[1];
  const dims = img.width && img.height ? `${img.width}x${img.height}` : "unknown";
  const sizeKB = img.size_bytes ? Math.round(img.size_bytes / 1024) + "KB" : "?";
  const fname = path.basename(img.local_path);
  console.log(`${fname}  ${dims}  ${sizeKB}  ${img.quality_label || ""}`);
  console.log(`  original: ${img.original_url?.substring(0, 120)}...`);
  console.log("");
}
