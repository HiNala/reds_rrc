"use client";

import * as React from "react";

/**
 * Wraps an interactive element and emits a `cta_click` analytics event on
 * click. Fire-and-forget POST to /api/track — analytics must never break the
 * user's request, so failures are swallowed.
 *
 * The server-side `track()` in @/lib/analytics resolves session/referrer/utm
 * from cookies + headers; this client helper only forwards the event + props
 * and lets the server fill the rest.
 *
 * @see start/rebuild/analytics-plan.md
 */
type TrackClickProps = {
  /** Stable CTA label, e.g. "Get a quote". */
  label: string;
  /** Where on the page the CTA lives, e.g. "blog-article-footer". */
  location: string;
  /** Extra props to attach to the event. */
  props?: Record<string, unknown>;
  /** Render as a child wrapper (default) or provide a className for a button. */
  className?: string;
  children: React.ReactNode;
};

export function TrackClick({
  label,
  location,
  props,
  className,
  children,
}: TrackClickProps) {
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      // Only fire for the primary button (left click, no modifier keys).
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const body = {
        event: "cta_click",
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
        props: { label, location, ...props },
      };

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {
        /* swallow — analytics must never break the UX */
      });
    },
    [label, location, props],
  );

  return (
    <span className={className} onClick={handleClick} data-track={location}>
      {children}
    </span>
  );
}
