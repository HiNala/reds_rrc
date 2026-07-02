"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  quoteSchema,
  type QuoteInput,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  BUDGET_OPTIONS,
} from "@/lib/validators";
import { trackEvent, getStoredUtmParams } from "@/lib/analytics";

const DRAFT_KEY = "rrc_quote_draft";
const STEPS = ["Your info", "Project details", "Tell us more"] as const;

const STEP_FIELDS: (keyof QuoteInput)[][] = [
  ["name", "email", "phone"],
  ["service", "timeline", "budget"],
  ["message", "consent"],
];

const DEFAULT_VALUES: QuoteInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  location: "",
  message: "",
  consent: true as unknown as true,
  newsletterOptIn: false as boolean | undefined,
};

function loadDraft(): Partial<QuoteInput> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function MultiStepQuoteForm({ sourcePage = "contact" }: { sourcePage?: string }) {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const startedRef = React.useRef(false);

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema) as never,
    defaultValues: { ...DEFAULT_VALUES, ...loadDraft() },
    mode: "onSubmit",
  });

  // Autosave: persist on every change so a refresh never loses progress.
  React.useEffect(() => {
    const sub = form.watch((values) => {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    });
    return () => sub.unsubscribe();
  }, [form]);

  function trackStart() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_start", { form: "quote", sourcePage });
    }
  }

  async function goNext() {
    trackStart();
    const fields = STEP_FIELDS[step];
    const valid = await form.trigger(fields);
    if (!valid) return;
    trackEvent("form_step", { form: "quote", step: step + 1, sourcePage });
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(values: QuoteInput) {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, sourcePage, utm: getStoredUtmParams() }),
      });
      if (!res.ok) throw new Error("Request failed");

      trackEvent("lead", { form: "quote", sourcePage });
      trackEvent("thank_you", { form: "quote", sourcePage });
      window.sessionStorage.removeItem(DRAFT_KEY);
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong submitting your request. Please call us instead.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/40 px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="font-heading text-xl font-semibold">Your quote request is in!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          A member of the Red&apos;s RRC team will follow up within one business day with next steps.
        </p>
      </div>
    );
  }

  const progressValue = ((step + 1) / STEPS.length) * 100;

  return (
    <form
      onSubmit={
        step === STEPS.length - 1 ? form.handleSubmit(onSubmit) : (e) => e.preventDefault()
      }
      noValidate
      className="flex flex-col gap-6"
    >
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </span>
          <span>{Math.round(progressValue)}%</span>
        </div>
        <Progress value={progressValue} />
      </div>

      {step === 0 && (
        <FieldGroup onFocus={trackStart}>
          <Field>
            <FieldLabel htmlFor="quote-name">Name</FieldLabel>
            <Input id="quote-name" autoComplete="name" placeholder="Jane Smith" {...form.register("name")} />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="quote-email">Email</FieldLabel>
            <Input id="quote-email" type="email" autoComplete="email" placeholder="jane@email.com" {...form.register("email")} />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="quote-phone">Phone</FieldLabel>
            <Input id="quote-phone" type="tel" autoComplete="tel" placeholder="(707) 555-0100" {...form.register("phone")} />
            <FieldError errors={[form.formState.errors.phone]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="quote-company">
              Company <span className="text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Input id="quote-company" autoComplete="organization" placeholder="Acme Restaurants" {...form.register("company")} />
          </Field>
        </FieldGroup>
      )}

      {step === 1 && (
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="quote-service">Service needed</FieldLabel>
            <Controller
              control={form.control}
              name="service"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                  <SelectTrigger id="quote-service" className="w-full">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.service]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="quote-timeline">Timeline</FieldLabel>
            <Controller
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                  <SelectTrigger id="quote-timeline" className="w-full">
                    <SelectValue placeholder="When do you want to start?" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMELINE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="quote-budget">
              Budget range <span className="text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Controller
              control={form.control}
              name="budget"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                  <SelectTrigger id="quote-budget" className="w-full">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="quote-location">
              Project location <span className="text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Input id="quote-location" placeholder="e.g. San Francisco, CA" {...form.register("location")} />
          </Field>
        </FieldGroup>
      )}

      {step === 2 && (
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="quote-message">Project details</FieldLabel>
            <Textarea
              id="quote-message"
              placeholder="Describe the space, scope, or any specifics that will help us prepare your quote…"
              rows={5}
              {...form.register("message")}
            />
            <FieldError errors={[form.formState.errors.message]} />
          </Field>

          <Field orientation="horizontal">
            <Controller
              control={form.control}
              name="consent"
              render={({ field }) => (
                <Checkbox
                  id="quote-consent"
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
              )}
            />
            <FieldLabel htmlFor="quote-consent" className="text-sm font-normal">
              I&apos;d like Red&apos;s RRC to contact me about this project.
            </FieldLabel>
          </Field>
          <FieldError errors={[form.formState.errors.consent]} />
        </FieldGroup>
      )}

      <div className="flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={goBack}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Submit Request"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
