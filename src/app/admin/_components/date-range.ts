/**
 * Server-safe date range parser — not a client module.
 * Used by admin server components to parse the ?range= query param.
 */
export interface DateRange {
  from: Date;
  to: Date;
}

export function parseRange(searchParams: { range?: string | string[] | undefined }): DateRange {
  const days = Number(searchParams.range ?? "30");
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - (isNaN(days) ? 30 : days));
  return { from, to };
}
