import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";
import { SITE } from "@/lib/site-config";

export const alt = `Get a Free Quote | ${SITE.shortName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Get a Free Quote",
    subtitle: `Send a quick message or request a detailed quote from ${SITE.shortName}. We typically respond within one business day.`,
    category: "Contact",
  });
}
