"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  Clock,
  TrendingDown,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { newsletterSchema, type NewsletterInput } from "@/lib/validators";
import { trackEvent, getStoredUtmParams } from "@/lib/analytics";
import { SITE } from "@/lib/site-config";

/**
 * <LeadCapturePopup /> — mount once in the root layout.
 *
 * Conversion-focused overlay that offers a lead magnet (free project planning
 * checklist) in exchange for an email. Triggers on:
 *   - exit-intent (mouse leaves through the top of the viewport), or
 *   - a 25s time fallback (for mobile / no-mouse devices).
 *
 * Suppressed for 7 days after dismissal or a successful submit, and never
 * shown on /contact, /book-online, or /admin (where the visitor is already
 * converting or authenticated). Respects Do-Not-Track via trackEvent.
 */
const STORAGE_KEY = "rrc_lead_popup_dismissed";
const SUPPRESS_DAYS = 7;
const DELAY_MS = 25_000;

// Routes where the visitor is already converting or authenticated — no popup.
const SUPPRESS_PATHS = ["/contact", "/book-online", "/admin"];

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (!Number.isFinite(dismissedAt)) return false;
    return Date.now() - dismissedAt < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markSuppressed(): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

const BENEFITS = [
  { icon: ClipboardList, text: "Step-by-step project checklist" },
  { icon: Clock, text: "Timeline & milestone templates" },
  { icon: TrendingDown, text: "Budget tracking worksheets" },
];

export function LeadCapturePopup() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const startedRef = React.useRef(false);
  const armedRef = React.useRef(false);

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", name: "", phone: "" },
  });

  function trigger(source: "exit_intent" | "timer") {
    if (isSuppressed() || open) return;
    setOpen(true);
    trackEvent("lead_popup_show", { source });
  }

  // Arm the trigger listeners once per pathname, after a short tick so we
  // don't fire during initial mount / route transitions.
  React.useEffect(() => {
    if (SUPPRESS_PATHS.some((p) => pathname.startsWith(p))) return;
    if (isSuppressed()) return;

    armedRef.current = false;
    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, 1500);

    return () => window.clearTimeout(armTimer);
  }, [pathname]);

  // Exit-intent: mouse leaves through the top of the viewport.
  React.useEffect(() => {
    if (SUPPRESS_PATHS.some((p) => pathname.startsWith(p))) return;

    function handleMouseOut(e: MouseEvent) {
      if (!armedRef.current || open || submitted) return;
      if (e.relatedTarget !== null && e.clientY > 5) return;
      trigger("exit_intent");
    }

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, open, submitted]);

  // Time fallback (covers mobile / touch devices with no mouse).
  React.useEffect(() => {
    if (SUPPRESS_PATHS.some((p) => pathname.startsWith(p))) return;

    const timer = window.setTimeout(() => {
      if (!open && !submitted) trigger("timer");
    }, DELAY_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, open, submitted]);

  function handleOpenChange(next: boolean) {
    if (!next && !submitted) {
      trackEvent("lead_popup_dismiss");
      markSuppressed();
    }
    setOpen(next);
  }

  async function onSubmit(values: NewsletterInput) {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          sourcePage: "lead-popup",
          ...getStoredUtmParams(),
        }),
      });
      if (!res.ok && res.status !== 409) throw new Error("Request failed");

      trackEvent("form_submit", { form: "lead_popup", sourcePage: "lead-popup" });
      trackEvent("thank_you", { form: "lead_popup", sourcePage: "lead-popup" });
      setSubmitted(true);
      markSuppressed();
      form.reset();
      // Auto-close shortly after the success state so the visitor isn't stuck.
      window.setTimeout(() => setOpen(false), 3200);
    } catch {
      trackEvent("form_error", { form: "lead_popup", sourcePage: "lead-popup" });
      form.setError("email", {
        type: "server",
        message: "Couldn't submit right now — please try again shortly.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-2xl p-0 overflow-hidden rounded-2xl"
        showCloseButton={!submitted}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.15fr]">
          {/* ── Left: visual / brand panel ── */}
          <div className="relative hidden sm:flex flex-col justify-between bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
            {/* Decorative grid pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                Free Guide
              </div>
              <h2 className="mt-5 font-heading text-2xl font-bold leading-tight">
                Plan your project with confidence
              </h2>
              <p className="mt-2 text-sm text-primary-foreground/80">
                The same checklist {SITE.shortName} uses to keep Bay Area home
                and restaurant builds on time and on budget.
              </p>
            </div>

            <ul className="relative mt-6 space-y-2.5">
              {BENEFITS.map((b) => (
                <li key={b.text} className="flex items-center gap-2.5 text-sm">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
                    <b.icon className="size-4" />
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="relative mt-6 flex items-center gap-2 text-xs text-primary-foreground/70">
              <ShieldCheck className="size-4" />
              We respect your privacy. Unsubscribe anytime.
            </div>
          </div>

          {/* ── Right: form / content panel ── */}
          <div className="bg-popover p-6 sm:p-7">
            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-8 text-primary" />
                </div>
                <DialogTitle className="font-heading text-xl font-bold">
                  Check your inbox
                </DialogTitle>
                <DialogDescription className="max-w-xs">
                  Your free Project Planning Checklist is on its way from{" "}
                  <span className="font-medium text-foreground">
                    {SITE.email}
                  </span>
                  . We&apos;ll only reach out with useful updates — no spam,
                  ever.
                </DialogDescription>
              </div>
            ) : (
              <>
                {/* Mobile-only header (the left panel is hidden on small screens) */}
                <div className="sm:hidden">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Sparkles className="size-3.5" />
                    Free Guide
                  </div>
                </div>

                <DialogHeader className="gap-2 sm:mt-0">
                  <DialogTitle className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                    Get the Project Planning Checklist
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    Drop your email and we&apos;ll send it straight over.{" "}
                    <span className="text-foreground/70">
                      Name and phone are optional — but they help us tailor
                      follow-up advice to your project.
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  onFocus={() => {
                    if (!startedRef.current) {
                      startedRef.current = true;
                      trackEvent("form_start", {
                        form: "lead_popup",
                        sourcePage: "lead-popup",
                      });
                    }
                  }}
                  noValidate
                  className="mt-5 flex flex-col gap-3.5"
                >
                  {/* Email (required) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lead-popup-email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="lead-popup-email"
                      type="email"
                      placeholder="you@email.com"
                      aria-label="Email address"
                      aria-invalid={!!form.formState.errors.email}
                      className="h-11"
                      {...form.register("email")}
                    />
                    <FieldError errors={[form.formState.errors.email]} />
                  </div>

                  {/* Name + Phone (optional) — two columns on wider screens */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="lead-popup-name"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        Name{" "}
                        <span className="text-xs font-normal text-muted-foreground/70">
                          (optional)
                        </span>
                      </label>
                      <Input
                        id="lead-popup-name"
                        type="text"
                        placeholder="Jane Doe"
                        aria-label="Your name (optional)"
                        className="h-11"
                        {...form.register("name")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="lead-popup-phone"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        Phone{" "}
                        <span className="text-xs font-normal text-muted-foreground/70">
                          (optional)
                        </span>
                      </label>
                      <Input
                        id="lead-popup-phone"
                        type="tel"
                        placeholder="(510) 555-0123"
                        aria-label="Phone number (optional)"
                        className="h-11"
                        {...form.register("phone")}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="mt-1 h-11 w-full"
                    data-track-cta="lead_popup_submit"
                    data-track-location="lead_popup"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="size-4" /> Send me the checklist
                      </>
                    )}
                  </Button>

                  <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5 shrink-0" />
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
