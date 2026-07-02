import type { MetadataRoute } from "next";

import { siteConfig, SERVICES } from "@/lib/site-config";
import { posts, getAllTags } from "@/content/blog/registry";

/**
 * Dynamic sitemap covering marketing pages, service detail pages, the blog
 * index, every article, tag pages, and legal pages. Served at /sitemap.xml.
 *
 * @see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1, images: [`${base}/opengraph-image`] },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9, images: [`${base}/services/opengraph-image`] },
    { url: `${base}/story`, lastModified: now, changeFrequency: "yearly", priority: 0.7, images: [`${base}/story/opengraph-image`] },
    { url: `${base}/clients`, lastModified: now, changeFrequency: "monthly", priority: 0.7, images: [`${base}/clients/opengraph-image`] },
    { url: `${base}/book-online`, lastModified: now, changeFrequency: "monthly", priority: 0.8, images: [`${base}/book-online/opengraph-image`] },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9, images: [`${base}/contact/opengraph-image`] },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8, images: [`${base}/blog/opengraph-image`] },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${base}/services/${s.slug}.jpg`],
  }));

  const articleRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
    images: [`${base}${p.image}`],
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${base}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes, ...tagRoutes];
}
