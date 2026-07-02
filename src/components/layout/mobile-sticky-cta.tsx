"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PRIMARY_CTA, SITE } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

/** Sticky low-friction conversion bar shown on mobile only (requirement: sticky mobile CTA on every page). */
export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-md supports-backdrop-filter:bg-background/80 lg:hidden">
      <Button
        variant="outline"
        size="lg"
        className="flex-1"
        nativeButton={false}
        render={
          <a
            href={SITE.phoneHref}
            onClick={() => trackEvent("cta_click", { cta: "call", location: "mobile_sticky" })}
          />
        }
      >
        <Phone className="size-4" /> Call
      </Button>
      <Button
        size="lg"
        className="flex-1"
        nativeButton={false}
        render={
          <Link
            href={PRIMARY_CTA.href}
            onClick={() => trackEvent("cta_click", { cta: "quote", location: "mobile_sticky" })}
          />
        }
      >
        {PRIMARY_CTA.label}
      </Button>
    </div>
  );
}
