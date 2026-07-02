import { z } from "zod";

/**
 * Shared analytics module — safe to import from both client and server.
 *
 * Server-only code (the `track()` function) lives in `@/lib/analytics-server`
 * to keep `pg` and other server deps out of the client bundle.
 *
 * Client-side tracking helpers (`trackEvent`, `captureUtmParams`,
 * `getStoredUtmParams`) are used by forms, headers, and CTAs.
 */

/* ------------------------------------------------------------------ */
/* Zod schemas (client + server safe)                                  */
/* ------------------------------------------------------------------ */

export const utmSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
  })
  .partial();

export const trackEventSchema = z.object({
  event: z.string().min(1).max(120),
  path: z.string().max(300).optional(),
  sessionId: z.string().max(100).optional(),
  referrer: z.string().max(500).optional(),
  utm: utmSchema.optional(),
  props: z.record(z.string(), z.unknown()).optional(),
  device: z.string().max(20).optional(),
  locale: z.string().max(20).optional(),
});
export type TrackEventInput = z.infer<typeof trackEventSchema>;

/* ------------------------------------------------------------------ */
/* Client-side helpers                                                 */
/* ------------------------------------------------------------------ */

const UTM_STORAGE_KEY = "rrc_utm";
const SID_STORAGE_KEY = "rrc_sid";

/** Capture UTM params from the URL into sessionStorage (call on landing). */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["source", "medium", "campaign", "term", "content"]) {
    const val = params.get(`utm_${key}`);
    if (val) utm[key] = val;
  }
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

/** Read previously captured UTM params from sessionStorage. */
export function getStoredUtmParams(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return undefined;
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem(SID_STORAGE_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(SID_STORAGE_KEY, sid);
  }
  return sid;
}

function guessDevice(ua: string): string {
  const lower = ua.toLowerCase();
  if (/mobile|android|iphone|ipod/.test(lower)) return "mobile";
  if (/tablet|ipad/.test(lower)) return "tablet";
  return "desktop";
}

/**
 * Best-effort client-side track call — fire and forget, never blocks.
 * POSTs to /api/track. Respects Do-Not-Track.
 */
export function trackEvent(
  event: string,
  props: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1") return;

  const storedUtm = getStoredUtmParams();
  const body = {
    event,
    path: window.location.pathname,
    sessionId: getSessionId(),
    referrer: document.referrer || undefined,
    utm: storedUtm,
    props,
    device: guessDevice(navigator.userAgent),
    locale: navigator.language,
  };

  const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", blob);
  } else {
    fetch("/api/track", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  }
}
