import { describe, it, expect } from "vitest";
import { contactSchema, quoteSchema, newsletterSchema, loginSchema } from "@/lib/validators";

describe("contactSchema", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-0100",
    message: "I'd like to discuss a restaurant build-out.",
  };

  it("accepts valid input", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a short name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "J" }).success).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a short message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "short" }).success).toBe(false);
  });

  it("accepts empty phone (optional)", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "" }).success).toBe(true);
  });
});

describe("quoteSchema", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-0100",
    company: "Acme Restaurants",
    service: "Restaurant Construction",
    budget: "$100k-$250k",
    timeline: "3-6 months",
    location: "Austin, TX",
    message: "We're building a new 3000 sq ft restaurant and need a general contractor.",
    consent: true,
  };

  it("accepts valid input", () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a service", () => {
    expect(quoteSchema.safeParse({ ...valid, service: "" }).success).toBe(false);
  });

  it("rejects missing name", () => {
    const { name: _, ...rest } = valid;
    expect(quoteSchema.safeParse(rest).success).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "sub@example.com" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "bad" }).success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    expect(loginSchema.safeParse({ email: "admin@redsrrc.com", password: "secret" }).success).toBe(true);
  });

  it("rejects empty password", () => {
    expect(loginSchema.safeParse({ email: "admin@redsrrc.com", password: "" }).success).toBe(false);
  });
});
