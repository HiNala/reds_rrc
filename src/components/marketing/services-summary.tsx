import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SERVICES } from "@/lib/site-config";

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
        {SERVICES.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.08}>
            <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={`/services/${service.slug}.jpg`}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  unoptimized
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs font-medium uppercase tracking-wide opacity-90">
                    {service.caption}
                  </p>
                  <CardTitle className="mt-1 text-lg">{service.name}</CardTitle>
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col p-5">
                <p className="flex-1 text-sm text-muted-foreground">{service.description}</p>
                <Button variant="link" className="mt-4 h-auto justify-start px-0" nativeButton={false} render={<Link href={`/services/${service.slug}`} />}>
                  Learn more <ArrowRight className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
