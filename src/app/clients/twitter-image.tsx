import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";
import { SITE } from "@/lib/site-config";

export const alt = `Our Clients | ${SITE.shortName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Our Clients & Projects",
    subtitle: `What ${SITE.shortName} clients say — and the projects we've built together. Transparent communication, on-time delivery, and craftsmanship you can trust.`,
    category: "Portfolio",
  });
}
