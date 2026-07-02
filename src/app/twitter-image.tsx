import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";
import { SITE } from "@/lib/site-config";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Building & maintaining Bay Area homes and restaurants since 2012",
    subtitle: SITE.description,
    category: "Home",
  });
}
