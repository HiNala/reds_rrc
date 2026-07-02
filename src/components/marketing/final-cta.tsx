import { Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-accent">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl">
            Ready to build something you&apos;ll love coming home to?
          </h2>
          <p className="mt-4 max-w-md text-accent-foreground/80">
            Tell us a little about your project and we&apos;ll follow up within one
            business day with next steps — no pressure, just a clear plan.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-accent-foreground hover:underline"
          >
            <Phone className="size-5" /> {SITE.phone}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="bg-card/95">
            <CardContent>
              <ContactForm sourcePage="home_final_cta" />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
