import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const dynamic = "force-dynamic";
import { posts, getPost } from "@/content/blog/registry";

export const alt = "Article | Red's RRC Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateImageMetadata = async () => {
  return posts.map((p) => ({
    id: p.slug,
    alt: `${p.title} | Red's RRC Blog`,
    size: OG_SIZE,
    contentType: OG_CONTENT_TYPE,
  }));
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    title: post?.title ?? "Article",
    subtitle: post?.description,
    category: "Blog",
  });
}
