import { requireAdmin } from "@/lib/auth";
import {
  getLeads,
  getLeadCount,
  getLeadStats,
} from "@/lib/analytics-queries";
import { LeadsTable } from "../_components/leads-table";
import { LeadFilters } from "./_components/lead-filters";
import { DateRangePicker } from "../_components/date-range-picker";
import { parseRange, type DateRange } from "../_components/date-range";
import { ExportButton } from "../_components/export-button";
import { StatusBadge } from "../_components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HorizontalBarChart } from "../_components/charts";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const range: DateRange = parseRange(sp);

  const status = typeof sp.status === "string" ? sp.status : undefined;
  const source = typeof sp.source === "string" ? sp.source : undefined;
  const search = typeof sp.q === "string" ? sp.q : undefined;
  const page = Number(sp.page ?? "1");
  const pageSize = 50;

  const filter = {
    status: status && status !== "all" ? status : undefined,
    source: source && source !== "all" ? source : undefined,
    search,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  const [leads, totalCount, stats] = await Promise.all([
    getLeads(range, filter),
    getLeadCount(range, filter),
    getLeadStats(range),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-muted-foreground">
            All form submissions — {totalCount} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker />
          {leads.length > 0 && (
            <ExportButton
              filename={`leads-${new Date().toISOString().slice(0, 10)}.csv`}
              columns={[
                { key: "id", label: "ID" },
                { key: "source", label: "Source" },
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "service", label: "Service" },
                { key: "message", label: "Message" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Date" },
              ]}
              rows={leads.map((l) => ({
                ...l,
                createdAt: l.createdAt.toISOString(),
              }))}
            />
          )}
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card size="sm">
          <CardContent className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Total Leads</span>
            <span className="font-heading text-2xl font-semibold tabular-nums">{stats.total}</span>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">By Status</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {stats.byStatus.map((s) => (
                <StatusBadge key={s.status} status={s.status} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card size="sm" className="sm:col-span-2">
          <CardContent className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">By Source</span>
            <HorizontalBarChart
              data={stats.bySource.map((s) => ({ label: s.source, value: s.count }))}
              max={stats.total}
            />
          </CardContent>
        </Card>
      </div>

      {/* Filters + table */}
      <Card>
        <CardHeader>
          <LeadFilters total={leads.length} totalCount={totalCount} />
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <>
              <LeadsTable leads={leads} />
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    {page > 1 && (
                      <a
                        href={`?${updatePageParam(sp, page - 1)}`}
                        className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted"
                      >
                        ← Prev
                      </a>
                    )}
                    {page < totalPages && (
                      <a
                        href={`?${updatePageParam(sp, page + 1)}`}
                        className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted"
                      >
                        Next →
                      </a>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No leads match your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function updatePageParam(
  sp: { [key: string]: string | string[] | undefined },
  page: number,
): string {
  const urlSp = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") urlSp.set(key, value);
  }
  urlSp.set("page", String(page));
  return urlSp.toString();
}
