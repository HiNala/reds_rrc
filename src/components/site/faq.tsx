import { FaqJsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

/**
 * Accessible FAQ section using native <details>/<summary> (no JS, no deps),
 * paired with FAQPage JSON-LD for rich results. Use on any page that needs
 * an FAQ block with structured data.
 */
export function FaqSection({
  title = "Frequently asked questions",
  items,
  className,
}: {
  title?: string;
  items: FaqItem[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className={cn("mx-auto w-full max-w-3xl", className)} aria-label={title}>
      <FaqJsonLd faqs={items} />
      <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <dl className="divide-y divide-border rounded-xl border border-border bg-card">
        {items.map((item) => (
          <details key={item.question} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold text-foreground marker:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </details>
        ))}
      </dl>
    </section>
  );
}
