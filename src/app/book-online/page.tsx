import type { Metadata } from "next";
import Link from "next/link";

import { SITE, absoluteUrl } from "@/lib/site-config";
import { SectionHeading } from "@/components/site/section-heading";
import { TrackClick } from "@/components/analytics/track-click";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";

/**
 * Booking page. The source site had a password gate here; the modern rebuild
 * replaces it with a real booking surface. If an external scheduler URL is
 * configured via NEXT_PUBLIC_BOOKING_URL, we deep-link to it (tracked). If
 * not, we fall back to a callback request via the contact page.
 */
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

export const metadata: Metadata = {
  title: "Book Online",
  description: `Schedule a consultation with ${SITE.shortName}. Book a call or request a callback — we'll come back with a clear, honest path forward.`,
  alternates: { canonical: "/book-online" },
  openGraph: {
    title: `Book Online | ${SITE.shortName}`,
    description: `Schedule a consultation with ${SITE.shortName}.`,
    url: absoluteUrl("/book-online"),
    type: "website",
  },
};

export default function BookOnlinePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Book a consultation
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Book Online
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Tell us about your project and pick a time that works for you.
          We&apos;ll come back with a clear, honest path forward — no pressure,
          no jargon.
        </p>
      </header>

      {BOOKING_URL ? (
        <EmbeddedScheduler url={BOOKING_URL} />
      ) : (
        <FallbackBooking />
      )}

      {/* Contact alternatives */}
      <section className="mt-12 rounded-2xl border border-border bg-muted/40 p-8">
        <SectionHeading
          eyebrow="Prefer to talk now?"
          title="Reach us directly"
          align="left"
          className="mb-6"
        />
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
          <Link
            href={SITE.phoneHref}
            className="font-medium text-primary hover:underline"
          >
            Call {SITE.phone}
          </Link>
          <Link
            href={SITE.emailHref}
            className="font-medium text-primary hover:underline"
          >
            {SITE.email}
          </Link>
          <Link
            href="/contact"
            className="font-medium text-primary hover:underline"
          >
            Send a message
          </Link>
        </div>
      </section>
    </div>
  );
}

/** When an external scheduler URL is configured, embed it in an iframe. */
function EmbeddedScheduler({ url }: { url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <TrackClick label="Open scheduler" location="book-online-embed" className="sr-only">
        <span />
      </TrackClick>
      <iframe
        src={url}
        title="Schedule a consultation"
        className="h-[640px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}

/** Fallback when no external scheduler is configured — guide to contact. */
function FallbackBooking() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
      <h2 className="font-heading text-2xl font-bold text-foreground">
        Request a consultation
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Send us a quick message with your project details and a few times that
        work for you. We&apos;ll confirm within one business day.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <TrackClick
          label="Send a message"
          location="book-online-fallback"
          className="inline-block"
        >
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "px-5")}
          >
            Send a message
          </Link>
        </TrackClick>
        <Link
          href={SITE.phoneHref}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}
        >
          Call {SITE.phone}
        </Link>
      </div>
    </div>
  );
}
