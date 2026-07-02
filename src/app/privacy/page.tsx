import type { Metadata } from "next";
import { H2, P, UL, LI, Strong, Lead } from "@/components/blog/prose";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.shortName} collects, uses, and protects your information when you contact us or use our website.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.shortName}`,
    description: `How ${siteConfig.shortName} collects, uses, and protects your information.`,
    url: absoluteUrl("/privacy"),
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <header className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: June 2026
        </p>
      </header>

      <Lead>
        This policy explains what information {siteConfig.shortName} collects when
        you use this website or contact us, how we use it, and the choices you have.
      </Lead>

      <H2>Information we collect</H2>
      <P>
        We collect information you voluntarily provide when you fill out a form
        (contact, quote request, newsletter, or booking), such as your name, email,
        phone number, company, project details, and any message you send us. We also
        collect limited analytics data about how visitors use the site.
      </P>
      <UL>
        <LI><Strong>Contact &amp; lead data:</Strong> name, email, phone, company, project details, and the page you submitted from.</LI>
        <LI><Strong>Attribution data:</Strong> referring page and UTM campaign parameters, when present in the link you arrived from.</LI>
        <LI><Strong>Usage data:</Strong> pages visited, approximate device type, and locale, collected via our analytics system.</LI>
      </UL>

      <H2>How we use your information</H2>
      <UL>
        <LI>To respond to your inquiry and discuss your project.</LI>
        <LI>To send updates you&apos;ve opted into, such as our newsletter.</LI>
        <LI>To improve our website and understand which content is useful.</LI>
        <LI>To meet legal obligations and protect against fraud.</LI>
      </UL>

      <H2>Analytics</H2>
      <P>
        We use a first-party analytics system that records page views and key
        interactions (such as button clicks and form submissions) so we can measure
        and improve the site. We do not sell your data, and we do not use
        cross-site behavioral advertising trackers.
      </P>

      <H2>Cookies</H2>
      <P>
        We use a minimal set of cookies and similar storage for analytics and to
        remember your session on the site. You can disable cookies in your browser;
        the site will still work, though some analytics will not be recorded.
      </P>

      <H2>How long we keep data</H2>
      <P>
        We keep lead and contact information for as long as is reasonable to respond
        to your inquiry and for our legitimate business records. Newsletter
        subscribers can unsubscribe at any time, and we remove confirmed opt-outs
        from active lists.
      </P>

      <H2>Your choices</H2>
      <UL>
        <LI><Strong>Access or correction:</Strong> email us to review or correct the information you submitted.</LI>
        <LI><Strong>Unsubscribe:</Strong> use the unsubscribe link in any newsletter email.</LI>
        <LI><Strong>Deletion:</Strong> email us to request deletion of your information, subject to legal retention needs.</LI>
      </UL>

      <H2>Contacting us</H2>
      <P>
        For privacy questions or requests, email{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
          {siteConfig.email}
        </a>
        .
      </P>

      <P className="mt-10 text-xs text-muted-foreground">
        This privacy policy is provided for general informational purposes and
        should be reviewed by a qualified attorney before relying on it for
        compliance.
      </P>
    </div>
  );
}
