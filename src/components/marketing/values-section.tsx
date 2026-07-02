import { Reveal } from "@/components/motion/reveal";
import { VALUES } from "@/lib/site-config";

export function ValuesSection() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Why clients keep calling us back
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three principles guide every project, big or small.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {VALUES.map((value, i) => (
            <Reveal key={value.number} delay={i * 0.08} className="text-center sm:text-left">
              <span className="font-heading text-4xl font-bold text-primary/30">{value.number}</span>
              <h3 className="mt-2 font-heading text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
