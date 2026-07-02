"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const RANGES = [
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "All", days: 365 },
];

export function DateRangePicker() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("range") ?? "30";

  const handleChange = useCallback(
    (days: number) => {
      const sp = new URLSearchParams(params.toString());
      sp.set("range", String(days));
      router.push(`?${sp.toString()}`);
    },
    [params, router],
  );

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border bg-background p-0.5">
      {RANGES.map((r) => (
        <button
          key={r.days}
          onClick={() => handleChange(r.days)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            current === String(r.days)
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
