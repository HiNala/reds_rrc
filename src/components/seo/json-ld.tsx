import { siteConfig, absoluteUrl, SITE, SERVICES, TESTIMONIALS } from "@/lib/site-config";

/**
 * Renders a JSON-LD <script> tag for structured data.
 *
 * Uses a native <script> tag (not next/script) per the Next.js JSON-LD
 * guide: JSON-LD is structured data, not executable code. The payload is
 * HTML-escaped to prevent XSS injection (`<` -> `\u003c`).
 *
 * @see node_modules/next/dist/docs/01-app/02-guides/json-ld.md
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** LocalBusiness / GeneralContractor structured data for the root layout. */
export function LocalBusinessJsonLd() {
  const hasAddress = Boolean(
    siteConfig.streetAddress &&
      siteConfig.addressLocality &&
      siteConfig.addressRegion,
  );

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    image: absoluteUrl("/hero/hero-1.png"),
    logo: absoluteUrl(siteConfig.logoPath),
    priceRange: "$$",
    areaServed: siteConfig.areaServed,
    foundingDate: "2012",
    founder: { "@type": "Person", name: "Devin Aloise" },
    knowsAbout: [
      "residential construction",
      "restaurant construction",
      "kitchen and bath remodeling",
      "deck construction",
      "building maintenance",
      "construction planning",
      "construction management",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(TESTIMONIALS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };

  if (siteConfig.phone) data.telephone = siteConfig.phone;
  if (siteConfig.sameAs.length) data.sameAs = siteConfig.sameAs;

  if (hasAddress) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.addressCountry,
    };
  }

  return <JsonLd data={data} />;
}

/** Organization structured data (complements LocalBusiness for Google Knowledge Panel). */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logoPath),
        email: siteConfig.email,
        founder: { "@type": "Person", name: SITE.founder },
        foundingDate: String(SITE.since),
        sameAs: siteConfig.sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: SITE.phone,
          email: SITE.email,
          areaServed: SITE.region,
          availableLanguage: ["English"],
        },
      }}
    />
  );
}

/** WebSite structured data (enables sitelinks search box etc.). */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

/** Article structured data for a blog post. */
export function ArticleJsonLd({
  slug,
  title,
  description,
  image,
  publishedAt,
  author,
  tags,
}: {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${absoluteUrl(`/blog/${slug}`)}#article`,
        headline: title,
        description,
        image: [image],
        datePublished: publishedAt,
        dateModified: publishedAt,
        author: {
          "@type": "Organization",
          name: author ?? siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": absoluteUrl(`/blog/${slug}`),
        },
        keywords: tags?.join(", "),
      }}
    />
  );
}

/** BreadcrumbList structured data. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

/** FAQPage structured data from a list of Q&A pairs. */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

/** Service structured data for individual service detail pages. */
export function ServiceJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${absoluteUrl(`/services/${slug}`)}#service`,
        name,
        description,
        url: absoluteUrl(`/services/${slug}`),
        provider: {
          "@type": "GeneralContractor",
          name: siteConfig.name,
          url: siteConfig.url,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: siteConfig.areaServed,
        },
        areaServed: siteConfig.areaServed,
        serviceType: "Construction",
      }}
    />
  );
}
