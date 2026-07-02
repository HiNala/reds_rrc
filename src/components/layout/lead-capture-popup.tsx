"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";

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

export function LeadCapturePopup() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const startedRef = React.useRef(false);
  const armedRef = React.useRef(false);

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
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
      window.setTimeout(() => setOpen(false), 2600);
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
        className="sm:max-w-md p-0 overflow-hidden"
        showCloseButton={!submitted}
      >
        {/* Brand band */}
        <div className="bg-primary px-6 py-5 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
            <Sparkles className="size-4" />
            Free guide
          </div>
        </div>

        <div className="px-6 pb-6 pt-5">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="size-10 text-primary" />
              <DialogTitle className="font-heading text-xl font-bold">
                Check your inbox
              </DialogTitle>
              <DialogDescription>
                Your free project planning checklist is on its way from{" "}
                {SITE.email}. We&apos;ll only reach out with useful updates —
                no spam, ever.
              </DialogDescription>
            </div>
          ) : (
            <>
              <DialogHeader className="gap-3">
                <DialogTitle className="font-heading text-2xl font-bold tracking-tight">
                  Plan your project with confidence
                </DialogTitle>
                <DialogDescription>
                  Get our free{" "}
                  <span className="font-medium text-foreground">
                    Project Planning Checklist
                  </span>{" "}
                  — the same one {SITE.shortName} uses to keep Bay Area home and
                  restaurant builds on time and on budget. Drop your email and
                  we&apos;ll send it straight over.
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
                className="mt-5 flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    aria-label="Email address"
                    aria-invalid={!!form.formState.errors.email}
                    className="sm:flex-1"
                    {...form.register("email")}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    data-track-cta="lead_popup_submit"
                    data-track-location="lead_popup"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="size-4" /> Send it
                      </>
                    )}
                  </Button>
                </div>
                <FieldError errors={[form.formState.errors.email]} />
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
