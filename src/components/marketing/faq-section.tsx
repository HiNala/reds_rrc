import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site-config";

export const FAQ_ITEMS = [
  {
    question: "What areas do you serve?",
    answer: `We build and maintain homes and restaurants across the ${SITE.region}.`,
  },
  {
    question: "Are you licensed and insured?",
    answer: `Yes — Red's RRC is a ${SITE.license}, and we're a ${SITE.certification}.`,
  },
  {
    question: "How does the quote process work?",
    answer:
      "Tell us about your project through our quote form or a quick call. We'll follow up within one business day, often with an in-person visit, and provide a clear scope, schedule, and budget before any work begins.",
  },
  {
    question: "How do you keep projects on schedule and on budget?",
    answer:
      "Every project gets a written schedule and budget up front, daily or weekly recaps while work is underway, and transparent communication about any change orders — no surprises.",
  },
  {
    question: "Do you work around my family, pets, or business hours?",
    answer:
      "Always. We coordinate scheduling around your household or restaurant's hours, keep job sites clean daily, and are considerate of neighbors, pets, and kids on-site.",
  },
] as const;

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <Accordion className="rounded-xl border border-border bg-card px-5">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
