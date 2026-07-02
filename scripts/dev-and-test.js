/**
 * Starts the Next.js dev server and runs quick HTTP checks against all pages.
 * Usage: node scripts/dev-and-test.js
 */
const { spawn, execSync } = require("child_process");
const http = require("http");

const PORT = process.env.PORT || "5555";
const PAGES = [
  "/",
  "/services",
  "/services/construction-planning",
  "/story",
  "/clients",
  "/contact",
  "/blog",
  "/blog/choosing-the-right-general-contractor",
  "/book-online",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/llms.txt",
];

function fetch(path) {
  return new Promise((resolve) => {
    const req = http.get(
      `http://localhost:${PORT}${path}`,
      { timeout: 120000 },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on("error", () => resolve({ status: 0, body: "" }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 0, body: "" }); });
  });
}

function waitForServer(maxRetries = 30) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const check = () => {
      http
        .get(`http://localhost:${PORT}/`, { timeout: 5000 }, (res) => {
          res.resume();
          if (res.statusCode > 0) resolve();
          else if (++retries < maxRetries) setTimeout(check, 2000);
          else reject(new Error("Server didn't start"));
        })
        .on("error", () => {
          if (++retries < maxRetries) setTimeout(check, 2000);
          else reject(new Error("Server didn't start"));
        });
    };
    check();
  });
}

async function main() {
  console.log(`Starting Next.js dev server on port ${PORT}...`);
  const server = spawn(
    "npx",
    ["next", "dev", "--webpack", "-p", PORT],
    {
      cwd: process.cwd(),
      stdio: "pipe",
      shell: true,
      env: { ...process.env, PORT },
    }
  );

  server.stdout.on("data", (data) => {
    const msg = data.toString().trim();
    if (msg) console.log(`[server] ${msg}`);
  });
  server.stderr.on("data", (data) => {
    const msg = data.toString().trim();
    if (msg && !msg.includes("Persisting") && !msg.includes("Compaction"))
      console.log(`[server] ${msg}`);
  });

  try {
    console.log("Waiting for server to be ready...");
    await waitForServer();
    console.log("Server is ready! Testing pages...\n");

    let pass = 0;
    let fail = 0;
    for (const page of PAGES) {
      const res = await fetch(page);
      if (res.status === 200) {
        const checks = [];
        if (page === "/") {
          checks.push(`hero: ${res.body.includes("hero-1") ? "OK" : "MISS"}`);
          checks.push(`88vh: ${res.body.includes("88vh") ? "OK" : "MISS"}`);
          checks.push(`logo: ${res.body.includes("logo.png") ? "OK" : "MISS"}`);
        }
        if (page === "/clients") {
          const imgCount = (res.body.match(/image\?url=.*project-/g) || []).length;
          checks.push(`gallery images: ${imgCount}`);
          checks.push(`Outdoor Deck: ${res.body.includes("Outdoor Deck") ? "OK" : "MISS"}`);
        }
        if (page === "/story") {
          checks.push(`founder: ${res.body.includes("founder") ? "OK" : "MISS"}`);
        }
        if (page === "/services") {
          checks.push(`service img: ${res.body.includes("construction-planning") ? "OK" : "MISS"}`);
        }
        console.log(`✓ ${page} -> ${res.status} (${res.body.length} bytes)${checks.length ? " [" + checks.join(", ") + "]" : ""}`);
        pass++;
      } else {
        console.log(`✗ ${page} -> ${res.status}`);
        fail++;
      }
    }

    console.log(`\n${pass}/${pass + fail} pages passed`);
    process.exit(fail > 0 ? 1 : 0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  } finally {
    server.kill();
  }
}

main();
