import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";

export const alt = "Privacy Policy | Red's RRC";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Privacy Policy",
    subtitle: "How Red's RRC collects, uses, and protects your information when you contact us or use our website.",
    category: "Legal",
  });
}
