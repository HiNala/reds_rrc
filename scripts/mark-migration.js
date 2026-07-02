/**
 * Mark migration 0003_conscious_tusk as already applied.
 * The slug column was added via drizzle-kit push in a previous session,
 * so the migration file exists but the ALTER TABLE fails because the
 * column already exists. This script inserts the migration record so
 * the migrator skips it on future runs.
 */
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  // Read the migration SQL file and compute its hash (same as drizzle does)
  const sqlFile = path.join(__dirname, "..", "drizzle", "0003_conscious_tusk.sql");
  const sql = fs.readFileSync(sqlFile, "utf-8");
  const hash = crypto.createHash("sha256").update(sql).digest("hex");

  // Check if already marked
  const { rows } = await pool.query(
    "SELECT * FROM drizzle.__drizzle_migrations WHERE hash = $1",
    [hash]
  );
  if (rows.length > 0) {
    console.log("[mark-migration] Migration 0003 already marked as applied.");
    await pool.end();
    return;
  }

  await pool.query(
    "INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES ($1, $2)",
    [hash, Date.now()]
  );
  console.log("[mark-migration] Marked migration 0003_conscious_tusk as applied (hash: " + hash.slice(0, 12) + "...)");
  await pool.end();
})();
