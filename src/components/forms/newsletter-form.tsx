"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { newsletterSchema, type NewsletterInput } from "@/lib/validators";
import { trackEvent, getStoredUtmParams } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  sourcePage = "footer",
  className,
}: {
  sourcePage?: string;
  className?: string;
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const startedRef = React.useRef(false);

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: NewsletterInput) {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, sourcePage, ...getStoredUtmParams() }),
      });
      if (!res.ok && res.status !== 409) throw new Error("Request failed");

      trackEvent("form_submit", { form: "newsletter", sourcePage });
      trackEvent("thank_you", { form: "newsletter", sourcePage });
      setSubmitted(true);
      form.reset();
    } catch {
      toast.error("Couldn't subscribe right now — please try again shortly.");
    }
  }

  if (submitted) {
    return (
      <p className={cn("flex items-center gap-2 text-sm font-medium text-primary", className)}>
        <CheckCircle2 className="size-4" /> You&apos;re on the list!
      </p>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onFocus={() => {
        if (!startedRef.current) {
          startedRef.current = true;
          trackEvent("form_start", { form: "newsletter", sourcePage });
        }
      }}
      noValidate
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@email.com"
          aria-label="Email address"
          aria-invalid={!!form.formState.errors.email}
          {...form.register("email")}
        />
        <Button type="submit" size="icon" disabled={form.formState.isSubmitting} aria-label="Subscribe">
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </div>
      <FieldError errors={[form.formState.errors.email]} />
    </form>
  );
}
