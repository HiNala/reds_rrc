import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/content/blog/types";
import { formatDate } from "@/lib/format";

/**
 * Blog post preview card — used on the blog index and tag pages.
 * Thumbnails are code-generated SVGs, so we render them with
 * `unoptimized` (the correct next/image choice for vector art).
 *
 * The whole card is clickable via a stretched-link pseudo-element on the
 * title; the image is decorative (alt="") since the title conveys meaning.
 */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-shadow hover:shadow-lg">
      <Image
        src={post.image}
        alt=""
        width={1200}
        height={675}
        unoptimized
        loading="lazy"
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <h2 className="font-heading text-lg font-semibold leading-snug text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            className="before:absolute before:inset-0 before:content-[''] hover:text-primary"
          >
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>&middot;</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </article>
  );
}
