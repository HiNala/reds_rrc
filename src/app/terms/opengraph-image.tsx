import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";

export const alt = "Terms of Service | Red's RRC";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Terms of Service",
    subtitle: "The terms that govern your use of the Red's RRC website and submitting project inquiries.",
    category: "Legal",
  });
}
