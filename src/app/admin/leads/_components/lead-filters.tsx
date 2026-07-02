"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const STATUS_OPTIONS = ["all", "new", "contacted", "qualified", "won", "lost"];
const SOURCE_OPTIONS = ["all", "contact", "quote", "newsletter", "callback"];

export function LeadFilters({
  total,
  totalCount,
}: {
  total: number;
  totalCount: number;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const sp = new URLSearchParams(params.toString());
      if (value && value !== "all") {
        sp.set(key, value);
      } else {
        sp.delete(key);
      }
      router.push(`?${sp.toString()}`);
    },
    [params, router],
  );

  const currentStatus = params.get("status") ?? "all";
  const currentSource = params.get("source") ?? "all";
  const currentSearch = params.get("q") ?? "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <svg
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search name, email, phone, message..."
          defaultValue={currentSearch}
          onChange={(e) => {
            const val = e.target.value;
            const sp = new URLSearchParams(params.toString());
            if (val) sp.set("q", val);
            else sp.delete("q");
            // Debounce-ish: only update on every keystroke but use replace
            router.replace(`?${sp.toString()}`);
          }}
          className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Status filter */}
      <select
        value={currentStatus}
        onChange={(e) => update("status", e.target.value)}
        className="h-9 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      {/* Source filter */}
      <select
        value={currentSource}
        onChange={(e) => update("source", e.target.value)}
        className="h-9 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {SOURCE_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s === "all" ? "All Sources" : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <span className="text-sm text-muted-foreground">
        {total} of {totalCount} leads
      </span>
    </div>
  );
}
