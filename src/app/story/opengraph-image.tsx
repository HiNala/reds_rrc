import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";
import { SITE } from "@/lib/site-config";

export const alt = `Our Story | ${SITE.shortName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Our Story",
    subtitle: `How ${SITE.founder} built ${SITE.shortName} on transparency, efficiency, and community — a Bay Area general contractor since ${SITE.since}.`,
    category: "About",
  });
}
