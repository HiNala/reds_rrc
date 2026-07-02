/* ------------------------------------------------------------------ */
/* Lightweight CSS-only chart components — no external deps.           */
/* ------------------------------------------------------------------ */

/* Vertical bar chart with axis labels and hover tooltips. */
export function BarChart({
  data,
  height = 180,
  color = "bg-primary",
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const step = Math.max(1, Math.ceil(data.length / 40));
  const visible = data.filter((_, i) => i % step === 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-px" style={{ height }}>
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
                className={`w-full min-w-[2px] rounded-t ${color} opacity-80 transition-all group-hover/bar:opacity-100`}
                style={{ height: `${Math.max(pct, 0.5)}%` }}
              />
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover/bar:opacity-100">
                {d.label}: {d.value}
              </div>
            </div>
          );
        })}
      </div>
      {visible.length > 0 && (
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{visible[0]?.label}</span>
          {visible.length > 2 && (
            <span>{visible[Math.floor(visible.length / 2)]?.label}</span>
          )}
          <span>{visible[visible.length - 1]?.label}</span>
        </div>
      )}
    </div>
  );
}

/* Horizontal bar chart — good for ranked lists (top pages, sources, etc). */
export function HorizontalBarChart({
  data,
  max: maxProp,
  color = "bg-primary/80 group-hover/hbar:bg-primary",
}: {
  data: { label: string; value: number; pct?: number }[];
  max?: number;
  color?: string;
}) {
  const max = maxProp ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex flex-col gap-2">
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const labelPct = d.pct !== undefined ? ` (${d.pct}%)` : "";
        return (
          <div key={i} className="group/hbar flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0 truncate text-xs text-muted-foreground" title={d.label}>
              {d.label}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
              <div
                className={`h-full rounded transition-all ${color}`}
                style={{ width: `${Math.max(pct, 0.5)}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-xs font-medium tabular-nums">
              {d.value}{labelPct}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* Donut chart — for device breakdown, status distribution, etc. */
export function DonutChart({
  data,
  size = 140,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={12}
            className="text-muted"
          />
          {total > 0 &&
            data.map((d, i) => {
              const dash = (d.value / total) * circumference;
              const seg = (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={12}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += dash;
              return seg;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold tabular-nums">{total}</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="size-3 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span className="capitalize text-muted-foreground">{d.label}</span>
            <span className="ml-auto font-medium tabular-nums">
              {d.value}
              <span className="ml-1 text-xs text-muted-foreground">
                ({total > 0 ? Math.round((d.value / total) * 100) : 0}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Line chart — for time series with trend. */
export function LineChart({
  data,
  height = 180,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 100; // percentage-based
  const points = data.map((d, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * width,
    y: 100 - (d.value / max) * 90, // leave 10% headroom
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L ${width} 100 L 0 100 Z`;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative" style={{ height }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1={0}
              y1={y}
              x2={100}
              y2={y}
              stroke="currentColor"
              strokeWidth={0.2}
              className="text-muted"
            />
          ))}
          {/* Area */}
          <path d={areaD} fill="url(#area-grad)" />
          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      {data.length > 0 && (
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{data[0]?.label}</span>
          {data.length > 2 && (
            <span>{data[Math.floor(data.length / 2)]?.label}</span>
          )}
          <span>{data[data.length - 1]?.label}</span>
        </div>
      )}
    </div>
  );
}

/* Funnel chart — vertical steps with conversion percentages. */
export function FunnelChart({
  steps,
}: {
  steps: { step: string; count: number; pct: number }[];
}) {
  const max = steps[0]?.count ?? 1;

  return (
    <div className="flex flex-col gap-3">
      {steps.map((s, i) => {
        const widthPct = max > 0 ? (s.count / max) * 100 : 0;
        const conversionPct =
          i > 0 && steps[i - 1].count > 0
            ? ((s.count / steps[i - 1].count) * 100).toFixed(1)
            : null;

        return (
          <div key={s.step}>
            {conversionPct && (
              <div className="mb-1 text-center text-xs text-muted-foreground">
                ↓ {conversionPct}% step conversion
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-sm font-medium">{s.step}</span>
              <div className="relative h-8 flex-1 overflow-hidden rounded bg-muted">
                <div
                  className="flex h-full items-center justify-end rounded bg-primary/80 px-2 transition-all"
                  style={{ width: `${Math.max(widthPct, 2)}%` }}
                >
                  <span className="text-xs font-semibold text-primary-foreground tabular-nums">
                    {s.count}
                  </span>
                </div>
              </div>
              <span className="w-12 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                {s.pct}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
