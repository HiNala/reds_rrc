const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  const { rows } = await pool.query(
    "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'projects' ORDER BY ordinal_position"
  );
  console.log("projects columns:");
  rows.forEach((r) =>
    console.log(
      "  " +
        r.column_name +
        " | " +
        r.data_type +
        " | nullable:" +
        r.is_nullable +
        " | default:" +
        r.column_default
    )
  );

  const { rows: idx } = await pool.query(
    "SELECT indexname FROM pg_indexes WHERE tablename = 'projects'"
  );
  console.log("indexes:", idx.map((r) => r.indexname).join(", "));

  const { rows: mj } = await pool.query(
    "SELECT * FROM drizzle.__drizzle_migrations ORDER BY created_at"
  );
  console.log("migrations applied:", mj.length);
  mj.forEach((m) => console.log("  hash:", m.hash));

  await pool.end();
})();
