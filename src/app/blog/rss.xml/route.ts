import { posts } from "@/content/blog/registry";
import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { formatRfc822 } from "@/lib/format";

/**
 * RSS 2.0 feed at /blog/rss.xml.
 *
 * Route Handler returning XML; cached by default (no request-time APIs used).
 * @see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md
 */
export async function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${formatRfc822(p.publishedAt)}</pubDate>${
        p.tags.map((t) => `\n      <category>${escapeXml(t)}</category>`).join("")
      }
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Practical, research-grounded articles on residential and restaurant construction.</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
