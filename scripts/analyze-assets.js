const fs = require("fs");
const path = require("path");

const manifest = JSON.parse(
  fs.readFileSync("C:\\Users\\NalaBook\\Desktop\\reds_rrc\\start\\assets\\asset-manifest.json", "utf8")
);

const analysisDir = "C:\\Users\\NalaBook\\Desktop\\reds_rrc\\start\\ai-analysis";
const files = fs.readdirSync(analysisDir).filter(f => f.startsWith("asset_"));

console.log("=== IMAGE ASSET ANALYSIS ===\n");
for (const f of files) {
  const content = JSON.parse(fs.readFileSync(path.join(analysisDir, f), "utf8"));
  const id = content.subject_id;
  const asset = manifest.assets.find(a => a.asset_id === id);
  if (!asset || asset.asset_type !== "image") continue;

  const fname = path.basename(asset.local_path || "");
  const dims = `${asset.width}x${asset.height}`;
  const altClaim = content.claims?.find(c => c.key === "alt_text");
  const useClaim = content.claims?.find(c => c.key === "recommended_use");

  console.log(`FILE: ${fname}  (${dims}, ${Math.round(asset.size_bytes/1024)}KB)`);
  console.log(`  SUMMARY: ${content.summary}`);
  if (useClaim) console.log(`  USE: ${useClaim.value.substring(0, 120)}`);
  console.log("");
}

// Also check page analysis for image usage context
console.log("\n=== PAGE LAYOUTS (image usage) ===\n");
const pageFiles = fs.readdirSync(analysisDir).filter(f => f.startsWith("layout_"));
for (const f of pageFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(analysisDir, f), "utf8"));
  const pageName = f.replace("layout_", "").replace(".json", "");
  console.log(`PAGE: ${pageName}`);

  // Find image-related sections
  if (content.sections) {
    for (const s of content.sections) {
      if (s.type === "image" || s.images || s.assets) {
        console.log(`  SECTION: ${s.name || s.type} - ${JSON.stringify(s).substring(0, 150)}`);
      }
    }
  }
  // Print all keys
  console.log(`  KEYS: ${Object.keys(content).join(", ")}`);
  console.log("");
}
