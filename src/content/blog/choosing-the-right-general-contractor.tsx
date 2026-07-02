import type { PostMeta } from "./types";
import { H2, H3, P, UL, LI, Strong, Lead, Callout } from "@/components/blog/prose";

export const meta: PostMeta = {
  slug: "choosing-the-right-general-contractor",
  title: "Choosing the Right General Contractor: A Trust-Based Checklist",
  description:
    "How to evaluate a general contractor before you sign — the questions to ask, the proof to require, and the red flags that save you from a costly mistake.",
  tags: ["general contractor", "hiring", "residential construction", "trust"],
  publishedAt: "2026-05-21",
  author: "Red's RRC Team",
  readingMinutes: 6,
  image: "/blog/choosing-the-right-general-contractor.svg",
  faqs: [
    {
      question: "What should I ask a general contractor before hiring?",
      answer:
        "Ask for their license number and proof of insurance, three comparable recent projects with owner references, a written schedule, and a fixed-price bid with a line-item scope. Then call the references.",
    },
    {
      question: "How much should a contractor deposit be?",
      answer:
        "A typical deposit is 10–25% of the project price, enough to cover materials and mobilization. Be cautious of contractors who demand most of the money upfront; never pay the full balance before work is complete and inspected.",
    },
    {
      question: "What is the biggest red flag when hiring a contractor?",
      answer:
        "Pressure to start immediately, no written contract, cash-only payment requests, and reluctance to provide references or proof of insurance are all red flags. A trustworthy contractor welcomes verification.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <Lead>
        The contractor you choose will be in your home or business for weeks or
        months, spending your money and shaping your daily life. Picking the right
        one is the single most important decision in any renovation or build.
      </Lead>

      <P>
        Here is a practical, trust-based checklist for evaluating a general
        contractor — the questions to ask, the proof to require, and the red flags
        that should end the conversation.
      </P>

      <H2>Start with verification, not charm</H2>
      <P>
        A good contractor is friendly — but friendliness isn&apos;t a credential.
        Before you weigh personality, verify the basics:
      </P>
      <UL>
        <LI><Strong>License.</Strong> Get the license number and confirm it with your state licensing board. Check for complaints or disciplinary actions.</LI>
        <LI><Strong>Insurance.</Strong> Ask for a current certificate of general liability and workers&apos; comp insurance, sent directly from their insurer.</LI>
        <LI><Strong>Bonding.</Strong> Where required, confirm they&apos;re bonded. Bonding protects you if they abandon the job.</LI>
        <LI><Strong>Business longevity.</Strong> A contractor with a multi-year track record under the same name is easier to hold accountable.</LI>
      </UL>

      <Callout title="Key takeaway">
        Verify credentials before you like the person. It is much easier to walk
        away from a charming unqualified contractor than to unwind a signed
        contract.
      </Callout>

      <H2>Ask for proof of comparable work</H2>
      <P>
        A portfolio shows range; references show reliability. Ask for two or three
        projects similar to yours in scope and size, completed in the last 18
        months. Then <Strong>call the owners</Strong> and ask:
      </P>
      <UL>
        <LI>Did the project finish on the agreed timeline?</LI>
        <LI>Did the final price match the contract, and if not, why?</LI>
        <LI>How did the contractor handle surprises and change orders?</LI>
        <LI>Was the jobsite kept reasonably clean and safe?</LI>
        <LI>Would you hire them again?</LI>
      </UL>
      <P>
        A contractor who hesitates to give references is telling you something.
        Listen.
      </P>

      <H2>Compare bids by scope, not just number</H2>
      <P>
        The lowest bid is rarely the real bid. When you compare proposals, lay them
        side by side and compare what&apos;s <Strong>included</Strong>, not just
        the total:
      </P>
      <UL>
        <LI>Are permits and inspection fees included or extra?</LI>
        <LI>Is demolition, haul-away, and dump fees covered?</LI>
        <LI>Are fixtures and finishes specified, or left as &quot;allowances&quot;?</LI>
        <LI>Is a project schedule attached?</LI>
        <LI>What is the payment schedule, and is it tied to milestones?</LI>
      </UL>
      <H3>Watch the &quot;allowance&quot; trap</H3>
      <P>
        Allowances are placeholders in a bid for items not yet selected — tile,
        cabinets, countertops. A low bid with thin allowances almost always grows.
        Ask for allowances to be realistic to your actual selections, and treat a
        bid with unusually low allowances as a bid that will change.
      </P>

      <H2>Require a written schedule</H2>
      <P>
        A contractor who can&apos;t give you a milestone schedule isn&apos;t
        managing your project — they&apos;re reacting to it. A real schedule
        includes:
      </P>
      <UL>
        <LI>Start date and key milestones (demo, rough-in, drywall, finish)</LI>
        <LI>Which trades are on site when</LI>
        <LI>Inspection dates</LI>
        <LI>A realistic substantial-completion date</LI>
      </UL>

      <H2>Understand the contract</H2>
      <P>
        A proper contract protects both of you. Make sure yours includes:
      </P>
      <UL>
        <LI><Strong>Scope of work</Strong> in plain language, attached as a schedule</LI>
        <LI><Strong>Payment schedule</Strong> tied to milestones, not calendar dates</LI>
        <LI><Strong>Change-order process</Strong> — how additions are priced and approved in writing</LI>
        <LI><Strong>Warranty</Strong> on workmanship, separate from manufacturer warranties</LI>
        <LI><Strong>Dispute resolution</Strong> clause</LI>
      </UL>

      <H2>Red flags that should end the conversation</H2>
      <UL>
        <LI>Pressure to start immediately or skip a contract</LI>
        <LI>Requests for cash payment or most of the money upfront</LI>
        <LI>Reluctance to provide references, license, or insurance proof</LI>
        <LI>A bid dramatically lower than others without a clear reason</LI>
        <LI>Vague answers about who will actually be on site day to day</LI>
      </UL>

      <H2>The bottom line</H2>
      <P>
        The right general contractor makes a hard project manageable. The wrong one
        makes an easy project miserable. Verify credentials, demand comparable
        references, compare scopes not just totals, require a written schedule, and
        trust your gut when something feels off. A trustworthy contractor welcomes
        every one of those steps — because they&apos;re how they earn the trust
        they work for.
      </P>
    </>
  );
}
