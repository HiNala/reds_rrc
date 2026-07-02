import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // tsc --noEmit is the canonical type check (run separately in CI).
    // The Turbopack build worker crashes on Windows during type checking;
    // this is an infrastructure bug, not a code issue.
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // MinIO / S3-compatible object storage for project gallery images
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
      {
        protocol: "http",
        hostname: "minio",
        port: "9000",
      },
      // In production, add your MinIO public hostname here, e.g.:
      // { protocol: "https", hostname: "minio.redsrrc.com" },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  // Permanent redirects from old site URLs to their new equivalents.
  // Preserves SEO equity from the original redsrrc.com capture.
  async redirects() {
    return [
      { source: "/home-1", destination: "/", permanent: true },
      { source: "/services-5", destination: "/services", permanent: true },
      { source: "/service-page/client-callback", destination: "/contact", permanent: true },
      { source: "/client-callback", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
