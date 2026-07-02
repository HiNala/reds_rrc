import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SITE,
  SERVICES,
  absoluteUrl,
} from "@/lib/site-config";
import {
  getAllServiceSlugs,
  getServiceDetail,
} from "@/content/services/detail";
import { FaqSection } from "@/components/site/faq";
import { CtaBand } from "@/components/site/cta-band";
import {
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

/** Prerender every service page at build time. */
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) return { title: "Service not found" };

  const title = `${service.name} | ${SITE.shortName}`;
  const url = absoluteUrl(`/services/${slug}`);
  const image = absoluteUrl(`/services/${slug}.jpg`);

  return {
    title,
    description: detail.intro,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title,
      description: detail.intro,
      url,
      images: [{ url: image, width: 800, height: 800, alt: service.name }],
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${slug}` },
        ]}
      />
      <LocalBusinessJsonLd />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{service.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          {service.caption}
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {service.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {detail.intro}
        </p>
      </header>

      {/* Hero image */}
      <Image
        src={`/services/${slug}.jpg`}
        alt={service.name}
        width={800}
        height={800}
        unoptimized
        loading="eager"
        className="mb-12 aspect-[16/9] w-full rounded-xl object-cover shadow-lg"
      />

      {/* What's included */}
      <section className="mb-12">
        <h2 className="mb-5 font-heading text-2xl font-bold text-foreground">
          What&apos;s included
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {detail.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
            >
              <span aria-hidden className="mt-0.5 text-primary">&#10003;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="mb-12">
        <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
          How it works
        </h2>
        <ol className="space-y-6">
          {detail.process.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <div className="mb-12">
        <FaqSection items={detail.faqs} />
      </div>

      {/* CTA */}
      <CtaBand
        heading={`Ready to talk about ${service.name.toLowerCase()}?`}
        subheading="Tell us about your project and we'll come back with a clear, honest path forward."
        trackLocation={`service-detail-cta-${slug}`}
      />

      {/* Back link */}
      <div className="mt-10 text-center">
        <Link
          href="/services"
          className={cn(buttonVariants({ variant: "outline" }), "px-5")}
        >
          &larr; All services
        </Link>
      </div>
    </div>
  );
}
