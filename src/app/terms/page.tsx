import type { Metadata } from "next";
import { H2, P, Strong, Lead } from "@/components/blog/prose";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${siteConfig.shortName} website and submitting project inquiries.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${siteConfig.shortName}`,
    description: `The terms that govern your use of the ${siteConfig.shortName} website.`,
    url: absoluteUrl("/terms"),
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service | ${siteConfig.shortName}`,
    description: `The terms that govern your use of the ${siteConfig.shortName} website.`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <header className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: June 2026
        </p>
      </header>

      <Lead>
        These terms govern your use of the {siteConfig.shortName} website. By using
        the site, you agree to them.
      </Lead>

      <H2>Using this website</H2>
      <P>
        You may use this site for personal, non-commercial purposes and to inquire
        about our services. You agree not to misuse the site, attempt to disrupt it,
        or submit information through automated means without our permission.
      </P>

      <H2>Project inquiries are not contracts</H2>
      <P>
        Submitting a contact, quote, or booking form expresses your interest in
        working with us. It is <Strong>not a contract</Strong> and does not
        obligate either party. Any construction work will be governed by a separate,
        written contract that describes scope, price, schedule, and terms.
      </P>

      <H2>Accuracy of estimates</H2>
      <P>
        Any pricing, timeline, or feasibility guidance provided before a written
        contract is an estimate based on the information available at the time and
        is not a final quote. Final pricing is set in your written contract after
        plans, scope, and site conditions are confirmed.
      </P>

      <H2>Your content</H2>
      <P>
        When you submit a project description, images, or other details, you confirm
        that you have the right to share them and that you grant us permission to
        use them to respond to your inquiry and evaluate your project. We will not
        publish your private project details without your permission.
      </P>

      <H2>Intellectual property</H2>
      <P>
        Site content — including text, graphics, logos, and article content — is
        owned by {siteConfig.shortName} and may not be reproduced without
        permission, except for brief quotation with attribution.
      </P>

      <H2>Limitation of liability</H2>
      <P>
        This site is provided &quot;as is.&quot; To the fullest extent permitted by
        law, {siteConfig.shortName} is not liable for damages arising from your use
        of, or reliance on, information on this site. Construction work is governed
        solely by your written contract.
      </P>

      <H2>Changes to these terms</H2>
      <P>
        We may update these terms from time to time. Continued use of the site after
        changes constitutes acceptance of the updated terms.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about these terms? Email{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
          {siteConfig.email}
        </a>
        .
      </P>

      <P className="mt-10 text-xs text-muted-foreground">
        These terms are provided for general informational purposes and should be
        reviewed by a qualified attorney before relying on them for compliance.
      </P>
    </div>
  );
}
