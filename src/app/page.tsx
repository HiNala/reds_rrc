import type { Metadata } from "next";

import { Hero } from "@/components/marketing/hero";
import { TrustBar } from "@/components/marketing/trust-bar";
import { ServicesSummary } from "@/components/marketing/services-summary";
import { ProjectShowcase } from "@/components/marketing/project-showcase";
import { ValuesSection } from "@/components/marketing/values-section";
import { Testimonials } from "@/components/marketing/testimonials";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Home",
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.shortName} — Bay Area General Contractor`,
    description: SITE.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSummary />
      <ProjectShowcase />
      <ValuesSection />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
