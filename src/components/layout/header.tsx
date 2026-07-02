"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
import { NAV_ITEMS, PRIMARY_CTA, SITE } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0"
          onClick={() => trackEvent("cta_click", { cta: "logo", location: "header" })}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  active && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            onClick={() => trackEvent("cta_click", { cta: "phone", location: "header" })}
          >
            <Phone className="size-4" />
            {SITE.phone}
          </a>
          <Button
            nativeButton={false}
            render={
              <Link
                href={PRIMARY_CTA.href}
                onClick={() => trackEvent("cta_click", { cta: "header_quote", location: "header" })}
              />
            }
          >
            {PRIMARY_CTA.label}
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            }
          />

          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Phone className="size-4" />
                {SITE.phone}
              </a>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={PRIMARY_CTA.href} onClick={() => setOpen(false)} />}
              >
                {PRIMARY_CTA.label}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
