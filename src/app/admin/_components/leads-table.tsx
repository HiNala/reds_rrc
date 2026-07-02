import Link from "next/link";
import { StatusBadge, SourceBadge } from "./status-badge";

type LeadRow = {
  id: number;
  source: string;
  name: string | null;
  email: string;
  service: string | null;
  status: string;
  createdAt: Date;
};

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="pb-2 pr-4 font-medium">Source</th>
            <th className="pb-2 pr-4 font-medium">Name</th>
            <th className="pb-2 pr-4 font-medium">Email</th>
            <th className="pb-2 pr-4 font-medium">Service</th>
            <th className="pb-2 pr-4 font-medium">Status</th>
            <th className="pb-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b last:border-0 transition-colors hover:bg-muted/40">
              <td className="py-2 pr-4">
                <SourceBadge source={lead.source} />
              </td>
              <td className="py-2 pr-4">
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="font-medium hover:underline"
                >
                  {lead.name ?? "—"}
                </Link>
              </td>
              <td className="py-2 pr-4 text-muted-foreground">{lead.email}</td>
              <td className="py-2 pr-4 text-muted-foreground">{lead.service ?? "—"}</td>
              <td className="py-2 pr-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="py-2 text-xs text-muted-foreground">
                {lead.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
