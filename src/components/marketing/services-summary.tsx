import Link from "next/link";
import { ClipboardList, HardHat, Wrench, ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SERVICES } from "@/lib/site-config";

const ICONS = {
  "construction-planning": ClipboardList,
  "construction-management": HardHat,
  "building-maintenance": Wrench,
} as const;

export function ServicesSummary() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          One team, every stage of the build
        </h2>
        <p className="mt-4 text-muted-foreground">
          From the first sketch to the final walkthrough — and every maintenance
          call after — Red&apos;s RRC keeps your project moving.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.slug as keyof typeof ICONS];
          return (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-3 text-lg">{service.name}</CardTitle>
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">
                    {service.caption}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">{service.description}</p>
                  <Button variant="link" className="mt-4 h-auto justify-start px-0" render={<Link href="/services" />}>
                    Learn more <ArrowRight className="size-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
