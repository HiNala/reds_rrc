import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __rrcPgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Fail loudly at usage time rather than at import time so pages that
  // don't touch the DB (most marketing pages) still render/build fine.
  console.warn(
    "[db] DATABASE_URL is not set — database-backed routes will fail until it is configured."
  );
}

const pool =
  global.__rrcPgPool ??
  new Pool({
    connectionString,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  global.__rrcPgPool = pool;
}

export const db = drizzle(pool, { schema });
export { pool, schema };
export type Database = typeof db;
