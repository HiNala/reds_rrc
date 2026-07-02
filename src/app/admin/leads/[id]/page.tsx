import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getLeadById, getLeadNotes, getLeadEvents } from "@/lib/analytics-queries";
import { SourceBadge, StatusBadge } from "../../_components/status-badge";
import { LeadDetailActions } from "./lead-detail-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, Globe, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = Number(idStr);

  if (isNaN(id)) {
    return <div className="text-muted-foreground">Invalid lead ID.</div>;
  }

  const lead = await getLeadById(id);
  if (!lead) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/admin/leads" className="text-sm text-primary hover:underline">
          ← Back to leads
        </Link>
        <p className="text-muted-foreground">Lead not found.</p>
      </div>
    );
  }

  const [notes, events] = await Promise.all([
    getLeadNotes(id),
    getLeadEvents(id),
  ]);

  const utm = lead.utm as Record<string, string> | null;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/leads"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to leads
        </Link>
      </div>

      {/* Lead header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-semibold">
              {lead.name ?? "Anonymous"}
            </h1>
            <SourceBadge source={lead.source} />
            <StatusBadge status={lead.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Submitted {lead.createdAt.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: contact info + message */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Contact info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={Mail} label="Email" value={lead.email} href={`mailto:${lead.email}`} />
                <InfoRow icon={Phone} label="Phone" value={lead.phone} href={lead.phone ? `tel:${lead.phone}` : undefined} />
                <InfoRow icon={FileText} label="Service" value={lead.service} />
                <InfoRow icon={Globe} label="Source Page" value={lead.sourcePage} />
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          {lead.message && (
            <Card>
              <CardHeader>
                <CardTitle>Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {lead.message}
                </p>
              </CardContent>
            </Card>
          )}

          {/* UTM data */}
          {utm && Object.keys(utm).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Campaign / UTM Data</CardTitle>
                <CardDescription>How this lead found you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {utm.source && <UtmRow label="Source" value={utm.source} />}
                  {utm.medium && <UtmRow label="Medium" value={utm.medium} />}
                  {utm.campaign && <UtmRow label="Campaign" value={utm.campaign} />}
                  {utm.term && <UtmRow label="Term" value={utm.term} />}
                  {utm.content && <UtmRow label="Content" value={utm.content} />}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity timeline */}
          {events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Events leading up to this lead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {events.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                      <div className="flex-1">
                        <span className="font-medium">{ev.event}</span>
                        {ev.path && (
                          <span className="ml-2 font-mono text-xs text-muted-foreground">{ev.path}</span>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {new Date(ev.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: status + notes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Manage Lead</CardTitle>
              <CardDescription>Update status and add notes</CardDescription>
            </CardHeader>
            <CardContent>
              <LeadDetailActions
                leadId={lead.id}
                currentStatus={lead.status}
                notes={notes.map((n) => ({
                  ...n,
                  createdAt: n.createdAt.toISOString(),
                }))}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  const display = value ?? "—";
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </span>
      {href && value ? (
        <a href={href} className="text-sm font-medium text-primary hover:underline">
          {display}
        </a>
      ) : (
        <span className="text-sm">{display}</span>
      )}
    </div>
  );
}

function UtmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
