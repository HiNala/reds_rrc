import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { posts, getAllTags } from "@/content/blog/registry";
import { PostCard } from "@/components/blog/post-card";
import { TrackClick } from "@/components/analytics/track-click";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, research-grounded articles on residential and restaurant construction — renovations, build-outs, permits, and choosing the right contractor.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${siteConfig.shortName}`,
    description:
      "Practical, research-grounded articles on residential and restaurant construction.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.shortName}`,
    description:
      "Practical, research-grounded articles on residential and restaurant construction.",
  },
};

export default function BlogIndexPage() {
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <JsonLdBlocks />

      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Insights
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          The Red&apos;s RRC Blog
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Field-tested guidance on building and renovating homes and restaurants —
          from budgets and permits to picking the contractor who&apos;ll treat your
          opening date like a promise.
        </p>
      </header>

      {/* Featured post */}
      <section className="mb-14" aria-label="Featured article">
        <FeaturedPost post={featured} />
      </section>

      {/* Tag filter row */}
      {tags.length > 0 && (
        <nav aria-label="Filter by topic" className="mb-8 flex flex-wrap gap-2">
          <span className="self-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Topics:
          </span>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="rounded-full border border-border px-3 py-1 text-xs capitalize text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {tag}
            </Link>
          ))}
        </nav>
      )}

      {/* Rest of the posts */}
      <section
        aria-label="All articles"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      {/* Final CTA */}
      <section className="mt-16 rounded-2xl border border-border bg-muted/50 p-8 text-center sm:p-12">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Planning a build or renovation?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us about your project and we&apos;ll come back with a clear, honest
          path forward — no pressure, no jargon.
        </p>
        <TrackClick
          label="Start a project"
          location="blog-index-cta"
          className="mt-6 inline-block"
        >
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "px-5")}
          >
            Start a project
          </Link>
        </TrackClick>
      </section>
    </div>
  );
}

function FeaturedPost({ post }: { post: (typeof posts)[number] }) {
  return (
    <article className="grid gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 md:grid-cols-2">
      <Link
        href={`/blog/${post.slug}`}
        className="overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={post.title}
      >
        <Image
          src={post.image}
          alt=""
          width={1200}
          height={675}
          unoptimized
          loading="eager"
          className="aspect-[16/9] w-full object-cover"
        />
      </Link>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground">{post.description}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>&middot;</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <div>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-5",
            )}
          >
            Read the article
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Structured data for the index page (LocalBusiness + WebSite). */
function JsonLdBlocks() {
  return (
    <>
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
    </>
  );
}
