import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

/**
 * Brand mark — uses the original red "R" logo from the captured site
 * (start/assets/images/asset-08f1ae6a37c3.png), copied to /brand/logo.png.
 * Falls back to a generated SVG monogram if the image fails to load.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo.png"
      alt={`${SITE.shortName} mark`}
      width={36}
      height={32}
      className={cn("size-9 w-auto", className)}
      priority
    />
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
