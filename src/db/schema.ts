import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * Foundational schema for the lead-capture + analytics funnel.
 * See start/rebuild/database-plan.md, start/rebuild/site-architecture.json,
 * and INTEGRATION_GUIDE.md (canonical shapes agreed across missions).
 *
 * Additional domain tables (blog `posts` if it moves off the file-based
 * registry, `bookings`, ...) can be added by follow-on missions.
 */

export const leads = pgTable("leads", {
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
});

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

export const analyticsEvents = pgTable("analytics_events", {
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
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
