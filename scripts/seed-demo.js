/**
 * Seed realistic demo data for the admin dashboard.
 *
 * Usage:
 *   node scripts/seed-demo.js
 *
 * This populates analytics_events, leads, and newsletter_subscribers
 * with 90 days of realistic-looking data so the dashboard is alive
 * on first boot. Safe to run multiple times — it only adds data.
 */
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("[seed] DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const db = drizzle(pool);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function daysAgo(days, hourOverride) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  if (hourOverride !== undefined) d.setHours(hourOverride, randomInt(0, 59), 0, 0);
  else d.setHours(randomInt(7, 21), randomInt(0, 59), 0, 0);
  return d;
}

function genSessionId() {
  return "sess_" + Math.random().toString(36).slice(2, 12);
}

/* ------------------------------------------------------------------ */
/* Data shapes                                                         */
/* ------------------------------------------------------------------ */

const PAGES = [
  "/",
  "/services",
  "/services/construction-planning",
  "/services/construction-management",
  "/services/building-maintenance",
  "/story",
  "/clients",
  "/contact",
  "/book-online",
  "/blog",
  "/blog/restaurant-build-out-101",
  "/blog/kitchen-bath-remodel-roi",
  "/blog/choosing-the-right-general-contractor",
  "/privacy",
  "/terms",
];

const DEVICES = ["desktop", "desktop", "desktop", "mobile", "mobile", "mobile", "tablet"];
const LOCALES = ["en-US", "en-US", "en-US", "en-US", "en-GB", "es-US", "zh-CN", "fil-PH"];
const REFERRERS = [
  null, null, null, // direct
  "https://www.google.com/search?q=bay+area+general+contractor",
  "https://www.google.com/search?q=restaurant+construction+san+francisco",
  "https://www.google.com/search?q=kitchen+remodel+oakland",
  "https://www.instagram.com/",
  "https://www.facebook.com/",
  "https://www.yelp.com/",
  "https://www.houzz.com/",
  "https://nextdoor.com/",
  "https://www.google.com/maps",
];

const UTM_CAMPAIGNS = [
  null, null, null, null, // organic
  { source: "google", medium: "cpc", campaign: "bay_area_contractor_q1" },
  { source: "google", medium: "cpc", campaign: "restaurant_buildout" },
  { source: "instagram", medium: "social", campaign: "portfolio_showcase" },
  { source: "facebook", medium: "social", campaign: "spring_remodel" },
  { source: "yelp", medium: "referral", campaign: "profile_visits" },
  { source: "houzz", medium: "referral", campaign: "pro_listing" },
  { source: "newsletter", medium: "email", campaign: "monthly_digest" },
];

const LEAD_NAMES = [
  "Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Park",
  "Jennifer Liu", "Robert Williams", "Maria Garcia", "James Thompson",
  "Aisha Patel", "Michael O'Brien", "Sofia Ricci", "Kevin Nguyen",
  "Lauren Davis", "Carlos Mendoza", "Rachel Green", "Tom Anderson",
];

const LEAD_EMAILS = [
  "sarah.chen@gmail.com", "m.johnson@yahoo.com", "elena.r@outlook.com",
  "dpark@gmail.com", "jliu@icloud.com", "rwilliams@gmail.com",
  "mgarcia@yahoo.com", "jthompson@outlook.com", "aisha.patel@gmail.com",
  "mobrien@icloud.com", "sofia.ricci@gmail.com", "knguyen@yahoo.com",
  "lauren.davis@outlook.com", "c.mendoza@gmail.com", "rgreen@icloud.com",
  "tanderson@yahoo.com",
];

const LEAD_SERVICES = [
  "Kitchen Remodel", "Bathroom Renovation", "Restaurant Build-Out",
  "Home Addition", "Commercial Maintenance", "Roofing Repair",
  "Flooring Installation", "Custom Cabinetry", "Painting",
  "Plumbing Update", "Electrical Upgrade", "Full Home Renovation",
];

const LEAD_MESSAGES = [
  "We're planning a full kitchen remodel for our home in Oakland. Looking for a licensed contractor who can handle everything from design to completion.",
  "Opening a new restaurant in SF and need a build-out contractor. Would love to get a quote and timeline.",
  "Need to renovate two bathrooms in our property. What's your availability in the next few months?",
  "Looking for ongoing maintenance for our commercial property — monthly contract preferred.",
  "We have a home addition project in Berkeley. Plans are ready, need a GC to execute.",
  "Restaurant kitchen needs to be brought up to code. Need someone who knows SF health department requirements.",
  "Interested in a custom cabinetry project for our home kitchen. Budget is flexible for quality work.",
  "Need emergency roofing repair — we have a leak and need someone out ASAP.",
  "Planning to renovate our entire ground floor. Looking for someone who communicates well and stays on schedule.",
  "Commercial property needs new flooring throughout — about 3000 sq ft. Can you handle this?",
];

const LEAD_SOURCES = ["contact", "contact", "contact", "quote", "quote", "newsletter", "callback"];
const LEAD_STATUSES = ["new", "new", "contacted", "contacted", "qualified", "won", "lost"];
const LEAD_SOURCE_PAGES = ["/contact", "/contact", "/contact", "/", "/services/construction-planning", "/book-online", "home_final_cta"];

/* ------------------------------------------------------------------ */
/* Seed analytics events                                               */
/* ------------------------------------------------------------------ */

async function seedAnalytics() {
  const events = [];
  const sessions = new Map(); // sessionId -> { device, locale, utm, referrer, pageCount }

  // Generate 90 days of traffic
  for (let day = 89; day >= 0; day--) {
    // Weekday gets more traffic, weekend less
    const date = new Date();
    date.setDate(date.getDate() - day);
    const dow = date.getDay();
    const isWeekend = dow === 0 || dow === 6;

    // Base traffic: 40-80 pageviews per weekday, 20-50 on weekend
    // Add a gentle upward trend over time
    const trendBoost = 1 + (89 - day) * 0.005;
    const baseCount = Math.floor((isWeekend ? randomInt(20, 50) : randomInt(40, 80)) * trendBoost);

    // Each "session" generates 1-8 pageviews
    let remaining = baseCount;
    while (remaining > 0) {
      const sessionId = genSessionId();
      const device = randomChoice(DEVICES);
      const locale = randomChoice(LOCALES);
      const utm = randomChoice(UTM_CAMPAIGNS);
      const referrer = randomChoice(REFERRERS);
      const pageCount = Math.min(remaining, randomInt(1, 8));

      // session_start event
      events.push({
        event: "session_start",
        path: PAGES[0],
        sessionId,
        referrer,
        utm: utm ? JSON.stringify(utm) : null,
        props: null,
        device,
        locale,
        createdAt: daysAgo(day, randomInt(7, 21)),
      });

      // pageview events
      for (let p = 0; p < pageCount; p++) {
        const pagePath = randomChoice(PAGES);
        events.push({
          event: "pageview",
          path: pagePath,
          sessionId,
          referrer: p === 0 ? referrer : null,
          utm: p === 0 && utm ? JSON.stringify(utm) : null,
          props: null,
          device,
          locale,
          createdAt: daysAgo(day, randomInt(7, 21)),
        });
      }

      // Some sessions have CTA clicks
      if (Math.random() < 0.3 && pageCount > 1) {
        events.push({
          event: "cta_click",
          path: randomChoice(PAGES),
          sessionId,
          referrer: null,
          utm: null,
          props: JSON.stringify({
            label: randomChoice(["Get a Quote", "Book Online", "Call Now", "Send Message"]),
            location: randomChoice(["header", "hero", "final_cta", "services_cta", "mobile_sticky"]),
          }),
          device,
          locale,
          createdAt: daysAgo(day, randomInt(7, 21)),
        });
      }

      // Some sessions start forms
      if (Math.random() < 0.15) {
        events.push({
          event: "form_start",
          path: randomChoice(["/contact", "/book-online"]),
          sessionId,
          referrer: null,
          utm: null,
          props: JSON.stringify({ form: randomChoice(["contact", "quote", "newsletter"]) }),
          device,
          locale,
          createdAt: daysAgo(day, randomInt(7, 21)),
        });

        // Some forms get submitted
        if (Math.random() < 0.5) {
          events.push({
            event: "form_submit",
            path: randomChoice(["/contact", "/book-online"]),
            sessionId,
            referrer: null,
            utm: null,
            props: JSON.stringify({ form: randomChoice(["contact", "quote", "newsletter"]) }),
            device,
            locale,
            createdAt: daysAgo(day, randomInt(7, 21)),
          });
        }
      }

      remaining -= pageCount;
    }
  }

  console.log(`[seed] Inserting ${events.length} analytics events...`);

  // Batch insert in chunks of 500
  for (let i = 0; i < events.length; i += 500) {
    const chunk = events.slice(i, i + 500);
    const values = chunk.map((_, idx) => {
      const offset = idx * 7;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`;
    }).join(", ");
    const params = chunk.flatMap(e => [e.event, e.path, e.sessionId, e.referrer, e.utm, e.props, e.device, e.locale, e.createdAt]);

    // Rebuild with correct param count
    const placeholders = chunk.map((_, idx) => {
      const o = idx * 9;
      return `($${o + 1}, $${o + 2}, $${o + 3}, $${o + 4}, $${o + 5}::jsonb, $${o + 6}::jsonb, $${o + 7}, $${o + 8}, $${o + 9})`;
    }).join(", ");

    await pool.query(
      `INSERT INTO analytics_events (event, path, session_id, referrer, utm, props, device, locale, created_at) VALUES ${placeholders}`,
      params,
    );
  }

  console.log("[seed] Analytics events inserted.");
}

/* ------------------------------------------------------------------ */
/* Seed leads                                                          */
/* ------------------------------------------------------------------ */

async function seedLeads() {
  // Generate ~60 leads over 90 days
  const leads = [];
  for (let i = 0; i < 60; i++) {
    const day = randomInt(0, 89);
    const nameIdx = i % LEAD_NAMES.length;
    const source = randomChoice(LEAD_SOURCES);
    const utm = randomChoice(UTM_CAMPAIGNS.filter(u => u !== null));

    leads.push({
      source,
      name: source === "newsletter" ? null : LEAD_NAMES[nameIdx],
      email: LEAD_EMAILS[nameIdx].replace("@", `+${i}@`),
      phone: source === "newsletter" ? null : `(${randomInt(415, 707)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      service: source === "newsletter" ? null : randomChoice(LEAD_SERVICES),
      message: source === "newsletter" ? null : randomChoice(LEAD_MESSAGES),
      sourcePage: randomChoice(LEAD_SOURCE_PAGES),
      utm: utm ? JSON.stringify(utm) : null,
      status: randomChoice(LEAD_STATUSES),
      emailStatus: Math.random() < 0.8 ? "sent" : "pending",
      createdAt: daysAgo(day),
    });
  }

  console.log(`[seed] Inserting ${leads.length} leads...`);

  for (const lead of leads) {
    const vals = [
      lead.source, lead.name, lead.email, lead.phone, lead.service,
      lead.message, lead.sourcePage, lead.utm, lead.status, lead.emailStatus, lead.createdAt,
    ];
    await pool.query(
      `INSERT INTO leads (source, name, email, phone, service, message, source_page, utm, status, email_status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11)`,
      vals,
    );
  }

  console.log("[seed] Leads inserted.");
}

/* ------------------------------------------------------------------ */
/* Seed newsletter subscribers                                         */
/* ------------------------------------------------------------------ */

async function seedNewsletter() {
  const subs = [];
  for (let i = 0; i < 30; i++) {
    const day = randomInt(0, 89);
    const confirmed = Math.random() < 0.7;
    subs.push({
      email: `subscriber${i}@example.com`,
      name: Math.random() < 0.5 ? LEAD_NAMES[i % LEAD_NAMES.length] : null,
      sourcePage: randomChoice(["/blog", "/", "footer"]),
      confirmed,
      confirmToken: confirmed ? null : "token_" + Math.random().toString(36).slice(2, 15),
      confirmedAt: confirmed ? daysAgo(day - randomInt(0, 2)) : null,
      createdAt: daysAgo(day),
    });
  }

  console.log(`[seed] Inserting ${subs.length} newsletter subscribers...`);

  for (const sub of subs) {
    try {
      await pool.query(
        `INSERT INTO newsletter_subscribers (email, name, source_page, confirmed, confirm_token, confirmed_at, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [sub.email, sub.name, sub.sourcePage, sub.confirmed, sub.confirmToken, sub.confirmedAt, sub.createdAt],
      );
    } catch (err) {
      // Skip duplicates
      if (!err.message.includes("unique")) throw err;
    }
  }

  console.log("[seed] Newsletter subscribers inserted.");
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  console.log("[seed] Starting demo data seeding...");
  await seedAnalytics();
  await seedLeads();
  await seedNewsletter();
  console.log("[seed] Done! Your dashboard now has 90 days of demo data.");
  await pool.end();
}

main().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
