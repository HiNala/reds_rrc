import type { PostMeta } from "./types";
import { H2, H3, P, UL, LI, Strong, Lead, Callout, OL } from "@/components/blog/prose";

export const meta: PostMeta = {
  slug: "permits-inspections-restaurant-construction",
  title: "Navigating Permits and Inspections for Restaurant Construction",
  description:
    "Permits and inspections are the most underestimated part of opening a restaurant. Here is what to expect, in what order, and how to keep them from delaying your opening.",
  tags: ["restaurant construction", "permits", "inspections", "compliance"],
  publishedAt: "2026-05-07",
  author: "Red's RRC Team",
  readingMinutes: 7,
  image: "/blog/permits-inspections-restaurant-construction.svg",
  faqs: [
    {
      question: "What permits are required to build a restaurant?",
      answer:
        "Most restaurants need a building permit plus mechanical, electrical, and plumbing permits, a health department plan review and permit, a fire-suppression (hood) permit, and a certificate of occupancy before opening. Requirements vary by jurisdiction.",
    },
    {
      question: "How long does restaurant permitting take?",
      answer:
        "Plan review and permitting typically take 4–8 weeks, but busy jurisdictions and complex kitchens can push it longer. Submit complete, code-compliant plans the first time to avoid resubmittal cycles.",
    },
    {
      question: "What happens if I skip a required inspection?",
      answer:
        "Skipping or failing an inspection can mean stop-work orders, fines, and having to open walls to expose covered work. Schedule inspections at each milestone before covering any rough-in.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <Lead>
        Permits and inspections are where restaurant openings live or die. They
        are not paperwork — they are the schedule. Treat them that way and your
        opening date stays real.
      </Lead>

      <P>
        This guide explains the permits a restaurant build-out typically needs, the
        inspection sequence, and the practical moves that keep the process moving
        instead of stalling.
      </P>

      <H2>Why permitting is the long pole</H2>
      <P>
        Construction can be expedited; permitting can&apos;t always be. Plan review
        queues run on the city&apos;s calendar, not yours. The single most common
        reason a restaurant opens late is a permitting delay that pushed
        construction start, which pushed every milestone after it.
      </P>
      <P>
        The fix isn&apos;t speed — it&apos;s <Strong>completeness and
        sequencing</Strong>. A complete, code-compliant first submittal avoids
        resubmittal cycles that can add weeks.
      </P>

      <Callout title="Key takeaway">
        Submit complete plans the first time. The biggest permitting delays come
        from incomplete submittals and resubmittal cycles, not from the review
        itself.
      </Callout>

      <H2>The permits you will likely need</H2>
      <P>
        Exact requirements vary by city and county, but a restaurant build-out
        almost always requires most of the following:
      </P>
      <UL>
        <LI><Strong>Building permit</Strong> — covers structural and tenant-improvement work</LI>
        <LI><Strong>Mechanical permit</Strong> — HVAC and make-up air for the kitchen hood</LI>
        <LI><Strong>Electrical permit</Strong> — service upgrades and kitchen equipment circuits</LI>
        <LI><Strong>Plumbing permit</Strong> — water, waste, grease trap, and fixture rough-in</LI>
        <LI><Strong>Health department plan review &amp; permit</Strong> — often the strictest reviewer</LI>
        <LI><Strong>Fire suppression permit</Strong> — hood and Ansul system</LI>
        <LI><Strong>Sign permit</Strong> — if you have exterior or illuminated signage</LI>
        <LI><Strong>Certificate of occupancy</Strong> — issued after final inspections, your green light to open</LI>
      </UL>

      <H2>The inspection sequence</H2>
      <P>
        Inspections happen in a fixed order, and each one must pass before the next
        layer of work is covered. Skipping an inspection and closing up a wall is
        one of the most expensive mistakes in construction — you may have to open
        it back up.
      </P>
      <OL>
        <LI><Strong>Foundation / slab</Strong> (if new or modified)</LI>
        <LI><Strong>Framing &amp; rough inspection</Strong> — structural, before insulation and drywall</LI>
        <LI><Strong>Mechanical, electrical, plumbing rough-in</Strong> — before walls close</LI>
        <LI><Strong>Fire suppression (hood) rough-in</Strong></LI>
        <LI><Strong>Insulation</Strong></LI>
        <LI><Strong>Drywall / close-in</Strong></LI>
        <LI><Strong>Final MEP</Strong> — electrical, plumbing, mechanical finals</LI>
        <LI><Strong>Final fire / health</Strong> — fire marshal and health department finals</LI>
        <LI><Strong>Certificate of occupancy</Strong></LI>
      </OL>

      <H3>Schedule inspections before you cover work</H3>
      <P>
        Most jurisdictions require 24–48 hours notice for an inspection. Build that
        lead time into your schedule, and never cover rough-in work before the
        inspector signs off.
      </P>

      <H2>The health department is its own review</H2>
      <P>
        The health department often reviews plans separately from the building
        department, and its requirements drive kitchen layout:
      </P>
      <UL>
        <LI>Floor slope toward floor drains with coved corners</LI>
        <LI>Handwash sinks in each prep area, within reach</LI>
        <LI>Separate prep sinks for produce and animal proteins</LI>
        <LI>Grease trap sizing and access</LI>
        <LI>Smooth, cleanable, non-porous surfaces</LI>
        <LI>Designated warewashing three-compartment sink</LI>
      </UL>
      <P>
        Design for these from the first drawing. Retrofitting them after framing is
        up is where budgets break.
      </P>

      <H2>Practical moves that keep permitting on track</H2>
      <UL>
        <LI><Strong>Use a contractor who knows your jurisdiction.</Strong> Familiarity with local reviewers and quirks is worth real time.</LI>
        <LI><Strong>Submit a complete package.</Strong> Stamped engineering, MEP plans, hood design, and health forms in one submittal.</LI>
        <LI><Strong>Track each permit separately.</Strong> Building, health, and fire reviews run in parallel, not in series — manage each.</LI>
        <LI><Strong>Respond to corrections the same week.</Strong> Resubmittal speed is the one lever you fully control.</LI>
        <LI><Strong>Don&apos;t schedule trades ahead of inspections.</Strong> A failed inspection with drywall already hung is a disaster.</LI>
      </UL>

      <H2>The bottom line</H2>
      <P>
        Permits and inspections are not a hurdle to clear — they&apos;re the spine
        of your schedule. Submit complete plans, sequence inspections correctly,
        never cover un-inspected work, and treat the health department as a design
        partner from day one. Do that and permitting stops being the thing that
        delays your opening, and starts being the thing that confirms you&apos;re
        ready for it.
      </P>
    </>
  );
}
