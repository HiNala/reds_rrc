/**
 * Re-export from the canonical db entrypoint (@/db/index.ts) so there is
 * a single connection pool. Adds the `schema` namespace export for code
 * that needs typed table references.
 */
import { db } from "@/db";
export { db } from "@/db";
export { pool } from "@/db";
import * as schema from "@/db/schema";
export { schema };
export type Database = typeof db;
