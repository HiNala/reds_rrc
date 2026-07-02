import type { PostMeta } from "./types";
import { H2, H3, P, UL, LI, Strong, Lead, Callout, OL } from "@/components/blog/prose";

export const meta: PostMeta = {
  slug: "restaurant-build-out-101",
  title: "Restaurant Build-Out 101: What Owners Should Expect",
  description:
    "A practical walkthrough of the restaurant build-out process — phases, timelines, permits, and how to choose a contractor who keeps your opening date on track.",
  tags: ["restaurant construction", "build-out", "general contractor", "permits"],
  publishedAt: "2026-06-18",
  author: "Red's RRC Team",
  readingMinutes: 8,
  image: "/blog/restaurant-build-out-101.svg",
  faqs: [
    {
      question: "How long does a restaurant build-out take?",
      answer:
        "A typical restaurant build-out runs 8–16 weeks after permits are approved, depending on scope, kitchen complexity, and inspections. Factor in 4–8 additional weeks for design, permitting, and bidding before construction starts.",
    },
    {
      question: "Do I need a general contractor for a restaurant build-out?",
      answer:
        "Yes. A licensed general contractor coordinates trades, pulls permits, schedules inspections, and holds a single point of accountability — which protects your budget and your opening date.",
    },
    {
      question: "What surprises restaurant budgets the most?",
      answer:
        "Grease trap and hood requirements, ADA restroom layout, electrical upgrades for kitchen equipment, and life-safety (fire suppression) work are the most common budget surprises. A pre-construction walkthrough surfaces these early.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <Lead>
        Opening a restaurant is equal parts dream and logistics. The build-out is
        where those two collide — and where a clear plan, the right contractor, and
        an honest timeline make the difference between a calm opening and a
        stressful one.
      </Lead>

      <P>
        This guide walks through what to expect during a restaurant build-out, from
        the first walkthrough to the final inspection, so you can plan your budget
        and your calendar with confidence.
      </P>

      <H2>The five phases of a restaurant build-out</H2>
      <P>
        Most build-outs follow the same five-phase rhythm. Knowing where you are in
        the sequence helps you anticipate decisions instead of reacting to them.
      </P>

      <OL>
        <LI>
          <Strong>Pre-construction &amp; feasibility.</Strong> A contractor walks
          the space, reviews your concept and equipment list, and flags structural,
          plumbing, electrical, and life-safety concerns before you sign a lease.
        </LI>
        <LI>
          <Strong>Design &amp; engineering.</Strong> Architectural drawings,
          kitchen layout, MEP (mechanical, electrical, plumbing) engineering, and
          hood/grease-trap design are finalized and stamped.
        </LI>
        <LI>
          <Strong>Permitting.</Strong> Plans are submitted to the city and health
          department. This is the most unpredictable phase — plan for it, don&apos;t
          shortcut it.
        </LI>
        <LI>
          <Strong>Construction.</Strong> Demolition, framing, rough-in of MEP,
          drywall, finishes, and equipment installation.
        </LI>
        <LI>
          <Strong>Inspections &amp; occupancy.</Strong> Final electrical,
          plumbing, health, and fire inspections lead to a certificate of
          occupancy — your green light to open.
        </LI>
      </OL>

      <H2>A realistic timeline</H2>
      <P>
        Restaurant owners consistently underestimate how long the front end takes.
        Here is a realistic range for a 2,000–3,000 sq ft build-out:
      </P>
      <UL>
        <LI>Pre-construction &amp; feasibility: 1–2 weeks</LI>
        <LI>Design &amp; engineering: 4–8 weeks</LI>
        <LI>Permitting: 4–8 weeks (longer in busy jurisdictions)</LI>
        <LI>Construction: 8–16 weeks</LI>
        <LI>Inspections &amp; occupancy: 1–3 weeks</LI>
      </UL>
      <P>
        That&apos;s roughly <Strong>5–9 months end to end</Strong>. The single
        biggest lever you control is starting design before the clock is ticking on
        rent.
      </P>

      <Callout title="Key takeaway">
        Begin design and permitting the moment you have a letter of intent on a
        space. Waiting until the lease is signed can push your opening back by a
        full month or more.
      </Callout>

      <H2>Permits you will likely need</H2>
      <P>
        Permit requirements vary by city and county, but a restaurant almost always
        needs most of the following:
      </P>
      <UL>
        <LI>Building permit (for structural and tenant-improvement work)</LI>
        <LI>Mechanical, electrical, and plumbing permits</LI>
        <LI>Health department plan review and permit</LI>
        <LI>Fire suppression (hood) permit and inspection</LI>
        <LI>Sign permit, if applicable</LI>
        <LI>Certificate of occupancy before opening to the public</LI>
      </UL>

      <H3>Why the health department review matters early</H3>
      <P>
        The health department often has the strictest requirements — floor slope
        toward drains, coved corners, handwash sink placement, separate veg/animal
        prep sinks. Designing for these from day one avoids costly rework after
        framing is already up.
      </P>

      <H2>Choosing a contractor for a restaurant build-out</H2>
      <P>
        Not every general contractor is built for restaurant work. Restaurant
        build-outs combine commercial code compliance, specialized kitchen
        equipment coordination, and a tight opening date. Look for:
      </P>
      <UL>
        <LI>
          <Strong>Restaurant experience.</Strong> Ask for two or three comparable
          restaurant projects and call the owners.
        </LI>
        <LI>
          <Strong>Licensed, bonded, and insured.</Strong> Verify the license number
          with your state board.
        </LI>
        <LI>
          <Strong>A fixed-price bid with a clear scope.</Strong> The lowest number
          is rarely the real number — compare scopes line by line.
        </LI>
        <LI>
          <Strong>A written schedule.</Strong> A contractor who can&apos;t give you
          a milestone schedule isn&apos;t managing your opening date.
        </LI>
        <LI>
          <Strong>Equipment coordination.</Strong> Confirm they&apos;ll coordinate
          delivery and hookup of your kitchen equipment, not leave it to you.
        </LI>
      </UL>

      <H2>Controlling your budget</H2>
      <P>
        Budget overruns in restaurant construction usually come from the same few
        places. A good contractor will walk you through each before you commit:
      </P>
      <UL>
        <LI>Hood installation and make-up air (often $15k–$40k+)</LI>
        <LI>Grease trap sizing and plumbing runs</LI>
        <LI>Electrical service upgrades for kitchen loads</LI>
        <LI>ADA-compliant restroom layout and path of travel</LI>
        <LI>Floor finishes rated for commercial kitchen use</LI>
      </UL>
      <P>
        Carry a <Strong>10–15% contingency</Strong> on top of your fixed-price bid.
        If you don&apos;t need it, you open with money in the bank. If you do,
        you&apos;re not scrambling.
      </P>

      <H2>The bottom line</H2>
      <P>
        A restaurant build-out is a series of decisions, each one a chance to
        protect or erode your opening date and your budget. The owners who open on
        time and on budget are the ones who treat pre-construction as seriously as
        construction — and who pick a contractor who treats the opening date as a
        promise, not a guess.
      </P>
    </>
  );
}
