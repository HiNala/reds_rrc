import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";
import { SITE } from "@/lib/site-config";

export const alt = `Book Online | ${SITE.shortName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Book a Consultation",
    subtitle: `Schedule a consultation with ${SITE.shortName}. Book a call or request a callback — we'll come back with a clear, honest path forward.`,
    category: "Booking",
  });
}
