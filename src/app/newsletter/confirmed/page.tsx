import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Subscription Confirmed",
  description: `Your ${SITE.shortName} newsletter subscription is now active.`,
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ already?: string }>;
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-heading text-3xl font-bold">You&apos;re subscribed!</h1>
      <p className="mt-4 text-muted-foreground">
        Thanks for confirming your email. You&apos;ll now receive updates, project
        showcases, and tips from {SITE.name} in your inbox.
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
