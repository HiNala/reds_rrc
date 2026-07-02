import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import {
  getKpiSummary,
  getPageviewsOverTime,
  getLeadsOverTime,
  getTopPages,
  getTrafficSources,
  getFunnel,
  getRecentLeads,
  getLeadsBySource,
  getDeviceBreakdown,
  getNewsletterStats,
} from "@/lib/analytics-queries";
import { getProjectStats } from "@/lib/projects-queries";
import { KpiCard } from "./_components/kpi-card";
import { BarChart, LineChart, FunnelChart, HorizontalBarChart, DonutChart } from "./_components/charts";
import { LeadsTable } from "./_components/leads-table";
import { DateRangePicker } from "./_components/date-range-picker";
import { parseRange, type DateRange } from "./_components/date-range";
import { ExportButton } from "./_components/export-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Users,
  Mail,
  TrendingUp,
  MousePointerClick,
  Target,
  FileText,
  CheckCircle2,
  Percent,
  Layers,
  FolderKanban,
  Star,
  ImageIcon,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

const DEVICE_COLORS: Record<string, string> = {
  desktop: "#3b82f6",
  mobile: "#10b981",
  tablet: "#f59e0b",
  unknown: "#94a3b8",
};

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const range: DateRange = parseRange(sp);

  const [kpi, pageviews, leadsOverTime, topPages, traffic, funnel, recentLeads, leadsBySource, devices, newsletter, projectStats] =
    await Promise.all([
      getKpiSummary(range),
      getPageviewsOverTime(range),
      getLeadsOverTime(range),
      getTopPages(range, 10),
      getTrafficSources(range, 8),
      getFunnel(range),
      getRecentLeads(8),
      getLeadsBySource(range),
      getDeviceBreakdown(range),
      getNewsletterStats(range),
      getProjectStats(),
    ]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header with date range */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {range.from.toLocaleDateString()} — {range.to.toLocaleDateString()}
          </p>
        </div>
        <DateRangePicker />
      </div>

      {/* KPI cards — row 1: traffic */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <KpiCard label="Pageviews" value={kpi.totalPageviews.toLocaleString()} icon={Eye} />
        <KpiCard label="Unique Sessions" value={kpi.uniqueSessions.toLocaleString()} icon={Users} />
        <KpiCard label="Avg Session Depth" value={kpi.avgSessionDepth} icon={Layers} />
        <KpiCard label="Bounce Rate" value={`${kpi.bounceRate}%`} icon={Percent} />
        <KpiCard label="CTA Clicks" value={kpi.totalCtaClicks.toLocaleString()} icon={MousePointerClick} />
        <KpiCard label="Conversion Rate" value={`${kpi.conversionRate}%`} icon={Target} />
      </div>

      {/* KPI cards — row 2: leads & forms */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <KpiCard label="Leads" value={kpi.totalLeads.toLocaleString()} icon={Mail} />
        <KpiCard label="Form Starts" value={kpi.totalFormStarts.toLocaleString()} icon={FileText} />
        <KpiCard label="Form Submits" value={kpi.totalFormSubmits.toLocaleString()} icon={CheckCircle2} />
        <KpiCard label="Form Completion" value={`${kpi.formCompletionRate}%`} icon={TrendingUp} />
        <KpiCard label="Newsletter Signups" value={newsletter.total.toLocaleString()} icon={TrendingUp} />
        <KpiCard label="Confirmed Subs" value={newsletter.confirmed.toLocaleString()} icon={CheckCircle2} />
      </div>

      {/* Charts row 1: pageviews + leads over time */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pageviews Over Time</CardTitle>
            <CardDescription>Daily pageview count</CardDescription>
          </CardHeader>
          <CardContent>
            {pageviews.length > 0 ? (
              <LineChart
                data={pageviews.map((p) => ({ label: p.date.slice(5), value: p.count }))}
              />
            ) : (
              <EmptyState text="No pageviews recorded yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads Over Time</CardTitle>
            <CardDescription>Daily lead submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {leadsOverTime.length > 0 ? (
              <BarChart
                data={leadsOverTime.map((p) => ({ label: p.date.slice(5), value: p.count }))}
                color="bg-emerald-500"
              />
            ) : (
              <EmptyState text="No leads recorded yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conversion funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>
            pageview → CTA click → form start → form submit → lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FunnelChart steps={funnel} />
        </CardContent>
      </Card>

      {/* Charts row 2: top pages + traffic sources */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most viewed pages</CardDescription>
              </div>
              {topPages.length > 0 && (
                <ExportButton
                  filename="top-pages.csv"
                  columns={[
                    { key: "path", label: "Path" },
                    { key: "views", label: "Views" },
                    { key: "pct", label: "Percent" },
                  ]}
                  rows={topPages as unknown as Record<string, unknown>[]}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {topPages.length > 0 ? (
              <HorizontalBarChart data={topPages.map((p) => ({ label: p.path, value: p.views, pct: p.pct }))} />
            ) : (
              <EmptyState text="No page data yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>By utm_source / referrer domain</CardDescription>
          </CardHeader>
          <CardContent>
            {traffic.length > 0 ? (
              <HorizontalBarChart data={traffic.map((s) => ({ label: s.source, value: s.count, pct: s.pct }))} />
            ) : (
              <EmptyState text="No traffic source data yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Device breakdown + leads by source */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>What your visitors are using</CardDescription>
          </CardHeader>
          <CardContent>
            {devices.length > 0 ? (
              <DonutChart
                data={devices.map((d) => ({
                  label: d.device,
                  value: d.count,
                  color: DEVICE_COLORS[d.device] ?? "#94a3b8",
                }))}
              />
            ) : (
              <EmptyState text="No device data yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Which forms are converting</CardDescription>
          </CardHeader>
          <CardContent>
            {leadsBySource.length > 0 ? (
              <HorizontalBarChart
                data={leadsBySource.map((s) => ({ label: s.source, value: s.count, pct: s.pct }))}
                color="bg-emerald-500/80 group-hover/hbar:bg-emerald-500"
              />
            ) : (
              <EmptyState text="No leads yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent leads + Project gallery stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest 8 form submissions</CardDescription>
              </div>
              <Link
                href="/admin/leads"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length > 0 ? (
              <LeadsTable leads={recentLeads} />
            ) : (
              <EmptyState text="No leads yet — submissions will appear here." />
            )}
          </CardContent>
        </Card>

        {/* Project Gallery Stats */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="size-5 text-primary" />
                  Project Gallery
                </CardTitle>
                <CardDescription>Portfolio overview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FolderKanban className="size-3.5" /> Total
                </div>
                <p className="mt-1 text-2xl font-bold tabular-nums">{projectStats.total}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5" /> Published
                </div>
                <p className="mt-1 text-2xl font-bold tabular-nums">{projectStats.published}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Star className="size-3.5" /> Featured
                </div>
                <p className="mt-1 text-2xl font-bold tabular-nums">{projectStats.featured}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ImageIcon className="size-3.5" /> Images
                </div>
                <p className="mt-1 text-2xl font-bold tabular-nums">{projectStats.totalImages}</p>
              </div>
            </div>
            {projectStats.drafts > 0 && (
              <p className="text-xs text-muted-foreground">
                {projectStats.drafts} draft{projectStats.drafts === 1 ? "" : "s"} not yet published
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/admin/projects" />}
              className="w-full"
            >
              Manage Projects <ArrowRight className="size-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>
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
