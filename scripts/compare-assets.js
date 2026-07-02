const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function hashFile(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Load manifest
const manifest = JSON.parse(
  fs.readFileSync("C:\\Users\\NalaBook\\Desktop\\reds_rrc\\start\\assets\\asset-manifest.json", "utf8")
);

// Get all original image assets with local paths
const originals = manifest.assets.filter(
  (a) => a.asset_type === "image" && a.local_path && a.content_type?.startsWith("image/")
);

const startDir = "C:\\Users\\NalaBook\\Desktop\\reds_rrc\\start\\assets\\images";
const publicDir = "C:\\Users\\NalaBook\\Desktop\\reds_rrc\\public";

// Hash all original images
console.log("=== ORIGINAL IMAGE ASSETS ===\n");
const originalHashes = {};
for (const asset of originals) {
  const fname = path.basename(asset.local_path);
  const fpath = path.join(startDir, fname);
  if (fs.existsSync(fpath)) {
    const hash = hashFile(fpath);
    originalHashes[hash] = { fname, asset, dims: `${asset.width}x${asset.height}` };
    console.log(`${fname}  ${asset.width}x${asset.height}  ${Math.round(asset.size_bytes/1024)}KB  hash=${hash.substring(0,12)}`);
  }
}

// Hash all files in public directory
console.log("\n=== CURRENT PUBLIC DIR FILES ===\n");
function walkDir(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      results.push(...walkDir(full, rel));
    } else {
      results.push({ path: rel, full });
    }
  }
  return results;
}

const publicFiles = walkDir(publicDir);
for (const f of publicFiles) {
  const ext = path.extname(f.path).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".ico", ".svg"].includes(ext)) {
    const hash = hashFile(f.full);
    const size = fs.statSync(f.full).size;
    const match = originalHashes[hash];
    console.log(`${f.path}  ${Math.round(size/1024)}KB  hash=${hash.substring(0,12)}${match ? `  *** MATCHES ${match.fname} (${match.dims}) ***` : ""}`);
  }
}

// List unused originals
console.log("\n=== UNUSED ORIGINAL ASSETS (no match in public) ===\n");
const usedHashes = new Set();
for (const f of publicFiles) {
  const ext = path.extname(f.path).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".ico"].includes(ext)) {
    usedHashes.add(hashFile(f.full));
  }
}
for (const [hash, info] of Object.entries(originalHashes)) {
  if (!usedHashes.has(hash)) {
    console.log(`${info.fname}  ${info.dims}  ${Math.round(info.asset.size_bytes/1024)}KB  - ${info.asset.original_url?.substring(0, 80)}`);
  }
}
