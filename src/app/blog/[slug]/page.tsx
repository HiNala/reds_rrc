import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { posts, getPost, getAllSlugs } from "@/content/blog/registry";
import { PostCard } from "@/components/blog/post-card";
import { TrackClick } from "@/components/analytics/track-click";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

/** Prerender every published article at build time. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  const url = absoluteUrl(`/blog/${slug}`);
  const image = absoluteUrl(post.image);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      images: [{ url: image, width: 1200, height: 675, alt: post.title }],
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content } = post;
  const image = absoluteUrl(post.image);

  // Prev/next by published date (newest-first registry).
  const idx = posts.findIndex((p) => p.slug === slug);
  const newer = idx > 0 ? posts[idx - 1] : undefined;
  const older = idx < posts.length - 1 ? posts[idx + 1] : undefined;
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <ArticleJsonLd
        slug={slug}
        title={post.title}
        description={post.description}
        image={image}
        publishedAt={post.publishedAt}
        author={post.author}
        tags={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      {post.faqs.length > 0 && <FaqJsonLd faqs={post.faqs} />}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground line-clamp-1">{post.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/20"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
          {post.author && <span className="font-medium text-foreground">{post.author}</span>}
          {post.author && <span aria-hidden>&middot;</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>&middot;</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </header>

      {/* Hero thumbnail */}
      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={675}
        unoptimized
        loading="eager"
        className="mb-10 aspect-[16/9] w-full rounded-xl object-cover"
      />

      {/* Body */}
      <div className="blog-body">
        <Content />
      </div>

      {/* FAQ */}
      {post.faqs.length > 0 && (
        <section aria-label="Frequently asked questions" className="mt-12">
          <h2 className="mb-5 font-heading text-2xl font-bold text-foreground">
            Frequently asked questions
          </h2>
          <dl className="divide-y divide-border rounded-xl border border-border">
            {post.faqs.map((f) => (
              <div key={f.question} className="p-5">
                <dt className="font-heading font-semibold text-foreground">
                  {f.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-border bg-muted/50 p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          We build and renovate homes and restaurants with one point of
          accountability. Tell us what you&apos;re planning.
        </p>
        <TrackClick
          label="Get a quote"
          location={`blog-article-footer-${slug}`}
          className="mt-6 inline-block"
        >
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "px-5")}
          >
            Get a quote
          </Link>
        </TrackClick>
      </section>

      {/* Prev / next */}
      {(newer || older) && (
        <nav
          aria-label="More articles"
          className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group rounded-xl border border-border p-4 hover:border-primary"
            >
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                &larr; Older
              </span>
              <p className="mt-1 font-medium text-foreground group-hover:text-primary">
                {older.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="group rounded-xl border border-border p-4 text-right hover:border-primary"
            >
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Newer &rarr;
              </span>
              <p className="mt-1 font-medium text-foreground group-hover:text-primary">
                {newer.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16" aria-label="Related articles">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            Keep reading
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
