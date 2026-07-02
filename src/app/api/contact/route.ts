import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { sendLeadNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { name, email, phone, message, service, newsletterOptIn, sourcePage, utm } =
    parsed.data as ContactInput;

  const emailStatus = await sendLeadNotification({
    kind: "contact",
    name,
    email,
    phone,
    message,
    extra: service ? { Service: service } : undefined,
  });

  try {
    await db.insert(leads).values({
      source: "contact",
      name: name || null,
      email,
      phone: phone || null,
      service: service || null,
      message,
      sourcePage: sourcePage ?? "contact",
      utm: utm ?? null,
      emailStatus,
    });
  } catch (err) {
    console.error("[api/contact] Failed to persist lead", err);
    return NextResponse.json(
      { error: "We couldn't save your message right now. Please call us instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
