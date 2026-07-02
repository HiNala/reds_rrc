import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PRIMARY_CTA, SITE } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden sm:min-h-[68vh]">
      {/* Full-bleed background image */}
      <Image
        src="/hero/hero-1.png"
        alt="Outdoor deck and patio built by Red's RRC — featuring glass railing, seating, and scenic Bay Area backdrop"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay for text legibility — heavier on the left where text sits */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
        aria-hidden
      />
      {/* Bottom fade into the page for a smooth transition */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <Reveal className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <ShieldCheck className="size-3.5 text-primary" />
            {SITE.license}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-6xl">
            Building &amp; maintaining Bay Area homes and restaurants{" "}
            <span className="text-primary">since 2012.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 drop-shadow sm:text-lg">
            {SITE.tagline} — {SITE.name} pairs transparent communication with
            dependable craftsmanship, so your project stays on schedule, on
            budget, and on your terms.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-6 text-base shadow-lg"
              nativeButton={false}
              render={<Link href={PRIMARY_CTA.href} />}
            >
              {PRIMARY_CTA.label}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 border-white/30 bg-white/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              nativeButton={false}
              render={<a href={SITE.phoneHref} />}
            >
              <Phone className="size-4" /> {SITE.phone}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </span>
              Trusted by families &amp; restaurant owners
            </span>
            <span className="hidden sm:inline" aria-hidden>
              &middot;
            </span>
            <span>{SITE.certification}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
