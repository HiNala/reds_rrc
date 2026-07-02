// Central source of truth for brand/business info.
// Sourced from start/rebuild/page-specs/*.md and start/global/*.json
// (captured from https://www.redsrrc.com/) per AGENT_INSTRUCTIONS.md traceability rule.
// Positioning follows start/rebuild/positioning-strategy.md.

export const SITE = {
  name: "Red's Residential & Restaurant Construction",
  shortName: "Red's RRC",
  tagline: "It is our pleasure to build for you",
  description:
    "Licensed Bay Area general contractor building and maintaining homes and restaurants since 2012. Transparent communication, on-time delivery, and craftsmanship you can trust.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.redsrrc.com",
  founder: "Devin Aloise",
  license: "Licensed General Contractor #1112399",
  since: 2012,
  region: "California Bay Area",
  phone: "707-634-3264",
  phoneHref: "tel:+17076343264",
  email: "info@redsrrc.com",
  emailHref: "mailto:info@redsrrc.com",
  certification: "TimberTech PRO Platinum Contractor",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
} as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Our Story", href: "/story" },
  { label: "Our Clients", href: "/clients" },
  { label: "Blog", href: "/blog" },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Our Story", href: "/story" },
  { label: "Our Clients", href: "/clients" },
  { label: "Get a Quote", href: "/contact" },
];

export const PRIMARY_CTA = { label: "Get a Free Quote", href: "/contact" };
export const SECONDARY_CTA = { label: "Call Us Now", href: SITE.phoneHref };

export const SERVICES = [
  {
    slug: "construction-planning",
    name: "Construction Planning",
    caption: "It's All in the Details",
    description:
      "From first sketch to final permit, we map out scope, budget, and schedule up front so there are no surprises once work begins.",
  },
  {
    slug: "construction-management",
    name: "Construction Management",
    caption: "Efficient. Reliable. Exceptional.",
    description:
      "Daily on-site oversight, clear weekly recaps, and a crew that keeps your project on budget and on schedule from groundbreak to walkthrough.",
  },
  {
    slug: "building-maintenance",
    name: "Building Maintenance",
    caption: "Customized to Your Preferences",
    description:
      "Ongoing upkeep and repairs for homes and restaurants, scheduled around your business and family so life never has to stop for us.",
  },
] as const;

export const VALUES = [
  {
    number: "01",
    title: "Transparency",
    description:
      "Clear communication and honest change orders — you always know the status and the cost of your project.",
  },
  {
    number: "02",
    title: "Efficiency",
    description:
      "On-time, considerate scheduling that respects your home, your family, and your neighbors.",
  },
  {
    number: "03",
    title: "Community",
    description:
      "We support local causes and volunteer efforts because our work should leave a positive legacy behind.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Blake Young",
    quote:
      "We worked with Devin (the Owner) directly. He gave us a schedule and budget and he and his team stuck to it. Daily and weekly recaps kept us in the loop. By far the best communicator we've worked with.",
  },
  {
    name: "Casey Johnson",
    quote:
      "Everyone on this crew was kind and liked my dogs. They cleaned up every day and kept my property clean and neighbors happy. I have recommended them to friends and family.",
  },
  {
    name: "Robbie White",
    quote:
      "Other companies quoted us four times what Red's RRC did. This was the first contractor who offered references and a schedule with the bid showing they could get the job done on time and budget.",
  },
  {
    name: "Barbra & Michael",
    location: "Bodega Bay",
    quote:
      "We worked with Devin directly. He gave us a schedule and budget and he and his team stuck to it. Daily and weekly recaps kept us in the loop.",
  },
] as const;

export const TRUST_BADGES = [
  SITE.license,
  SITE.certification,
  `Serving the ${SITE.region} since ${SITE.since}`,
] as const;

/* ------------------------------------------------------------------ */
/* SEO / structured-data config — consumed by                         */
/* `src/components/seo/json-ld.tsx` and page-level metadata.          */
/* No street address is published for the business, so the            */
/* PostalAddress block in LocalBusiness JSON-LD is intentionally       */
/* omitted rather than fabricated.                                    */
/* ------------------------------------------------------------------ */

export const siteConfig = {
  name: SITE.name,
  shortName: SITE.shortName,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  phone: SITE.phone,
  logoPath: "/brand/logo.png",
  areaServed: SITE.region,
  sameAs: Object.values(SITE.social).filter(Boolean) as string[],
  streetAddress: undefined as string | undefined,
  addressLocality: undefined as string | undefined,
  addressRegion: "CA" as string | undefined,
  postalCode: undefined as string | undefined,
  addressCountry: "US" as string | undefined,
} as const;

/** Resolve a site-relative path to an absolute URL using `SITE.url`. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
