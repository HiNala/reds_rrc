import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { TESTIMONIALS } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          What clients say
        </h2>
        <p className="mt-4 text-muted-foreground">
          Real feedback from the families and business owners we&apos;ve built for.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TESTIMONIALS.map((testimonial, i) => (
          <Reveal key={testimonial.name} delay={i * 0.06}>
            <Card className="h-full">
              <CardContent>
                <Quote className="size-6 text-primary/40" />
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary"
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                    {"location" in testimonial && testimonial.location && (
                      <span className="font-normal text-muted-foreground"> · {testimonial.location}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
