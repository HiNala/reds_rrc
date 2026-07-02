import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

/**
 * Brand-new generated mark (asset_policy: "regenerate" — see
 * start/design-kit/asset-generation-brief.md). Original monogram + wordmark,
 * not derived from the captured site's logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-9", className)}
      role="img"
      aria-label={`${SITE.shortName} mark`}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-grad)" />
      <path
        d="M22 46V18h11.5c5.5 0 9 3.4 9 8.4 0 3.7-2 6.4-5.3 7.6L37 46h-6.6l-4.3-10.8H27V46h-5Zm5-15.2h5.9c2.6 0 4.2-1.4 4.2-3.5 0-2.1-1.6-3.4-4.2-3.4H27v6.9Z"
        fill="var(--primary-foreground)"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showTagline = false,
}: {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">
          {SITE.shortName}
        </span>
        {showTagline && (
          <span className="text-xs italic text-muted-foreground">
            {SITE.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
