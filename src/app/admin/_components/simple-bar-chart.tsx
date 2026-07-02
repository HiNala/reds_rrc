/**
 * Lightweight CSS-only bar chart — no external charting dependency.
 * Renders a row of vertical bars scaled to the max value.
 */
export function SimpleBarChart({
  data,
  height = 160,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  // Show at most ~30 bars to keep it readable.
  const step = Math.max(1, Math.ceil(data.length / 30));
  const visible = data.filter((_, i) => i % step === 0);

  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {visible.map((d, i) => {
        const pct = (d.value / max) * 100;
        return (
          <div
            key={i}
            className="group/bar relative flex flex-1 flex-col items-center justify-end"
            style={{ height: "100%" }}
            title={`${d.label}: ${d.value}`}
          >
            <div
              className="w-full min-w-[2px] rounded-t bg-primary/80 transition-all group-hover/bar:bg-primary"
              style={{ height: `${Math.max(pct, 1)}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
