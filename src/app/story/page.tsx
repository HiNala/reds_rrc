import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SITE, VALUES, absoluteUrl } from "@/lib/site-config";
import { CtaBand } from "@/components/site/cta-band";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Story",
  description: `How ${SITE.founder} built ${SITE.shortName} on transparency, efficiency, and community — a Bay Area general contractor since ${SITE.since}.`,
  alternates: { canonical: "/story" },
  openGraph: {
    title: `Our Story | ${SITE.shortName}`,
    description: `How ${SITE.founder} built ${SITE.shortName} on transparency, efficiency, and community.`,
    url: absoluteUrl("/story"),
    images: [{ url: absoluteUrl("/story/founder.jpg"), width: 400, height: 400, alt: SITE.founder }],
    type: "website",
  },
};

export default function StoryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      {/* Hero */}
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {SITE.name}
        </h1>
        <p className="mt-3 text-lg italic text-primary">
          &ldquo;{SITE.tagline}&rdquo;
        </p>
      </header>

      {/* Founder portrait */}
      <div className="mb-10 flex justify-center">
        <Image
          src="/story/founder.jpg"
          alt={`${SITE.founder}, founder of ${SITE.shortName}`}
          width={400}
          height={400}
          unoptimized
          loading="eager"
          className="rounded-full border-4 border-border object-cover shadow-lg"
        />
      </div>

      {/* Story body */}
      <section className="mb-14">
        <h2 className="mb-6 text-center font-heading text-3xl font-bold tracking-tight text-foreground">
          Our Story
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            {SITE.shortName} was founded by {SITE.founder}, who spent years in
            Bay Area restaurants before moving into design and construction.
            That background shaped everything about how this company works:
            schedules are treated as promises, communication is daily and
            written, and a clean jobsite is non-negotiable.
          </p>
          <p>
            What started as a commitment to doing right by homeowners and
            restaurant owners has grown into a licensed general contractor
            serving the {SITE.region} since {SITE.since}. We hold{" "}
            {SITE.license} and we&apos;re proud to be a{" "}
            {SITE.certification}.
          </p>
          <p>
            We believe construction should feel less like a gamble and more
            like a partnership. That means honest change orders, a single
            point of accountability, and a crew that treats your home, your
            business, and your neighbors with respect.
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "px-6")}
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold tracking-tight text-foreground">
          Our Values
        </h2>
        <div className="space-y-10">
          {VALUES.map((value) => (
            <div key={value.number} className="text-center">
              <p className="mb-2 font-heading text-2xl font-bold text-primary">
                {value.number}
              </p>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                {value.title}
              </h3>
              <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        heading="Let's build something good together"
        subheading="Whether it's a home renovation or a restaurant build-out, we'd love to hear about it."
        trackLocation="story-page-cta"
      />
    </div>
  );
}
