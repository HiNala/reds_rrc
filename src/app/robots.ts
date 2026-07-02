import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * robots.txt — allow all public content, keep the admin dashboard and API
 * routes out of the index, and point crawlers at the sitemap.
 *
 * Explicitly allows major search engine bots (Google, Bing, DuckDuckGo,
 * Yandex, Baidu) and AI/answer-engine crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, AppleBot, Amazonbot, Google-Extended) to access all
 * public content for AEO/GEO discoverability.
 *
 * @see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
 */
export default function robots(): MetadataRoute.Robots {
  const disallowPaths = ["/admin", "/api/"];

  return {
    rules: [
      // Default — allow everything public
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      // AI/answer-engine crawlers — explicitly allowed for AEO/GEO
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "AppleBot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
