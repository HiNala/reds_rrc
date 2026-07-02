const http = require("http");

function fetch(path, method, body, cookie) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: "127.0.0.1", port: 3000, path, method: method || "GET", headers: {} };
    if (cookie) opts.headers.Cookie = cookie;
    if (body) { opts.headers["Content-Type"] = "application/json"; }
    const r = http.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    r.on("error", reject);
    r.setTimeout(60000, () => { r.destroy(); reject(new Error("timeout: " + path)); });
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

function check(name, actual, expected) {
  const pass = actual === expected;
  console.log(`${pass ? "✓" : "✗"} ${name}: ${actual}${pass ? "" : " (expected " + expected + ")"}`);
  return pass;
}

function checkIncludes(name, body, text) {
  const pass = body.includes(text);
  console.log(`${pass ? "✓" : "✗"} ${name}: includes "${text}"`);
  return pass;
}

(async () => {
  let pass = 0, fail = 0;
  const results = [];

  function log(ok, msg) {
    console.log(`${ok ? "✓" : "✗"} ${msg}`);
    if (ok) pass++; else fail++;
  }

  // Login first
  const login = await fetch("/api/admin/login", "POST", { email: "admin@redsrrc.com", password: "admin123" });
  const cookie = login.headers["set-cookie"]?.[0]?.split(";")[0];
  log(login.status === 200, `Admin login: ${login.status}`);

  console.log("\n=== PUBLIC PAGES ===");
  const pages = [
    ["/", "Home"],
    ["/services", "Services"],
    ["/services/construction-planning", "Service: Construction Planning"],
    ["/services/construction-management", "Service: Construction Management"],
    ["/services/building-maintenance", "Service: Building Maintenance"],
    ["/story", "Our Story"],
    ["/clients", "Our Clients"],
    ["/blog", "Blog Index"],
    ["/blog/restaurant-build-out-101", "Blog: Restaurant Build-Out 101"],
    ["/blog/kitchen-bath-remodel-roi", "Blog: Kitchen Bath ROI"],
    ["/blog/choosing-the-right-general-contractor", "Blog: Choosing Contractor"],
    ["/blog/permits-inspections-restaurant-construction", "Blog: Permits"],
    ["/blog/design-build-vs-design-bid-build", "Blog: Design Build"],
    ["/blog/tag/bathroom", "Blog Tag: bathroom"],
    ["/blog/tag/build-out", "Blog Tag: build-out"],
    ["/contact", "Contact"],
    ["/book-online", "Book Online"],
    ["/privacy", "Privacy"],
    ["/terms", "Terms"],
  ];

  for (const [path, name] of pages) {
    try {
      const res = await fetch(path);
      const ok = res.status === 200;
      log(ok, `${name} (${path}): ${res.status}`);
      if (!ok) {
        const errMatch = res.body.match(/<title>([^<]+)/);
        console.log(`    title: ${errMatch?.[1] || "unknown"}`);
      }
    } catch (e) {
      log(false, `${name} (${path}): ERROR ${e.message}`);
    }
  }

  console.log("\n=== SEO METADATA CHECKS ===");
  const home = await fetch("/");
  log(home.body.includes('property="og:title"'), "Home: og:title present");
  log(home.body.includes('property="og:image"'), "Home: og:image present");
  log(home.body.includes('property="og:image:width"'), "Home: og:image:width present");
  log(home.body.includes('property="og:image:height"'), "Home: og:image:height present");
  log(home.body.includes('name="twitter:card"'), "Home: twitter:card present");
  log(home.body.includes('name="twitter:image"'), "Home: twitter:image present");
  log(home.body.includes('rel="canonical"'), "Home: canonical present");
  log(home.body.includes('rel="manifest"'), "Home: manifest present");
  log(home.body.includes('application/ld+json'), "Home: JSON-LD present");
  log(home.body.includes('"@type":"Organization"'), "Home: Organization JSON-LD");
  log(home.body.includes('"@type":"GeneralContractor"'), "Home: GeneralContractor JSON-LD");
  log(home.body.includes('"@type":"AggregateRating"'), "Home: AggregateRating JSON-LD");
  log(home.body.includes('"@type":"Review"'), "Home: Review JSON-LD");
  log(home.body.includes('"@type":"OfferCatalog"'), "Home: OfferCatalog JSON-LD");

  console.log("\n=== OG IMAGE ROUTES ===");
  const ogRoutes = [
    "/opengraph-image",
    "/twitter-image",
    "/services/opengraph-image",
    "/services/twitter-image",
    "/services/construction-planning/opengraph-image/construction-planning",
    "/story/opengraph-image",
    "/clients/opengraph-image",
    "/contact/opengraph-image",
    "/book-online/opengraph-image",
    "/blog/opengraph-image",
    "/blog/restaurant-build-out-101/opengraph-image/restaurant-build-out-101",
    "/privacy/opengraph-image",
    "/terms/opengraph-image",
  ];
  for (const path of ogRoutes) {
    try {
      const res = await fetch(path);
      const isImage = res.headers["content-type"]?.includes("image/png");
      log(res.status === 200 && isImage, `OG image ${path}: ${res.status} ${res.headers["content-type"] || "no-type"}`);
    } catch (e) {
      log(false, `OG image ${path}: ERROR ${e.message}`);
    }
  }

  console.log("\n=== API ROUTES ===");
  // Contact form
  const contact = await fetch("/api/contact", "POST", {
    name: "Test User",
    email: "test@example.com",
    phone: "415-555-1234",
    service: "Kitchen Remodel",
    message: "I need a kitchen remodel quote",
  });
  log(contact.status === 200, `POST /api/contact: ${contact.status}`);

  // Quote form
  const quote = await fetch("/api/quote", "POST", {
    name: "Quote Test",
    email: "quote@example.com",
    phone: "415-555-5678",
    service: "Bathroom Renovation",
    budget: "$10k-25k",
    timeline: "3 months",
    message: "Need bathroom renovation for our home",
    consent: true,
  });
  log(quote.status === 200, `POST /api/quote: ${quote.status}`);

  // Newsletter (409 = already subscribed, which is also a success)
  const newsletter = await fetch("/api/newsletter", "POST", {
    email: "newsletter@example.com",
  });
  log(newsletter.status === 200 || newsletter.status === 409, `POST /api/newsletter: ${newsletter.status} (200=new, 409=already subscribed)`);

  // Tracking
  const track = await fetch("/api/track", "POST", {
    event: "pageview",
    path: "/test",
    sessionId: "test-session-123",
  });
  log(track.status === 200, `POST /api/track: ${track.status}`);

  // Projects API
  const projects = await fetch("/api/projects");
  log(projects.status === 200, `GET /api/projects: ${projects.status}`);

  console.log("\n=== ADMIN PAGES ===");
  const adminPages = [
    ["/admin", "Admin Dashboard"],
    ["/admin/analytics", "Analytics"],
    ["/admin/leads", "Leads"],
    ["/admin/leads/1", "Lead Detail"],
    ["/admin/login", "Admin Login (should redirect)"],
    ["/admin/projects", "Projects Admin"],
  ];
  for (const [path, name] of adminPages) {
    try {
      const res = await fetch(path, "GET", null, cookie);
      const ok = res.status === 200;
      log(ok, `${name} (${path}): ${res.status}`);
    } catch (e) {
      log(false, `${name} (${path}): ERROR ${e.message}`);
    }
  }

  console.log("\n=== ADMIN API ROUTES ===");
  const leadPatch = await fetch("/api/admin/leads/1", "PATCH", { status: "contacted" }, cookie);
  log(leadPatch.status === 200, `PATCH /api/admin/leads/1: ${leadPatch.status}`);

  const leadNote = await fetch("/api/admin/leads/1/notes", "POST", { note: "Smoke test note" }, cookie);
  log(leadNote.status === 200, `POST /api/admin/leads/1/notes: ${leadNote.status}`);

  console.log("\n=== SPECIAL ROUTES ===");
  const robots = await fetch("/robots.txt");
  log(robots.status === 200, `robots.txt: ${robots.status}`);
  log(robots.body.includes("Sitemap:"), "robots.txt has sitemap reference");

  const sitemap = await fetch("/sitemap.xml");
  log(sitemap.status === 200, `sitemap.xml: ${sitemap.status}`);
  log(sitemap.body.includes("<urlset"), "sitemap.xml is valid XML");

  const rss = await fetch("/blog/rss.xml");
  log(rss.status === 200, `RSS feed: ${rss.status}`);
  log(rss.body.includes("<rss") || rss.body.includes("<feed"), "RSS is valid XML");

  console.log(`\n=== RESULTS: ${pass} passed, ${fail} failed ===`);
  process.exit(fail > 0 ? 1 : 0);
})();
