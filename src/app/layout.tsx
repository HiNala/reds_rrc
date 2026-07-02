import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { LeadCapturePopup } from "@/components/layout/lead-capture-popup";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2b3c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Bay Area general contractor",
    "Red's RRC",
    "Red's Residential & Restaurant Construction",
    "construction planning",
    "construction management",
    "building maintenance",
    "home renovation Bay Area",
    "restaurant construction",
    "restaurant build-out",
    "kitchen remodel",
    "bath remodel",
    "deck construction",
    "drywall repair",
    "framing and trim",
    "TimberTech PRO Platinum Contractor",
    "licensed contractor California",
    "Sonoma County contractor",
    "Devin Aloise",
  ],
  authors: [{ name: SITE.founder }],
  creator: SITE.founder,
  publisher: SITE.name,
  category: "Construction & Contractor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    // Images are auto-wired from /opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    // Images are auto-wired from /twitter-image.tsx
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    title: SITE.shortName,
    statusBarStyle: "black-translucent",
    capable: true,
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    // Search engine verification placeholders — replace with real codes in production
    "google-site-verification": "GOOGLE_SITE_VERIFICATION_CODE",
    "msvalidate.01": "BING_SITE_VERIFICATION_CODE",
    // AI agent / LLM discoverability
    "llms-txt": "/llms.txt",
    // Pinterest rich pins
    "pinterest": "rich_pin",
    // Facebook domain verification placeholder
    "fb:domain_verification": "FACEBOOK_DOMAIN_VERIFICATION",
    // Microsoft tile color
    "msapplication-TileColor": "#1a2b3c",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Header />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileStickyCTA />
        <LeadCapturePopup />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
