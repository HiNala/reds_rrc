import { requireAdmin } from "@/lib/auth";
import { getRecentLeads } from "@/lib/analytics-queries";
import { LeadsTable } from "../_components/leads-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await getRecentLeads(100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Leads</h1>
        <p className="text-sm text-muted-foreground">
          All form submissions ({leads.length} total)
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>Contact, quote, and newsletter submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <LeadsTable leads={leads} />
          ) : (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No leads yet — submissions will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
