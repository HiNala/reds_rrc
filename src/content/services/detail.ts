import type { FaqItem } from "@/components/site/faq";

/**
 * Long-form content for each service detail page, keyed by service slug.
 * The short name/caption/description live in `src/lib/site-config.ts`
 * (`SERVICES`); this module adds the page body, bullets, and FAQ.
 */

export type ServiceDetail = {
  slug: string;
  /** 2–3 sentence intro shown under the H1. */
  intro: string;
  /** What's included — rendered as a bulleted list. */
  includes: string[];
  /** Process steps — rendered as a numbered list. */
  process: { title: string; body: string }[];
  /** FAQ items for this service (also emitted as FAQPage JSON-LD). */
  faqs: FaqItem[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "construction-planning": {
    slug: "construction-planning",
    intro:
      "From first sketch to final permit, we map out scope, budget, and schedule up front so there are no surprises once work begins. Good planning is the cheapest insurance you can buy on a construction project.",
    includes: [
      "Feasibility walkthrough and site assessment",
      "Conceptual budget and milestone schedule",
      "Architectural and MEP engineering coordination",
      "Permit strategy and jurisdiction-specific plan review",
      "Fixed-price bid package with line-item scope",
      "Risk register for the most common budget surprises",
    ],
    process: [
      {
        title: "Walkthrough & feasibility",
        body: "We visit the site, listen to your goals, and flag structural, plumbing, electrical, and life-safety concerns before you commit.",
      },
      {
        title: "Design & engineering",
        body: "We coordinate architectural drawings, kitchen or layout design, and stamped MEP engineering so the plans are ready to permit.",
      },
      {
        title: "Permit strategy",
        body: "We map the permits your project needs, sequence the submissions, and prepare a complete first submittal to avoid resubmittal cycles.",
      },
      {
        title: "Fixed-price bid",
        body: "You get a line-item scope and a fixed price — not a guess — so you can decide with the full picture in front of you.",
      },
    ],
    faqs: [
      {
        question: "When should I start construction planning?",
        answer:
          "The moment you have a space or a serious project in mind. Planning before a lease is signed or before demo starts is the single biggest lever for protecting your budget and your timeline.",
      },
      {
        question: "Do you handle permits as part of planning?",
        answer:
          "Yes. We identify the permits your project needs, prepare the submittal package, and coordinate with the city and health department so plans are reviewed as quickly as possible.",
      },
      {
        question: "Is the planning phase a separate cost?",
        answer:
          "Pre-construction planning is typically scoped as a defined phase with its own fee, which is often credited toward the construction contract when you proceed with us. We'll be specific in writing.",
      },
    ],
  },

  "construction-management": {
    slug: "construction-management",
    intro:
      "Daily on-site oversight, clear weekly recaps, and a crew that keeps your project on budget and on schedule from groundbreak to walkthrough. You get one point of accountability — not a chain of subcontractors pointing at each other.",
    includes: [
      "Licensed on-site project manager",
      "Trade coordination and scheduling",
      "Permit and inspection scheduling",
      "Weekly written progress recaps with photos",
      "Change-order management with written pricing",
      "Punch-list and close-out walkthrough",
    ],
    process: [
      {
        title: "Mobilization",
        body: "We set up the site, confirm the schedule with trades, and hold a pre-construction meeting so everyone knows the plan.",
      },
      {
        title: "Weekly cadence",
        body: "You get a written recap each week: what happened, what's next, and any decisions we need from you. No surprises, no chasing.",
      },
      {
        title: "Change orders",
        body: "When field conditions differ from plans, we price the change in writing before the work proceeds — you approve before we spend.",
      },
      {
        title: "Close-out",
        body: "We walk the project with you, build a punch list, complete it, and hand over a clean space and the final documentation.",
      },
    ],
    faqs: [
      {
        question: "How often will I get updates during construction?",
        answer:
          "You'll receive a written recap every week with progress photos and a look-ahead. Your project manager is reachable between recaps for anything urgent.",
      },
      {
        question: "How do you handle change orders?",
        answer:
          "Every change is priced in writing before the work proceeds. You approve the scope and the cost before we spend a dollar — no verbal agreements, no surprise invoices.",
      },
      {
        question: "Do you manage subcontractors or do I hire them?",
        answer:
          "We manage all trades under our contract. You have a single point of accountability — us — and we coordinate every trade on your project.",
      },
    ],
  },

  "building-maintenance": {
    slug: "building-maintenance",
    intro:
      "Ongoing upkeep and repairs for homes and restaurants, scheduled around your business and family so life never has to stop for us. Small problems fixed early are the cheapest problems you'll ever pay for.",
    includes: [
      "Preventive maintenance schedule tailored to your property",
      "Drywall, framing, and trim repair",
      "Door, window, and hardware service",
      "Painting and finish touch-ups",
      "Restaurant equipment-area upkeep and finishes",
      "Emergency call-out for active issues",
    ],
    process: [
      {
        title: "Property assessment",
        body: "We walk the property, document conditions, and build a maintenance plan that prioritizes safety, longevity, and cost.",
      },
      {
        title: "Scheduled upkeep",
        body: "We return on a schedule that fits your life or business hours, handling the planned list efficiently each visit.",
      },
      {
        title: "Issue reporting",
        body: "When we spot something developing — a slow leak, a hairline crack — we tell you early, before it becomes a project.",
      },
      {
        title: "Emergency response",
        body: "For active issues, we take your call and get someone out fast to stop the damage and stabilize the situation.",
      },
    ],
    faqs: [
      {
        question: "Do you offer maintenance contracts or one-off calls?",
        answer:
          "Both. We offer scheduled maintenance plans for properties that want regular upkeep, and one-off service calls for specific issues. We'll recommend the right fit for your property.",
      },
      {
        question: "Can you work around my restaurant's operating hours?",
        answer:
          "Yes. We schedule maintenance around your business hours — nights, early mornings, or off-days — so your doors stay open and your guests never notice.",
      },
      {
        question: "What's the difference between maintenance and a renovation?",
        answer:
          "Maintenance keeps what you have in good working order. Renovation changes or upgrades it. If a maintenance visit reveals something that needs a larger fix, we'll scope it separately — no surprise upselling.",
      },
    ],
  },
};

/** All service slugs — for generateStaticParams. */
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDetails);
}

/** Get a service detail by slug. */
export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
