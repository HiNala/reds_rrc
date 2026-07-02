import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";
import { SERVICES } from "@/lib/site-config";
import { getServiceDetail } from "@/content/services/detail";

export const alt = "Service | Red's RRC";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateImageMetadata = async () => {
  return SERVICES.map((s) => ({
    id: s.slug,
    alt: `${s.name} | Red's RRC`,
    size: OG_SIZE,
    contentType: OG_CONTENT_TYPE,
  }));
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = getServiceDetail(slug);

  return renderOgImage({
    title: service?.name ?? "Service",
    subtitle: detail?.intro ?? service?.description,
    category: "Service",
  });
}
