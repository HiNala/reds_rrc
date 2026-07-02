import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight prose primitives for blog article bodies.
 *
 * We avoid @tailwindcss/typography (extra dep + config) in favor of a small
 * set of styled elements that match the site's tone. Each maps to a semantic
 * HTML tag so screen readers and search engines get clean structure.
 */

export function H2({ className, ...p }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-10 mb-3 font-heading text-2xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...p}
    />
  );
}

export function H3({ className, ...p }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("mt-7 mb-2 font-heading text-xl font-semibold text-foreground", className)}
      {...p}
    />
  );
}

export function P({ className, ...p }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("mb-4 text-base leading-relaxed text-muted-foreground", className)}
      {...p}
    />
  );
}

export function UL({ className, ...p }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("mb-4 ml-6 list-disc space-y-2 text-muted-foreground", className)}
      {...p}
    />
  );
}

export function OL({ className, ...p }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn("mb-4 ml-6 list-decimal space-y-2 text-muted-foreground", className)}
      {...p}
    />
  );
}

export function LI({ className, ...p }: React.ComponentProps<"li">) {
  return <li className={cn("leading-relaxed", className)} {...p} />;
}

export function Strong({ className, ...p }: React.ComponentProps<"strong">) {
  return <strong className={cn("font-semibold text-foreground", className)} {...p} />;
}

export function Lead({ className, ...p }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mb-6 text-lg leading-relaxed font-medium text-foreground",
        className,
      )}
      {...p}
    />
  );
}

/** A callout box for key takeaways / summaries. */
export function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      aria-label={title}
      className="my-8 rounded-xl border border-border bg-muted/60 p-5"
    >
      <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </p>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
}
