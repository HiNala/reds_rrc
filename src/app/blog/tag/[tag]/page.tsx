import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllTags, getPostsByTag } from "@/content/blog/registry";
import { PostCard } from "@/components/blog/post-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

type Props = { params: Promise<{ tag: string }> };

/** Prerender a page per tag. */
export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  if (!getAllTags().includes(decoded)) return { title: "Topic not found" };

  const title = `${decoded} | ${siteConfig.shortName} Blog`;
  const description = `Articles about ${decoded} from the ${siteConfig.shortName} blog.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/tag/${tag}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/blog/tag/${tag}`),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  if (!getAllTags().includes(decoded)) notFound();

  const tagged = getPostsByTag(decoded);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: decoded, path: `/blog/tag/${tag}` },
        ]}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          <li aria-hidden>/</li>
          <li className="capitalize text-foreground">{decoded}</li>
        </ol>
      </nav>

      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
          Topic
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground capitalize sm:text-5xl">
          {decoded}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {tagged.length} article{tagged.length === 1 ? "" : "s"}
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tagged.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      <div className="mt-12">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:underline"
        >
          &larr; All articles
        </Link>
      </div>
    </div>
  );
}
