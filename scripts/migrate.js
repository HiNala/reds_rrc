/**
 * Standalone migration runner — used by docker-entrypoint.sh.
 * Plain JS (no compilation needed) — uses drizzle-orm's migrator.
 */
const { drizzle } = require("drizzle-orm/node-postgres");
const { migrate } = require("drizzle-orm/node-postgres/migrator");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("[migrate] DATABASE_URL is not set — cannot run migrations.");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const db = drizzle(pool);

async function main() {
  console.log("[migrate] Running migrations...");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] Migrations complete.");
  await pool.end();
}

main().catch((err) => {
  console.error("[migrate] Migration failed:", err);
  process.exit(1);
});
