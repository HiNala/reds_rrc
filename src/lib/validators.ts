import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  phone: z
    .string()
    .max(30)
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Please tell us a bit more").max(5000),
  service: z.string().max(100).optional().or(z.literal("")),
  newsletterOptIn: z.boolean().optional(),
  /** Hidden attribution fields */
  sourcePage: z.string().max(500).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/* Quote (multi-step) form                                             */
/* ------------------------------------------------------------------ */

export const quoteSchema = z.object({
  // Step 1 — about you
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(200).optional().or(z.literal("")),
  // Step 2 — about the project
  service: z.string().min(1, "Please select a service").max(100),
  budget: z.string().max(50).optional().or(z.literal("")),
  timeline: z.string().max(50).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
  // Step 3 — details
  message: z.string().min(10, "Please describe your project").max(5000),
  consent: z.literal(true, {
    message: "Please confirm you'd like us to contact you about this project.",
  }),
  newsletterOptIn: z.boolean().optional(),
  sourcePage: z.string().max(500).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
/** Alias for backward compatibility. */
export type QuoteValues = QuoteInput;

/** Per-step schemas for the multi-step quote form. */
export const quoteStepOneSchema = quoteSchema.pick({
  name: true,
  email: true,
  phone: true,
  company: true,
});

export const quoteStepTwoSchema = quoteSchema.pick({
  service: true,
  budget: true,
  timeline: true,
  location: true,
});

/* ------------------------------------------------------------------ */
/* Newsletter form                                                     */
/* ------------------------------------------------------------------ */

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email").max(200),
  name: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  sourcePage: z.string().max(500).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/* ------------------------------------------------------------------ */
/* Admin login                                                         */
/* ------------------------------------------------------------------ */

export const loginSchema = z.object({
  email: z.email("Please enter a valid email").max(200),
  password: z.string().min(1, "Password is required").max(200),
});

export type LoginInput = z.infer<typeof loginSchema>;

/* ------------------------------------------------------------------ */
/* Shared option lists (form <Select> choices)                         */
/* ------------------------------------------------------------------ */

export const SERVICE_OPTIONS = [
  "Construction Planning",
  "Construction Management",
  "Building Maintenance",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1-3 months",
  "3-6 months",
  "Just exploring options",
] as const;

export const BUDGET_OPTIONS = [
  "Under $25k",
  "$25k - $100k",
  "$100k - $250k",
  "$250k+",
  "Not sure yet",
] as const;
