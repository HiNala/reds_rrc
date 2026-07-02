import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";

export const alt = "Construction Planning, Construction Management & Building Maintenance | Red's RRC";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Construction Planning, Management & Maintenance",
    subtitle: "From first sketch to final permit — transparent, on-budget, on-schedule construction for homes and restaurants across the Bay Area.",
    category: "Services",
  });
}
