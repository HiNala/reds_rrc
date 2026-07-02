import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Invalid Confirmation Link",
  description: "The newsletter confirmation link is invalid or expired.",
  robots: { index: false, follow: false },
};

export default function NewsletterInvalidPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.7-3L13.7 4a2 2 0 00-3.4 0L3.3 16A2 2 0 005 19z" />
        </svg>
      </div>
      <h1 className="font-heading text-3xl font-bold">This link isn&apos;t valid</h1>
      <p className="mt-4 text-muted-foreground">
        The confirmation link may have expired or already been used. Try subscribing
        again from the newsletter form at the bottom of any page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </div>
  );
}
