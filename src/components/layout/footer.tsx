import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { FOOTER_LINKS, SITE, TRUST_BADGES } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo showTagline />
            <p className="mt-4 text-sm text-muted-foreground">
              {SITE.license}
              <br />
              Serving the {SITE.region} since {SITE.since}.
            </p>
            <Image
              src="/brand/timbertech-platinum.png"
              alt="TimberTech PRO Platinum Contractor"
              width={120}
              height={110}
              className="mt-4 h-auto w-28 opacity-90"
              unoptimized
            />
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="size-4" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="flex items-center gap-2 hover:text-foreground">
                  <Mail className="size-4" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4" /> {SITE.certification}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Stay in the loop
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Occasional project spotlights and maintenance tips — no spam.
            </p>
            <NewsletterForm sourcePage="footer" className="mt-4" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {TRUST_BADGES.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
