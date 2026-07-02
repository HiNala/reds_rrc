import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";
import { getAllTags } from "@/content/blog/registry";

export const alt = "Topic | Red's RRC Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateImageMetadata = async () => {
  return getAllTags().map((tag) => ({
    id: tag,
    alt: `${tag} articles | Red's RRC Blog`,
    size: OG_SIZE,
    contentType: OG_CONTENT_TYPE,
  }));
};

export default async function Image({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return renderOgImage({
    title: decoded,
    subtitle: `Articles about ${decoded} from the Red's RRC construction blog.`,
    category: "Topic",
  });
}
