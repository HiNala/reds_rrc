import "server-only";
import { db, schema } from "@/db/client";
import { sql, desc, asc, count, eq, and, gte, lte, ilike, or } from "drizzle-orm";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

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
  totalCtaClicks: number;
  totalFormStarts: number;
  totalFormSubmits: number;
  conversionRate: number;
  formCompletionRate: number;
  bounceRate: number;
  avgSessionDepth: number;
}

export interface TimeSeriesPoint {
  date: string;
  count: number;
}

export interface HourlyPoint {
  hour: number;
  count: number;
}

export interface TopPage {
  path: string;
  views: number;
  /** Percentage of total pageviews. */
  pct: number;
}

export interface TrafficSource {
  source: string;
  count: number;
  pct: number;
}

export interface DeviceBreakdown {
  device: string;
  count: number;
  pct: number;
}

export interface LocaleBreakdown {
  locale: string;
  count: number;
  pct: number;
}

export interface ReferrerRow {
  referrer: string;
  count: number;
}

export interface UtmCampaignRow {
  source: string;
  medium: string;
  campaign: string;
  clicks: number;
  leads: number;
}

export interface FunnelStep {
  step: string;
  count: number;
  pct: number;
}

export interface CtaClickRow {
  label: string;
  location: string;
  count: number;
}

export interface LeadWithDetails {
  id: number;
  source: string;
  name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  sourcePage: string | null;
  utm: Record<string, unknown> | null;
  status: string;
  emailStatus: string;
  createdAt: Date;
}

export interface LeadStats {
  total: number;
  bySource: { source: string; count: number }[];
  byStatus: { status: string; count: number }[];
  byService: { service: string; count: number }[];
}

export interface LeadNoteRow {
  id: number;
  note: string;
  author: string | null;
  createdAt: Date;
}

/* ------------------------------------------------------------------ */
/* Helper                                                              */
/* ------------------------------------------------------------------ */

function pct(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 1000) / 10;
}

/* ------------------------------------------------------------------ */
/* KPI Summary — the headline numbers                                  */
/* ------------------------------------------------------------------ */

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

  const [ctaClicks] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "cta_click")));

  const [formStarts] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "form_start")));

  const [formSubmits] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "form_submit")));

  const [sessions] = await db
    .select({ c: sql<number>`count(distinct ${schema.analyticsEvents.sessionId})` })
    .from(schema.analyticsEvents)
    .where(conditions);

  // Bounce rate: sessions with exactly 1 event
  const [bounced] = await db
    .select({ c: sql<number>`count(*)` })
    .from(
      sql`(
        select ${schema.analyticsEvents.sessionId}
        from ${schema.analyticsEvents}
        where ${conditions}
        group by ${schema.analyticsEvents.sessionId}
        having count(*) = 1
      ) as bounced_sessions`,
    );

  // Average session depth: avg events per session
  const [depth] = await db
    .select({
      c: sql<number>`coalesce(avg(event_count), 0)`,
    })
    .from(
      sql`(
        select ${schema.analyticsEvents.sessionId} as sid, count(*) as event_count
        from ${schema.analyticsEvents}
        where ${conditions}
        group by ${schema.analyticsEvents.sessionId}
      ) as session_depths`,
    );

  const pvCount = pageviews?.c ?? 0;
  const leadCount = leads?.c ?? 0;
  const sessionCount = sessions?.c ?? 0;
  const formStartCount = formStarts?.c ?? 0;
  const formSubmitCount = formSubmits?.c ?? 0;
  const bouncedCount = bounced?.c ?? 0;

  return {
    totalPageviews: pvCount,
    totalLeads: leadCount,
    totalSignups: signups?.c ?? 0,
    totalLogins: logins?.c ?? 0,
    uniqueSessions: sessionCount,
    totalCtaClicks: ctaClicks?.c ?? 0,
    totalFormStarts: formStartCount,
    totalFormSubmits: formSubmitCount,
    conversionRate: pct(leadCount, pvCount),
    formCompletionRate: pct(formSubmitCount, formStartCount),
    bounceRate: pct(bouncedCount, sessionCount),
    avgSessionDepth: depth?.c ? Math.round(depth.c * 10) / 10 : 0,
  };
}

/* ------------------------------------------------------------------ */
/* Time series — pageviews by day                                      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Time series — leads by day                                          */
/* ------------------------------------------------------------------ */

export async function getLeadsOverTime(range: DateRange): Promise<TimeSeriesPoint[]> {
  const rows = await db
    .select({
      date: sql<string>`to_char(date_trunc('day', ${schema.leads.createdAt}), 'YYYY-MM-DD')`,
      count: count(),
    })
    .from(schema.leads)
    .where(
      and(
        gte(schema.leads.createdAt, range.from),
        lte(schema.leads.createdAt, range.to),
      ),
    )
    .groupBy(sql`date_trunc('day', ${schema.leads.createdAt})`)
    .orderBy(sql`date_trunc('day', ${schema.leads.createdAt})`);

  return rows.map((r) => ({ date: r.date, count: r.count }));
}

/* ------------------------------------------------------------------ */
/* Hourly traffic — when visitors come                                 */
/* ------------------------------------------------------------------ */

export async function getHourlyTraffic(range: DateRange): Promise<HourlyPoint[]> {
  const rows = await db
    .select({
      hour: sql<number>`extract(hour from ${schema.analyticsEvents.createdAt})::int`,
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
    .groupBy(sql`extract(hour from ${schema.analyticsEvents.createdAt})`)
    .orderBy(sql`extract(hour from ${schema.analyticsEvents.createdAt})`);

  // Fill in all 24 hours
  const map = new Map(rows.map((r) => [r.hour, r.count]));
  return Array.from({ length: 24 }, (_, h) => ({ hour: h, count: map.get(h) ?? 0 }));
}

/* ------------------------------------------------------------------ */
/* Day-of-week traffic                                                 */
/* ------------------------------------------------------------------ */

export async function getDayOfWeekTraffic(range: DateRange): Promise<{ day: string; count: number }[]> {
  const rows = await db
    .select({
      day: sql<string>`to_char(${schema.analyticsEvents.createdAt}, 'Day')`,
      dayNum: sql<number>`extract(dow from ${schema.analyticsEvents.createdAt})::int`,
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
    .groupBy(sql`extract(dow from ${schema.analyticsEvents.createdAt})`, sql`to_char(${schema.analyticsEvents.createdAt}, 'Day')`)
    .orderBy(sql`extract(dow from ${schema.analyticsEvents.createdAt})`);

  return rows.map((r) => ({ day: r.day.trim(), count: r.count }));
}

/* ------------------------------------------------------------------ */
/* Top pages                                                           */
/* ------------------------------------------------------------------ */

export async function getTopPages(range: DateRange, limit = 15): Promise<TopPage[]> {
  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "pageview"),
      ),
    );

  const total = totalRow?.c ?? 0;

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
    .map((r) => ({ path: r.path, views: r.views, pct: pct(r.views, total) }));
}

/* ------------------------------------------------------------------ */
/* Traffic sources — utm source / referrer domain                      */
/* ------------------------------------------------------------------ */

export async function getTrafficSources(range: DateRange, limit = 15): Promise<TrafficSource[]> {
  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "session_start"),
      ),
    );

  const total = totalRow?.c ?? 0;

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

  return rows.map((r) => ({ source: r.source, count: r.count, pct: pct(r.count, total) }));
}

/* ------------------------------------------------------------------ */
/* Top referrers                                                       */
/* ------------------------------------------------------------------ */

export async function getTopReferrers(range: DateRange, limit = 15): Promise<ReferrerRow[]> {
  const rows = await db
    .select({
      referrer: sql<string>`split_part(${schema.analyticsEvents.referrer}, '/', 3)`,
      count: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "pageview"),
        sql`${schema.analyticsEvents.referrer} IS NOT NULL AND ${schema.analyticsEvents.referrer} != ''`,
      ),
    )
    .groupBy(sql`split_part(${schema.analyticsEvents.referrer}, '/', 3)`)
    .orderBy(desc(count()))
    .limit(limit);

  return rows
    .filter((r): r is { referrer: string; count: number } => r.referrer !== null && r.referrer !== "")
    .map((r) => ({ referrer: r.referrer, count: r.count }));
}

/* ------------------------------------------------------------------ */
/* Device breakdown                                                    */
/* ------------------------------------------------------------------ */

export async function getDeviceBreakdown(range: DateRange): Promise<DeviceBreakdown[]> {
  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "pageview"),
      ),
    );

  const total = totalRow?.c ?? 0;

  const rows = await db
    .select({
      device: schema.analyticsEvents.device,
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
    .groupBy(schema.analyticsEvents.device)
    .orderBy(desc(count()));

  return rows.map((r) => ({
    device: r.device ?? "unknown",
    count: r.count,
    pct: pct(r.count, total),
  }));
}

/* ------------------------------------------------------------------ */
/* Locale / language breakdown                                         */
/* ------------------------------------------------------------------ */

export async function getLocaleBreakdown(range: DateRange, limit = 10): Promise<LocaleBreakdown[]> {
  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "pageview"),
      ),
    );

  const total = totalRow?.c ?? 0;

  const rows = await db
    .select({
      locale: schema.analyticsEvents.locale,
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
    .groupBy(schema.analyticsEvents.locale)
    .orderBy(desc(count()))
    .limit(limit);

  return rows.map((r) => ({
    locale: r.locale ?? "unknown",
    count: r.count,
    pct: pct(r.count, total),
  }));
}

/* ------------------------------------------------------------------ */
/* UTM campaign performance                                            */
/* ------------------------------------------------------------------ */

export async function getUtmCampaignPerformance(range: DateRange, limit = 20): Promise<UtmCampaignRow[]> {
  const rows = await db
    .select({
      source: sql<string>`coalesce((${schema.analyticsEvents.utm})->>'source', 'direct')`,
      medium: sql<string>`coalesce((${schema.analyticsEvents.utm})->>'medium', 'organic')`,
      campaign: sql<string>`coalesce((${schema.analyticsEvents.utm})->>'campaign', 'none')`,
      clicks: count(),
      leads: sql<number>`sum(case when ${schema.analyticsEvents.event} = 'lead' then 1 else 0 end)`,
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        or(
          eq(schema.analyticsEvents.event, "session_start"),
          eq(schema.analyticsEvents.event, "lead"),
        ),
      ),
    )
    .groupBy(
      sql`coalesce((${schema.analyticsEvents.utm})->>'source', 'direct')`,
      sql`coalesce((${schema.analyticsEvents.utm})->>'medium', 'organic')`,
      sql`coalesce((${schema.analyticsEvents.utm})->>'campaign', 'none')`,
    )
    .orderBy(desc(count()))
    .limit(limit);

  return rows.map((r) => ({
    source: r.source,
    medium: r.medium,
    campaign: r.campaign,
    clicks: r.clicks,
    leads: Number(r.leads ?? 0),
  }));
}

/* ------------------------------------------------------------------ */
/* Conversion funnel                                                   */
/* ------------------------------------------------------------------ */

export async function getFunnel(range: DateRange): Promise<FunnelStep[]> {
  const conditions = and(
    gte(schema.analyticsEvents.createdAt, range.from),
    lte(schema.analyticsEvents.createdAt, range.to),
  );

  const [pv] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "pageview")));

  const [cta] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "cta_click")));

  const [fs] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "form_start")));

  const [fsub] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "form_submit")));

  const [ld] = await db
    .select({ c: count() })
    .from(schema.analyticsEvents)
    .where(and(conditions, eq(schema.analyticsEvents.event, "lead")));

  const max = pv?.c ?? 0;
  const steps = [
    { step: "Pageviews", count: pv?.c ?? 0 },
    { step: "CTA Clicks", count: cta?.c ?? 0 },
    { step: "Form Starts", count: fs?.c ?? 0 },
    { step: "Form Submits", count: fsub?.c ?? 0 },
    { step: "Leads", count: ld?.c ?? 0 },
  ];

  return steps.map((s) => ({
    ...s,
    pct: max > 0 ? Math.round((s.count / max) * 1000) / 10 : 0,
  }));
}

/* ------------------------------------------------------------------ */
/* CTA click breakdown                                                 */
/* ------------------------------------------------------------------ */

export async function getCtaClicks(range: DateRange, limit = 20): Promise<CtaClickRow[]> {
  const rows = await db
    .select({
      label: sql<string>`coalesce((${schema.analyticsEvents.props})->>'label', 'unknown')`,
      location: sql<string>`coalesce((${schema.analyticsEvents.props})->>'location', 'unknown')`,
      count: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, range.from),
        lte(schema.analyticsEvents.createdAt, range.to),
        eq(schema.analyticsEvents.event, "cta_click"),
      ),
    )
    .groupBy(
      sql`coalesce((${schema.analyticsEvents.props})->>'label', 'unknown')`,
      sql`coalesce((${schema.analyticsEvents.props})->>'location', 'unknown')`,
    )
    .orderBy(desc(count()))
    .limit(limit);

  return rows.map((r) => ({
    label: r.label,
    location: r.location,
    count: r.count,
  }));
}

/* ------------------------------------------------------------------ */
/* Leads — list with filtering + search                                */
/* ------------------------------------------------------------------ */

export interface LeadFilter {
  status?: string;
  source?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getLeads(range: DateRange, filter: LeadFilter = {}): Promise<LeadWithDetails[]> {
  const conditions = [
    gte(schema.leads.createdAt, range.from),
    lte(schema.leads.createdAt, range.to),
  ];

  if (filter.status && filter.status !== "all") {
    conditions.push(eq(schema.leads.status, filter.status));
  }
  if (filter.source && filter.source !== "all") {
    conditions.push(eq(schema.leads.source, filter.source));
  }
  if (filter.search) {
    conditions.push(
      or(
        ilike(schema.leads.name, `%${filter.search}%`),
        ilike(schema.leads.email, `%${filter.search}%`),
        ilike(schema.leads.phone, `%${filter.search}%`),
        ilike(schema.leads.message, `%${filter.search}%`),
      )!,
    );
  }

  const limit = filter.limit ?? 50;
  const offset = filter.offset ?? 0;

  const rows = await db
    .select()
    .from(schema.leads)
    .where(and(...conditions))
    .orderBy(desc(schema.leads.createdAt))
    .limit(limit)
    .offset(offset);

  return rows as unknown as LeadWithDetails[];
}

/* ------------------------------------------------------------------ */
/* Lead count (for pagination)                                         */
/* ------------------------------------------------------------------ */

export async function getLeadCount(range: DateRange, filter: LeadFilter = {}): Promise<number> {
  const conditions = [
    gte(schema.leads.createdAt, range.from),
    lte(schema.leads.createdAt, range.to),
  ];

  if (filter.status && filter.status !== "all") {
    conditions.push(eq(schema.leads.status, filter.status));
  }
  if (filter.source && filter.source !== "all") {
    conditions.push(eq(schema.leads.source, filter.source));
  }
  if (filter.search) {
    conditions.push(
      or(
        ilike(schema.leads.name, `%${filter.search}%`),
        ilike(schema.leads.email, `%${filter.search}%`),
        ilike(schema.leads.phone, `%${filter.search}%`),
        ilike(schema.leads.message, `%${filter.search}%`),
      )!,
    );
  }

  const [row] = await db
    .select({ c: count() })
    .from(schema.leads)
    .where(and(...conditions));

  return row?.c ?? 0;
}

/* ------------------------------------------------------------------ */
/* Lead stats — aggregate breakdowns                                   */
/* ------------------------------------------------------------------ */

export async function getLeadStats(range: DateRange): Promise<LeadStats> {
  const conditions = and(
    gte(schema.leads.createdAt, range.from),
    lte(schema.leads.createdAt, range.to),
  );

  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.leads)
    .where(conditions);

  const bySource = await db
    .select({ source: schema.leads.source, count: count() })
    .from(schema.leads)
    .where(conditions)
    .groupBy(schema.leads.source)
    .orderBy(desc(count()));

  const byStatus = await db
    .select({ status: schema.leads.status, count: count() })
    .from(schema.leads)
    .where(conditions)
    .groupBy(schema.leads.status)
    .orderBy(desc(count()));

  const byService = await db
    .select({ service: schema.leads.service, count: count() })
    .from(schema.leads)
    .where(conditions)
    .groupBy(schema.leads.service)
    .orderBy(desc(count()));

  return {
    total: totalRow?.c ?? 0,
    bySource: bySource.map((r) => ({ source: r.source, count: r.count })),
    byStatus: byStatus.map((r) => ({ status: r.status, count: r.count })),
    byService: byService
      .filter((r): r is { service: string; count: number } => r.service !== null)
      .map((r) => ({ service: r.service, count: r.count })),
  };
}

/* ------------------------------------------------------------------ */
/* Single lead by ID                                                   */
/* ------------------------------------------------------------------ */

export async function getLeadById(id: number): Promise<LeadWithDetails | null> {
  const [row] = await db
    .select()
    .from(schema.leads)
    .where(eq(schema.leads.id, id))
    .limit(1);

  return (row as unknown as LeadWithDetails | undefined) ?? null;
}

/* ------------------------------------------------------------------ */
/* Lead notes                                                          */
/* ------------------------------------------------------------------ */

export async function getLeadNotes(leadId: number): Promise<LeadNoteRow[]> {
  const rows = await db
    .select({
      id: schema.leadNotes.id,
      note: schema.leadNotes.note,
      author: schema.leadNotes.author,
      createdAt: schema.leadNotes.createdAt,
    })
    .from(schema.leadNotes)
    .where(eq(schema.leadNotes.leadId, leadId))
    .orderBy(desc(schema.leadNotes.createdAt));

  return rows;
}

/* ------------------------------------------------------------------ */
/* Lead events — analytics events for this lead's email/session        */
/* ------------------------------------------------------------------ */

export async function getLeadEvents(leadId: number): Promise<{
  event: string;
  path: string | null;
  createdAt: Date;
  props: unknown;
}[]> {
  const lead = await getLeadById(leadId);
  if (!lead) return [];

  // Find analytics events that match this lead's email in props, or
  // events around the same time with the same session.
  const rows = await db
    .select({
      event: schema.analyticsEvents.event,
      path: schema.analyticsEvents.path,
      createdAt: schema.analyticsEvents.createdAt,
      props: schema.analyticsEvents.props,
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, new Date(lead.createdAt.getTime() - 30 * 60 * 1000)),
        lte(schema.analyticsEvents.createdAt, new Date(lead.createdAt.getTime() + 5 * 60 * 1000)),
        sql`(${schema.analyticsEvents.props})->>'email' = ${lead.email} OR ${schema.analyticsEvents.event} = 'lead'`,
      ),
    )
    .orderBy(asc(schema.analyticsEvents.createdAt))
    .limit(50);

  return rows;
}

/* ------------------------------------------------------------------ */
/* Recent leads (for dashboard widget)                                 */
/* ------------------------------------------------------------------ */

export async function getRecentLeads(limit = 10): Promise<LeadWithDetails[]> {
  const rows = await db
    .select()
    .from(schema.leads)
    .orderBy(desc(schema.leads.createdAt))
    .limit(limit);
  return rows as unknown as LeadWithDetails[];
}

/* ------------------------------------------------------------------ */
/* Leads by source (for dashboard chart)                               */
/* ------------------------------------------------------------------ */

export async function getLeadsBySource(range: DateRange): Promise<{ source: string; count: number; pct: number }[]> {
  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.leads)
    .where(
      and(
        gte(schema.leads.createdAt, range.from),
        lte(schema.leads.createdAt, range.to),
      ),
    );

  const total = totalRow?.c ?? 0;

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

  return rows.map((r) => ({ source: r.source, count: r.count, pct: pct(r.count, total) }));
}

/* ------------------------------------------------------------------ */
/* Newsletter stats                                                    */
/* ------------------------------------------------------------------ */

export async function getNewsletterStats(range: DateRange): Promise<{
  total: number;
  confirmed: number;
  pending: number;
}> {
  const conditions = and(
    gte(schema.newsletterSubscribers.createdAt, range.from),
    lte(schema.newsletterSubscribers.createdAt, range.to),
  );

  const [totalRow] = await db
    .select({ c: count() })
    .from(schema.newsletterSubscribers)
    .where(conditions);

  const [confirmedRow] = await db
    .select({ c: count() })
    .from(schema.newsletterSubscribers)
    .where(and(conditions, eq(schema.newsletterSubscribers.confirmed, true)));

  const total = totalRow?.c ?? 0;
  const confirmed = confirmedRow?.c ?? 0;

  return {
    total,
    confirmed,
    pending: total - confirmed,
  };
}
