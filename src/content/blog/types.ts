import type { ComponentType } from "react";

/**
 * Blog content model.
 *
 * Articles are authored as TSX data modules (no MDX dependency) — each
 * article file exports a `meta` object and a default React component for the
 * body. This keeps the blog fully typed, build-time static, and free of
 * extra runtime deps. The registry in `registry.ts` wires them together.
 */

export interface Faq {
  question: string;
  answer: string;
}

export interface PostMeta {
  /** URL slug, also used for the thumbnail filename: /blog/<slug>.svg */
  slug: string;
  title: string;
  /** One–two sentence summary used for cards, SEO description, and RSS. */
  description: string;
  tags: string[];
  /** ISO date string (publication date). */
  publishedAt: string;
  author?: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** Site-relative path to the 16:9 thumbnail SVG. */
  image: string;
  /** Optional FAQ block — rendered in-page and emitted as FAQPage JSON-LD. */
  faqs: Faq[];
}

export interface Post extends PostMeta {
  /** React component rendering the article body (headings, prose, lists). */
  Content: ComponentType;
}
