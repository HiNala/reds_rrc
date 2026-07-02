import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  icons: {
    icon: "/favicon.svg",
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
