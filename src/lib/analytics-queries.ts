import "server-only";
import { db, schema } from "@/db/client";
import { sql, desc, count, eq, and, gte, lte } from "drizzle-orm";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface KpiSummary {
  totalPageviews: number;
  totalLeads: number;
  totalSignups: number;
  totalLogins: number;
  uniqueSessions: number;
}

export interface TimeSeriesPoint {
  date: string;
  count: number;
}

export interface TopPage {
  path: string;
  views: number;
}

export interface TrafficSource {
  source: string;
  count: number;
}

export interface FunnelStep {
  step: string;
  count: number;
}

/**
 * Aggregated KPI counts for the dashboard cards.
 */
export async function getKpiSummary(range: DateRange): Promise<KpiSummary> {
  const conditions = and(
    gte(schema.analyticsEvents.createdAt, range.from),
    lte(schema.analyticsEvents.createdAt, range.to),
  );

  const [pageviews] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "pageview")));

  const [leads] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "lead")));

  const [signups] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "signup")));

  const [logins] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "login")));

  const [sessions] = await db
    .select({ c: sql<number>`count(distinct ${schema.analyticsEvents.sessionId})` })
    .from(schema.analyticsEvents)
    .where(conditions);

  return {
    totalPageviews: pageviews?.c ?? 0,
    totalLeads: leads?.c ?? 0,
    totalSignups: signups?.c ?? 0,
    totalLogins: logins?.c ?? 0,
    uniqueSessions: sessions?.c ?? 0,
  };
}

/**
 * Pageviews grouped by day — for the time-series chart.
 */
export async function getPageviewsOverTime(range: DateRange): Promise<TimeSeriesPoint[]> {
  const rows = await db
    .select({
      date: sql<string>`to_char(date_trunc('day', ${schema.analyticsEvents.createdAt}), 'YYYY-MM-DD')`,
      count: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "pageview"),
      ),
    )
    .groupBy(sql`date_trunc('day', ${schema.analyticsEvents.createdAt})`)
    .orderBy(sql`date_trunc('day', ${schema.analyticsEvents.createdAt})`);

  return rows.map((r) => ({ date: r.date, count: r.count }));
}

/**
 * Top pages by view count.
 */
export async function getTopPages(range: DateRange, limit = 10): Promise<TopPage[]> {
  const rows = await db
    .select({
      path: schema.analyticsEvents.path,
      views: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "pageview"),
      ),
    )
    .groupBy(schema.analyticsEvents.path)
    .orderBy(desc(count()))
    .limit(limit);

  return rows
    .filter((r): r is { path: string; views: number } => r.path !== null)
    .map((r) => ({ path: r.path, views: r.views }));
}

/**
 * Traffic sources — grouped by utm.source (falls back to referrer domain).
 */
export async function getTrafficSources(range: DateRange, limit = 10): Promise<TrafficSource[]> {
  const rows = await db
    .select({
      source: sql<string>`coalesce((${schema.analyticsEvents.utm})->>'source', split_part(${schema.analyticsEvents.referrer}, '/', 3), 'direct')`,
      count: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "session_start"),
      ),
    )
    .groupBy(sql`coalesce((${schema.analyticsEvents.utm})->>'source', split_part(${schema.analyticsEvents.referrer}, '/', 3), 'direct')`)
    .orderBy(desc(count()))
    .limit(limit);

  return rows.map((r) => ({ source: r.source, count: r.count }));
}

/**
 * Conversion funnel: pageview → signup → lead.
 */
export async function getFunnel(range: DateRange): Promise<FunnelStep[]> {
  const conditions = and(
    gte(schema.analyticsEvents.createdAt, range.from),
    lte(schema.analyticsEvents.createdAt, range.to),
  );

  const [pv] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "pageview")));

  const [su] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "signup")));

  const [ld] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "lead")));

  return [
    { step: "Pageviews", count: pv?.c ?? 0 },
    { step: "Signups", count: su?.c ?? 0 },
    { step: "Leads", count: ld?.c ?? 0 },
  ];
}

/**
 * Recent leads — for the activity table.
 */
export async function getRecentLeads(limit = 20) {
  return db
    .select({
      id: schema.leads.id,
      source: schema.leads.source,
      name: schema.leads.name,
      email: schema.leads.email,
      service: schema.leads.service,
      status: schema.leads.status,
      createdAt: schema.leads.createdAt,
    })
    .from(schema.leads)
    .orderBy(desc(schema.leads.createdAt))
    .limit(limit);
}

/**
 * Leads grouped by source — for the leads-by-source breakdown.
 */
export async function getLeadsBySource(range: DateRange) {
  const rows = await db
    .select({
      source: schema.leads.source,
      count: count(),
    })
    .from(schema.leads)
    .where(
      and(
        gte(schema.leads.createdAt, range.from),
        lte(schema.leads.createdAt, range.to),
      ),
    )
    .groupBy(schema.leads.source)
    .orderBy(desc(count()));

  return rows.map((r) => ({ source: r.source, count: r.count }));
}
