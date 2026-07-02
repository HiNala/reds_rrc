import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";

export const alt = "Blog | Red's RRC — Construction insights for homes and restaurants";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Construction Insights Blog",
    subtitle: "Practical, research-grounded articles on residential and restaurant construction — renovations, build-outs, permits, and choosing the right contractor.",
    category: "Blog",
  });
}
