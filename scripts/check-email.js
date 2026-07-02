const { Pool } = require("pg");
const p = new Pool({ connectionString: "postgres://postgres:postgres@localhost:5432/redsrrc" });
p.query("SELECT email, confirmed FROM newsletter_subscribers WHERE email = $1", ["newsletter@example.com"])
  .then((r) => {
    console.log("found:", r.rows.length);
    if (r.rows.length > 0) console.log(r.rows[0]);
    p.end();
  })
  .catch((e) => { console.error(e); p.end(); });
