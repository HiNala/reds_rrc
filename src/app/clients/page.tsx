import type { Metadata } from "next";

import { SITE, TESTIMONIALS, absoluteUrl } from "@/lib/site-config";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectGallery } from "@/components/site/project-gallery";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";
import { STATIC_PROJECTS } from "@/lib/static-projects";
import type { ProjectWithImages } from "@/lib/projects-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Clients",
  description: `What ${SITE.shortName} clients say — and the projects we've built together. Transparent communication, on-time delivery, and craftsmanship you can trust.`,
  alternates: { canonical: "/clients" },
  openGraph: {
    title: `Our Clients | ${SITE.shortName}`,
    description: `What ${SITE.shortName} clients say — and the projects we've built together.`,
    url: absoluteUrl("/clients"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Clients | ${SITE.shortName}`,
    description: `What ${SITE.shortName} clients say — and the projects we've built together.`,
  },
};

export default async function ClientsPage() {
  // Use the static project gallery with original site photos from /public/gallery/.
  // This ensures the page always looks professional and loads reliably
  // without depending on MinIO/S3 availability.
  // DB projects are still manageable via the admin dashboard.
  const projects = STATIC_PROJECTS as unknown as ProjectWithImages[];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      {/* Hero */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Our Clients
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We treat every client&apos;s home, family, belongings, and pets with
          the same care we&apos;d give our own. The relationships we build
          outlast the projects we build — and that&apos;s the point.
        </p>
      </header>

      {/* Testimonials */}
      <section aria-label="Client testimonials" className="mb-20">
        <SectionHeading
          eyebrow="In their words"
          title="What clients say"
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name + t.quote.slice(0, 20)}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary"
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="font-semibold text-foreground">{t.name}</span>
                  {"location" in t && t.location && (
                    <>
                      {" "}
                      <span className="text-muted-foreground">&middot; {t.location}</span>
                    </>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Project gallery */}
      <section aria-label="Project gallery" className="mb-16">
        <SectionHeading
          eyebrow="Our work"
          title="Projects we're proud of"
          description="A showcase of the homes and restaurants we've had the privilege of building and renovating. Click any project to see more photos."
          className="mb-10"
        />
        <ProjectGallery projects={projects} />
      </section>

      {/* CTA */}
      <CtaBand
        heading="Join our happy clients"
        subheading="Tell us about your project and we'll show you why our clients recommend us to friends and family."
        trackLocation="clients-page-cta"
      />
    </div>
  );
}
