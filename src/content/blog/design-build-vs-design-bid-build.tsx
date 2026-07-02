import type { PostMeta } from "./types";
import { H2, H3, P, UL, LI, Strong, Lead, Callout } from "@/components/blog/prose";

export const meta: PostMeta = {
  slug: "design-build-vs-design-bid-build",
  title: "Design-Build vs. Design-Bid-Build: Which Delivery Method Fits Your Project?",
  description:
    "The two most common project delivery methods compared — how they work, where they save time and money, and how to choose the right one for your renovation or build.",
  tags: ["project delivery", "design-build", "construction", "residential", "restaurant"],
  publishedAt: "2026-04-23",
  author: "Red's RRC Team",
  readingMinutes: 6,
  image: "/blog/design-build-vs-design-bid-build.svg",
  faqs: [
    {
      question: "What is the difference between design-build and design-bid-build?",
      answer:
        "In design-build, one team handles both design and construction under a single contract. In design-bid-build, an architect designs the project, contractors bid on the completed plans, and you hold separate contracts with each.",
    },
    {
      question: "Is design-build cheaper than design-bid-build?",
      answer:
        "Design-build often saves time and reduces cost growth because design and construction are coordinated by one team. Design-bid-build can yield a lower initial bid through competition, but total cost is more exposed to change orders once construction begins.",
    },
    {
      question: "When should I choose design-bid-build?",
      answer:
        "Design-bid-build suits projects where you want a fully detailed design before pricing, need competitive bids from multiple contractors, or already have an architect you trust and want to keep design independent from construction.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <Lead>
        Before a single wall comes down, every project makes one decision that
        shapes everything after it: how the work will be delivered. The two most
        common methods — design-build and design-bid-build — each have a sweet
        spot. Picking the right one is the first real cost decision you make.
      </Lead>

      <H2>Design-bid-build: the traditional path</H2>
      <P>
        In design-bid-build, you hire an architect to design the project and
        produce a complete set of plans. You then take those plans to multiple
        contractors for competitive bids, award the job to one, and hold separate
        contracts with the architect and the contractor.
      </P>
      <H3>Where it shines</H3>
      <UL>
        <LI>When you want a fully detailed design before any pricing</LI>
        <LI>When competitive bidding across several contractors is important</LI>
        <LI>When you want design kept independent from construction</LI>
        <LI>For public projects that legally require competitive bidding</LI>
      </UL>
      <H3>The trade-offs</H3>
      <UL>
        <LI>Longer overall timeline — design must finish before bidding starts</LI>
        <LI>Two separate contracts mean two separate points of accountability</LI>
        <LI>When plans and field conditions diverge, change orders follow — and the architect and contractor can end up pointing at each other</LI>
      </UL>

      <H2>Design-build: the integrated path</H2>
      <P>
        In design-build, a single team — usually led by the contractor — handles
        both design and construction under one contract. You have one point of
        accountability from concept to completion.
      </P>
      <H3>Where it shines</H3>
      <UL>
        <LI>Faster overall timeline — design and construction sequencing overlap</LI>
        <LI>One point of accountability — no architect/contractor finger-pointing</LI>
        <LI>Cost is addressed during design, not after, so the design stays within budget</LI>
        <LI>Constructability input early, when it can still shape the design</LI>
      </UL>
      <H3>The trade-offs</H3>
      <UL>
        <LI>Less competitive price pressure than open bidding</LI>
        <LI>You need to trust the design-build team&apos;s design judgment, not just their building skill</LI>
        <LI>Less inherent design independence — pick a team whose aesthetic you respect</LI>
      </UL>

      <Callout title="Key takeaway">
        Design-build trades competitive price pressure for speed and single-point
        accountability. Design-bid-build trades time for price competition and
        design independence. Choose by what your project can least afford to lose.
      </Callout>

      <H2>How to choose</H2>
      <P>
        The right method depends on which constraint is tightest for you:
      </P>
      <UL>
        <LI>
          <Strong>If time is the tightest constraint</Strong> — design-build. Overlapping design and construction can shave months.
        </LI>
        <LI>
          <Strong>If budget certainty is the tightest constraint</Strong> — design-build, with pricing developed during design, not after.
        </LI>
        <LI>
          <Strong>If you need competitive price pressure</Strong> — design-bid-build, with a complete bid set sent to several contractors.
        </LI>
        <LI>
          <Strong>If you already have an architect you trust</Strong> — design-bid-build keeps that relationship intact.
        </LI>
        <LI>
          <Strong>If the project is complex and coordination-heavy</Strong> (like a restaurant build-out) — design-build&apos;s single accountability usually wins.
        </LI>
      </UL>

      <H2>What &quot;single point of accountability&quot; really means</H2>
      <P>
        The biggest hidden cost in design-bid-build isn&apos;t the bid — it&apos;s
        the change orders that arrive when field conditions don&apos;t match the
        plans, and the disputes over who pays. In design-build, the same team that
        designed it builds it, so the incentive is to design something that builds
        cleanly. That alignment is the real value, and it shows up in fewer
        surprises and a calmer project.
      </P>

      <H2>The bottom line</H2>
      <P>
        Neither delivery method is universally better. Design-build favors speed,
        budget certainty, and accountability — ideal for complex, time-sensitive
        projects like restaurant build-outs and whole-home renovations.
        Design-bid-build favors price competition and design independence — ideal
        when you have time, trust an architect, and want several contractors to
        compete. Match the method to your tightest constraint, and the rest of the
        project gets easier.
      </P>
    </>
  );
}
