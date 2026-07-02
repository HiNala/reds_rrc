import { requireAdmin } from "@/lib/auth";
import {
  getKpiSummary,
  getPageviewsOverTime,
  getTopPages,
  getTrafficSources,
  getFunnel,
  getRecentLeads,
  getLeadsBySource,
} from "@/lib/analytics-queries";
import { KpiCard } from "./_components/kpi-card";
import { SimpleBarChart } from "./_components/simple-bar-chart";
import { LeadsTable } from "./_components/leads-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Users, Mail, LogIn, TrendingUp, MousePointerClick } from "lucide-react";

export const dynamic = "force-dynamic";

function defaultRange(): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  return { from, to };
}

export default async function AdminDashboard() {
  await requireAdmin();
  const range = defaultRange();

  const [kpi, pageviews, topPages, traffic, funnel, recentLeads, leadsBySource] =
    await Promise.all([
      getKpiSummary(range),
      getPageviewsOverTime(range),
      getTopPages(range),
      getTrafficSources(range),
      getFunnel(range),
      getRecentLeads(10),
      getLeadsBySource(range),
    ]);

  const conversionRate =
    kpi.totalPageviews > 0
      ? ((kpi.totalLeads / kpi.totalPageviews) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Last 30 days</p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Pageviews" value={kpi.totalPageviews} icon={Eye} />
        <KpiCard label="Unique Sessions" value={kpi.uniqueSessions} icon={Users} />
        <KpiCard label="Leads" value={kpi.totalLeads} icon={Mail} />
        <KpiCard label="Signups" value={kpi.totalSignups} icon={TrendingUp} />
        <KpiCard label="Logins" value={kpi.totalLogins} icon={LogIn} />
        <KpiCard
          label="Conversion Rate"
          value={`${conversionRate}%`}
          icon={MousePointerClick}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pageviews over time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pageviews Over Time</CardTitle>
            <CardDescription>Daily pageview count (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            {pageviews.length > 0 ? (
              <SimpleBarChart
                data={pageviews.map((p: { date: string; count: number }) => ({ label: p.date.slice(5), value: p.count }))}
              />
            ) : (
              <EmptyState text="No pageviews recorded yet." />
            )}
          </CardContent>
        </Card>

        {/* Conversion funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>pageview → signup → lead</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {funnel.map((step: { step: string; count: number }, i: number) => {
                const max = funnel[0]?.count ?? 1;
                const pct = max > 0 ? (step.count / max) * 100 : 0;
                return (
                  <div key={step.step}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{step.step}</span>
                      <span className="font-medium">{step.count}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {i < funnel.length - 1 && (
                      <div className="mt-1 text-right text-xs text-muted-foreground">
                        {funnel[i + 1].count > 0
                          ? `${((funnel[i + 1].count / step.count) * 100).toFixed(1)}%`
                          : "—"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages</CardDescription>
          </CardHeader>
          <CardContent>
            {topPages.length > 0 ? (
              <ol className="flex flex-col gap-2">
                {topPages.map((p: { path: string; views: number }, i: number) => (
                  <li key={p.path} className="flex items-center gap-3 text-sm">
                    <span className="w-5 text-muted-foreground">{i + 1}.</span>
                    <span className="flex-1 truncate font-mono text-xs">{p.path}</span>
                    <span className="font-medium">{p.views}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState text="No page data yet." />
            )}
          </CardContent>
        </Card>

        {/* Traffic sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>By utm_source / referrer</CardDescription>
          </CardHeader>
          <CardContent>
            {traffic.length > 0 ? (
              <ol className="flex flex-col gap-2">
                {traffic.map((s: { source: string; count: number }) => (
                  <li key={s.source} className="flex items-center justify-between text-sm">
                    <span className="truncate">{s.source}</span>
                    <span className="font-medium">{s.count}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState text="No traffic source data yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Leads by source */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Source</CardTitle>
          <CardDescription>Where your leads are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          {leadsBySource.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {leadsBySource.map((s: { source: string; count: number }) => (
                <div
                  key={s.source}
                  className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                >
                  <span className="font-medium capitalize">{s.source}</span>
                  <span className="text-muted-foreground">{s.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No leads yet." />
          )}
        </CardContent>
      </Card>

      {/* Recent leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Latest 10 form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentLeads.length > 0 ? (
            <LeadsTable leads={recentLeads} />
          ) : (
            <EmptyState text="No leads yet — submissions will appear here." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
