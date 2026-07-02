import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  SITE,
  SERVICES,
  absoluteUrl,
} from "@/lib/site-config";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Construction planning, construction management, and building maintenance for homes and restaurants across the California Bay Area.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services | ${SITE.shortName}`,
    description:
      "Construction planning, construction management, and building maintenance for homes and restaurants.",
    url: absoluteUrl("/services"),
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      {/* Hero */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          What we do
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Services
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {SITE.description}
        </p>
      </header>

      {/* Service tiles */}
      <section
        aria-label="Our services"
        className="grid gap-6 md:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <Image
              src={`/services/${service.slug}.svg`}
              alt={service.name}
              width={800}
              height={800}
              unoptimized
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary">
                {service.name}
              </h2>
              <p className="text-sm font-medium italic text-primary">
                {service.caption}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span className="mt-auto pt-3 text-sm font-medium text-primary">
                Learn more &rarr;
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Trust band */}
      <section className="mt-16 rounded-2xl border border-border bg-muted/40 p-8">
        <SectionHeading
          eyebrow="Why Red's RRC"
          title="One point of accountability, start to finish"
          description="We hold the license, the crew, and the schedule. You get one call, one contract, and one team that treats your opening date and your budget as promises."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <TrustPoint
            title="Licensed & insured"
            body={SITE.license}
          />
          <TrustPoint
            title="Clear communication"
            body="Written weekly recaps, priced change orders, and a project manager who picks up the phone."
          />
          <TrustPoint
            title="Built for the Bay Area"
            body={`Serving the ${SITE.region} since ${SITE.since}. We know the jurisdictions, the inspectors, and the quirks.`}
          />
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16">
        <CtaBand trackLocation="services-index-cta" />
      </div>
    </div>
  );
}

function TrustPoint({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center">
      <h3 className="font-heading font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
