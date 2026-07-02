import "server-only";
import { db, schema } from "@/db/client";
import type { TrackEventInput } from "@/lib/analytics";

/**
 * Server-side analytics insert — best-effort, never throws.
 *
 * This module is server-only (`import "server-only"`) so `pg` and other
 * server deps are never bundled into client code.
 *
 * Only callable from server code (route handlers, server actions).
 */
export async function track(
  event: string,
  options: Omit<TrackEventInput, "event"> = {},
): Promise<void> {
  try {
    await db.insert(schema.analyticsEvents).values({
      event,
      path: options.path ?? null,
      sessionId: options.sessionId ?? null,
      referrer: options.referrer ?? null,
      utm: options.utm ?? null,
      props: options.props ?? {},
      device: options.device ?? null,
      locale: options.locale ?? null,
    });
  } catch (err) {
    console.error(`[analytics] Failed to record server-side event "${event}"`, err);
  }
}
