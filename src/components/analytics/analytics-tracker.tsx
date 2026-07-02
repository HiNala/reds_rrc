"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent, captureUtmParams } from "@/lib/analytics";

/**
 * <AnalyticsTracker /> — mount once in the root layout.
 * Automatically fires `pageview` on every route change and
 * `session_start` on first load. Also wires global CTA click tracking.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // session_start — once per browser session.
  useEffect(() => {
    const KEY = "rrc_session_started";
    if (!sessionStorage.getItem(KEY)) {
      sessionStorage.setItem(KEY, "1");
      trackEvent("session_start", { landing_path: pathname });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pageview + UTM capture — on every route/searchParams change.
  useEffect(() => {
    captureUtmParams();
    trackEvent("pageview", { path: pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // CTA click tracking — delegate on data-track-cta attributes.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-track-cta]",
      );
      if (target) {
        trackEvent("cta_click", {
          label: target.dataset.trackCta ?? target.textContent?.trim() ?? "",
          location: target.dataset.trackLocation ?? pathname,
        });
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
