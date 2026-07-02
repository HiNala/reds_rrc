import Link from "next/link";
import { TrackClick } from "@/components/analytics/track-click";
import { buttonVariants } from "@/components/ui/button";
import { SITE, PRIMARY_CTA } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Reusable centered CTA band. The primary action is tracked via TrackClick.
 * A secondary "call now" link is shown when a phone number is configured.
 */
export function CtaBand({
  heading = "Have a project in mind?",
  subheading = "Tell us what you're planning and we'll come back with a clear, honest path forward — no pressure, no jargon.",
  ctaLabel = PRIMARY_CTA.label,
  ctaHref = PRIMARY_CTA.href,
  trackLocation = "cta-band",
  className,
}: {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  trackLocation?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl rounded-2xl border border-border bg-muted/50 p-8 text-center sm:p-12",
        className,
      )}
    >
      <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{subheading}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <TrackClick
          label={ctaLabel}
          location={trackLocation}
          className="inline-block"
        >
          <Link href={ctaHref} className={cn(buttonVariants({ size: "lg" }), "px-5")}>
            {ctaLabel}
          </Link>
        </TrackClick>
        <Link
          href={SITE.phoneHref}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}
        >
          Call {SITE.phone}
        </Link>
      </div>
    </section>
  );
}
