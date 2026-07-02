import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import {
  getKpiSummary,
  getPageviewsOverTime,
  getHourlyTraffic,
  getDayOfWeekTraffic,
  getTopPages,
  getTopReferrers,
  getTrafficSources,
  getDeviceBreakdown,
  getLocaleBreakdown,
  getUtmCampaignPerformance,
  getCtaClicks,
  getFunnel,
} from "@/lib/analytics-queries";
import { KpiCard } from "../_components/kpi-card";
import { BarChart, LineChart, HorizontalBarChart, DonutChart, FunnelChart } from "../_components/charts";
import { DateRangePicker } from "../_components/date-range-picker";
import { parseRange, type DateRange } from "../_components/date-range";
import { ExportButton } from "../_components/export-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Users, MousePointerClick, Target, Globe, Smartphone, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Analytics" };

const DEVICE_COLORS: Record<string, string> = {
  desktop: "#3b82f6",
  mobile: "#10b981",
  tablet: "#f59e0b",
  unknown: "#94a3b8",
};

const LOCALE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const range: DateRange = parseRange(sp);

  const [
    kpi,
    pageviews,
    hourly,
    dayOfWeek,
    topPages,
    referrers,
    traffic,
    devices,
    locales,
    utmCampaigns,
    ctaClicks,
    funnel,
  ] = await Promise.all([
    getKpiSummary(range),
    getPageviewsOverTime(range),
    getHourlyTraffic(range),
    getDayOfWeekTraffic(range),
    getTopPages(range, 20),
    getTopReferrers(range, 15),
    getTrafficSources(range, 15),
    getDeviceBreakdown(range),
    getLocaleBreakdown(range, 8),
    getUtmCampaignPerformance(range, 20),
    getCtaClicks(range, 20),
    getFunnel(range),
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Deep traffic & conversion insights — {range.from.toLocaleDateString()} — {range.to.toLocaleDateString()}
          </p>
        </div>
        <DateRangePicker />
      </div>

      {/* KPI summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Pageviews" value={kpi.totalPageviews.toLocaleString()} icon={Eye} />
        <KpiCard label="Unique Sessions" value={kpi.uniqueSessions.toLocaleString()} icon={Users} />
        <KpiCard label="CTA Clicks" value={kpi.totalCtaClicks.toLocaleString()} icon={MousePointerClick} />
        <KpiCard label="Conversion Rate" value={`${kpi.conversionRate}%`} icon={Target} />
      </div>

      {/* Traffic over time */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Over Time</CardTitle>
          <CardDescription>Daily pageview trend</CardDescription>
        </CardHeader>
        <CardContent>
          {pageviews.length > 0 ? (
            <LineChart data={pageviews.map((p) => ({ label: p.date.slice(5), value: p.count }))} height={220} />
          ) : (
            <EmptyState text="No pageviews recorded yet." />
          )}
        </CardContent>
      </Card>

      {/* When visitors come: hourly + day of week */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4" /> Hourly Traffic
            </CardTitle>
            <CardDescription>When your visitors arrive (by hour)</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={hourly.map((h) => ({ label: `${h.hour}:00`, value: h.count }))}
              height={160}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Day of Week</CardTitle>
            <CardDescription>Traffic by weekday</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={dayOfWeek.map((d) => ({ label: d.day.slice(0, 3), value: d.count }))}
              height={160}
              color="bg-indigo-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Top pages + referrers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most viewed pages with share</CardDescription>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Where your traffic comes from</CardDescription>
              </div>
              {referrers.length > 0 && (
                <ExportButton
                  filename="referrers.csv"
                  columns={[
                    { key: "referrer", label: "Referrer" },
                    { key: "count", label: "Visits" },
                  ]}
                  rows={referrers as unknown as Record<string, unknown>[]}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {referrers.length > 0 ? (
              <HorizontalBarChart data={referrers.map((r) => ({ label: r.referrer, value: r.count }))} />
            ) : (
              <EmptyState text="No referrer data yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Traffic sources + device breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>By UTM source / referrer domain</CardDescription>
          </CardHeader>
          <CardContent>
            {traffic.length > 0 ? (
              <HorizontalBarChart data={traffic.map((s) => ({ label: s.source, value: s.count, pct: s.pct }))} />
            ) : (
              <EmptyState text="No traffic source data yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="size-4" /> Device Breakdown
            </CardTitle>
            <CardDescription>Desktop vs mobile vs tablet</CardDescription>
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
      </div>

      {/* Locale + UTM campaigns */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-4" /> Top Locales
            </CardTitle>
            <CardDescription>Visitor language/region</CardDescription>
          </CardHeader>
          <CardContent>
            {locales.length > 0 ? (
              <DonutChart
                data={locales.map((l, i) => ({
                  label: l.locale,
                  value: l.count,
                  color: LOCALE_COLORS[i % LOCALE_COLORS.length],
                }))}
              />
            ) : (
              <EmptyState text="No locale data yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UTM Campaign Performance</CardTitle>
            <CardDescription>Which campaigns drive clicks & leads</CardDescription>
          </CardHeader>
          <CardContent>
            {utmCampaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="pb-2 pr-3 font-medium">Source</th>
                      <th className="pb-2 pr-3 font-medium">Medium</th>
                      <th className="pb-2 pr-3 font-medium">Campaign</th>
                      <th className="pb-2 pr-3 text-right font-medium">Clicks</th>
                      <th className="pb-2 text-right font-medium">Leads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utmCampaigns.map((c, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2 pr-3 font-medium">{c.source}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{c.medium}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{c.campaign}</td>
                        <td className="py-2 pr-3 text-right tabular-nums">{c.clicks}</td>
                        <td className="py-2 text-right tabular-nums font-medium">{c.leads}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text="No UTM campaign data yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* CTA clicks + funnel */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CTA Click Performance</CardTitle>
            <CardDescription>Which buttons get clicked most</CardDescription>
          </CardHeader>
          <CardContent>
            {ctaClicks.length > 0 ? (
              <div className="flex flex-col gap-2">
                {ctaClicks.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="flex-1 truncate font-medium">{c.label}</span>
                    <span className="text-xs text-muted-foreground">{c.location}</span>
                    <span className="w-10 text-right font-semibold tabular-nums">{c.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="No CTA click data yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Full funnel with step conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <FunnelChart steps={funnel} />
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
