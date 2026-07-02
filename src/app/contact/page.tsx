import type { Metadata } from "next";
import { Mail, Phone, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactForm } from "@/components/forms/contact-form";
import { MultiStepQuoteForm } from "@/components/forms/multi-step-quote-form";
import { Reveal } from "@/components/motion/reveal";
import { SITE, TRUST_BADGES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Send a quick message or request a detailed quote from Red's Residential & Restaurant Construction — we typically respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Get a Free Quote | ${SITE.shortName}`,
    description:
      "Send a quick message or request a detailed quote — we typically respond within one business day.",
    url: `${SITE.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Get a Free Quote | ${SITE.shortName}`,
    description:
      "Send a quick message or request a detailed quote — we typically respond within one business day.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            Get in touch
          </span>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk about your project
          </h1>
          <p className="mt-4 text-muted-foreground">
            Send a quick message for a fast response, or walk through a short
            quote form if you already know the scope. Either way, a member of
            the {SITE.shortName} team will follow up within one business day.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <a href={SITE.phoneHref} className="flex items-center gap-2 font-medium hover:text-primary">
              <Phone className="size-4 text-primary" /> {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="flex items-center gap-2 font-medium hover:text-primary">
              <Mail className="size-4 text-primary" /> {SITE.email}
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            {TRUST_BADGES.map((badge) => (
              <li key={badge} className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> {badge}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="shadow-lg ring-1 ring-primary/5">
            <CardContent className="p-6 sm:p-8">
              <Tabs defaultValue="quick">
                <TabsList className="mb-8 w-full">
                  <TabsTrigger value="quick" className="flex-1">
                    Quick message
                  </TabsTrigger>
                  <TabsTrigger value="quote" className="flex-1">
                    Detailed quote
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="quick">
                  <ContactForm sourcePage="contact" />
                </TabsContent>
                <TabsContent value="quote">
                  <MultiStepQuoteForm sourcePage="contact" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
