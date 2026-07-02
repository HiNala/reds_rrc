import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  jsonb,
  integer,
  index,
} from "drizzle-orm/pg-core";

/**
 * Foundational schema for the lead-capture + analytics funnel.
 * See start/rebuild/database-plan.md, start/rebuild/site-architecture.json,
 * and INTEGRATION_GUIDE.md (canonical shapes agreed across missions).
 *
 * Additional domain tables (blog `posts` if it moves off the file-based
 * registry, `bookings`, ...) can be added by follow-on missions.
 */

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    /** Which form/channel this came through: contact | quote | newsletter | callback */
    source: varchar("source", { length: 40 }).notNull().default("contact"),
    name: varchar("name", { length: 200 }),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    service: varchar("service", { length: 120 }),
    message: text("message"),
    /** Page path the visitor submitted from, e.g. "/contact" or "home_final_cta". */
    sourcePage: varchar("source_page", { length: 300 }),
    /** { source, medium, campaign, term, content } */
    utm: jsonb("utm"),
    status: varchar("status", { length: 30 }).notNull().default("new"), // new | contacted | qualified | won | lost
    emailStatus: varchar("email_status", { length: 30 }).notNull().default("pending"), // pending | sent | failed | skipped
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("leads_created_at_idx").on(table.createdAt),
    index("leads_email_idx").on(table.email),
    index("leads_status_idx").on(table.status),
    index("leads_source_idx").on(table.source),
  ],
);

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 200 }),
  sourcePage: varchar("source_page", { length: 300 }),
  confirmed: boolean("confirmed").notNull().default(false),
  confirmToken: varchar("confirm_token", { length: 100 }),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    event: varchar("event", { length: 120 }).notNull(), // pageview | session_start | cta_click | form_start | form_submit | thank_you | lead | signup | login | ...
    path: varchar("path", { length: 300 }),
    sessionId: varchar("session_id", { length: 100 }),
    referrer: varchar("referrer", { length: 500 }),
    /** { source, medium, campaign, term, content } */
    utm: jsonb("utm"),
    props: jsonb("props"),
    device: varchar("device", { length: 20 }), // mobile | tablet | desktop
    locale: varchar("locale", { length: 20 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("analytics_events_created_at_idx").on(table.createdAt),
    index("analytics_events_session_id_idx").on(table.sessionId),
    index("analytics_events_event_idx").on(table.event),
  ],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;

// ---------------------------------------------------------------------------
// Project gallery — admin-managed portfolio of completed work.
// Images are stored in MinIO (S3-compatible) and referenced by storage key.
// ---------------------------------------------------------------------------

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  /** e.g. "Kitchen", "Bathroom", "Restaurant", "Commercial", "Maintenance" */
  category: varchar("category", { length: 100 }),
  location: varchar("location", { length: 200 }),
  /** Show on the clients page gallery. */
  published: boolean("published").notNull().default(true),
  /** Pinned to the top of the gallery. */
  featured: boolean("featured").notNull().default(false),
  /** Manual ordering — lower comes first. */
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projectImages = pgTable(
  "project_images",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    /** S3/MinIO storage key (e.g. "projects/3/uuid.jpg"). */
    storageKey: varchar("storage_key", { length: 500 }).notNull(),
    alt: varchar("alt", { length: 300 }),
    /** MIME type of the stored image. */
    contentType: varchar("content_type", { length: 100 }),
    /** File size in bytes. */
    size: integer("size"),
    /** Manual ordering within the project — lower comes first. */
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("project_images_project_id_idx").on(table.projectId),
  ],
);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectImage = typeof projectImages.$inferSelect;
export type NewProjectImage = typeof projectImages.$inferInsert;

// ---------------------------------------------------------------------------
// Lead notes — admin can add notes to leads for CRM-style tracking.
// ---------------------------------------------------------------------------

export const leadNotes = pgTable(
  "lead_notes",
  {
    id: serial("id").primaryKey(),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    note: text("note").notNull(),
    /** Admin email who wrote the note. */
    author: varchar("author", { length: 320 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("lead_notes_lead_id_idx").on(table.leadId),
  ],
);

export type LeadNote = typeof leadNotes.$inferSelect;
export type NewLeadNote = typeof leadNotes.$inferInsert;
