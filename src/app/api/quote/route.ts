import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { quoteSchema, type QuoteInput } from "@/lib/validators";
import { sendLeadNotification, sendLeadAutoReply } from "@/lib/email";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const {
    name,
    email,
    phone,
    company,
    service,
    budget,
    timeline,
    location,
    message,
    sourcePage,
    utm,
  } = parsed.data as QuoteInput;

  const fullMessage = [
    message,
    timeline ? `Timeline: ${timeline}` : null,
    budget ? `Budget: ${budget}` : null,
    location ? `Location: ${location}` : null,
    company ? `Company: ${company}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const emailStatus = await sendLeadNotification({
    kind: "quote",
    name,
    email,
    phone,
    message: fullMessage,
    extra: {
      Service: service,
      Timeline: timeline,
      Budget: budget,
      Location: location,
      Company: company,
    },
  });

  // Send auto-reply confirmation to the lead
  await sendLeadAutoReply({
    kind: "quote",
    name,
    email,
    phone,
    message: fullMessage,
    extra: {
      Service: service,
      Timeline: timeline,
      Budget: budget,
      Location: location,
      Company: company,
    },
  });

  try {
    await db.insert(leads).values({
      source: "quote",
      name: name || null,
      email,
      phone: phone || null,
      service: service || null,
      message: fullMessage,
      sourcePage: sourcePage ?? "contact",
      utm: utm ?? null,
      emailStatus,
    });
  } catch (err) {
    console.error("[api/quote] Failed to persist lead", err);
    return NextResponse.json(
      { error: "We couldn't save your request right now. Please call us instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
