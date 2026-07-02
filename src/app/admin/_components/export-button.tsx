"use client";

interface ExportColumn {
  key: string;
  label: string;
}

/**
 * Client-side CSV export. Builds a CSV string from rows and triggers download.
 */
export function exportToCsv(
  filename: string,
  columns: ExportColumn[],
  rows: readonly Record<string, unknown>[],
) {
  const escape = (val: unknown) => {
    const str = val == null ? "" : String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = columns.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((row) => columns.map((c) => escape(row[c.key])).join(","))
    .join("\n");
  const csv = `${header}\n${body}`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function ExportButton({
  filename,
  columns,
  rows,
}: {
  filename: string;
  columns: ExportColumn[];
  rows: Record<string, unknown>[];
}) {
  return (
    <button
      onClick={() => exportToCsv(filename, columns, rows)}
      className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
      Export CSV
    </button>
  );
}
