"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { trackEvent, getStoredUtmParams } from "@/lib/analytics";

export function ContactForm({ sourcePage = "contact" }: { sourcePage?: string }) {
  const [submitted, setSubmitted] = React.useState(false);
  const startedRef = React.useRef(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema) as never,
    defaultValues: { name: "", email: "", phone: "", message: "", newsletterOptIn: false },
  });

  const onFocusFirstInteraction = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_start", { form: "contact", sourcePage });
    }
  };

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, sourcePage, utm: getStoredUtmParams() }),
      });
      if (!res.ok) throw new Error("Request failed");

      trackEvent("lead", { form: "contact", sourcePage });
      trackEvent("thank_you", { form: "contact", sourcePage });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong sending your message. Please call us instead.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/40 px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="font-heading text-xl font-semibold">Thanks for reaching out!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          We received your message and will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} onFocus={onFocusFirstInteraction} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="contact-name">Name</FieldLabel>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Jane Smith"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="jane@email.com"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-phone">
            Phone <span className="text-muted-foreground">(optional)</span>
          </FieldLabel>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(707) 555-0100"
            {...form.register("phone")}
          />
          <FieldError errors={[form.formState.errors.phone]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            placeholder="Tell us a little about your project…"
            rows={4}
            aria-invalid={!!form.formState.errors.message}
            {...form.register("message")}
          />
          <FieldError errors={[form.formState.errors.message]} />
        </Field>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Send Message"
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Only 4 fields — most visitors finish in under a minute.
        </p>
      </FieldGroup>
    </form>
  );
}
