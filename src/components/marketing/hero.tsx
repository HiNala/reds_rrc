import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PRIMARY_CTA, SITE } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            {SITE.license}
          </div>

          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Building &amp; maintaining Bay Area homes and restaurants{" "}
            <span className="text-primary">since 2012.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {SITE.tagline} — {SITE.name} pairs transparent communication with
            dependable craftsmanship, so your project stays on schedule, on
            budget, and on your terms.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-6 text-base"
              nativeButton={false}
              render={<Link href={PRIMARY_CTA.href} />}
            >
              {PRIMARY_CTA.label}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 text-base"
              nativeButton={false}
              render={<a href={SITE.phoneHref} />}
            >
              <Phone className="size-4" /> {SITE.phone}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </span>
              Trusted by families &amp; restaurant owners
            </span>
            <span>{SITE.certification}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src="/hero/hero-1.png"
              alt="Outdoor deck and patio built by Red's RRC — featuring glass railing, seating, and scenic Bay Area backdrop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
