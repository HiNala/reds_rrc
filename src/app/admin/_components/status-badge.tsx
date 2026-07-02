export const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  contacted: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  qualified: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  won: "bg-green-500/10 text-green-700 dark:text-green-400",
  lost: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export const SOURCE_STYLES: Record<string, string> = {
  contact: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  quote: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  newsletter: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  callback: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium capitalize ${
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}

export function SourceBadge({ source }: { source: string }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium capitalize ${
        SOURCE_STYLES[source] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {source}
    </span>
  );
}
