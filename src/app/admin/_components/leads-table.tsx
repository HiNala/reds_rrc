import { Badge } from "@/components/ui/badge";

type LeadRow = {
  id: number;
  source: string;
  name: string | null;
  email: string;
  service: string | null;
  status: string;
  createdAt: Date;
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  contacted: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  qualified: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  won: "bg-green-500/10 text-green-700 dark:text-green-400",
  lost: "bg-red-500/10 text-red-700 dark:text-red-400",
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
            <tr key={lead.id} className="border-b last:border-0">
              <td className="py-2 pr-4">
                <span className="capitalize">{lead.source}</span>
              </td>
              <td className="py-2 pr-4">{lead.name ?? "—"}</td>
              <td className="py-2 pr-4 text-muted-foreground">{lead.email ?? "—"}</td>
              <td className="py-2 pr-4 text-muted-foreground">{lead.service ?? "—"}</td>
              <td className="py-2 pr-4">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                    STATUS_STYLES[lead.status] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {lead.status}
                </span>
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
