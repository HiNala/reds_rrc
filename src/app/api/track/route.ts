import { NextResponse, type NextRequest } from "next/server";
import { db, schema } from "@/db/client";
import { trackEventSchema } from "@/lib/analytics";

/**
 * POST /api/track — persist a single analytics event.
 *
 * Used by the client-side tracker (`trackEvent()` in `@/lib/analytics`).
 * Respects Do-Not-Track. Never blocks the page (best-effort insert).
 */
export async function POST(request: NextRequest) {
  // Respect Do-Not-Track
  const dnt = request.headers.get("dnt");
  if (dnt === "1") {
    return NextResponse.json({ ok: true, skipped: "dnt" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = trackEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { event, path, sessionId, referrer, utm, props, device, locale } = parsed.data;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  try {
    await db.insert(schema.analyticsEvents).values({
      event,
      path: path ?? null,
      sessionId: sessionId ?? null,
      referrer: referrer ?? null,
      utm: utm ?? null,
      props: props ?? {},
      device: device ?? (userAgent ? guessDevice(userAgent) : null),
      locale: locale ?? request.headers.get("accept-language")?.split(",")[0] ?? null,
    });
  } catch (err) {
    // Best-effort — never block the page on analytics failure.
    console.error("[/api/track] insert failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function guessDevice(ua: string): string {
  const lower = ua.toLowerCase();
  if (/mobile|android|iphone|ipod/.test(lower)) return "mobile";
  if (/tablet|ipad/.test(lower)) return "tablet";
  return "desktop";
}
