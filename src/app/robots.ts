import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * robots.txt — allow all public content, keep the admin dashboard out of the
 * index, and point crawlers at the sitemap.
 *
 * @see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
