import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { newsletterSchema } from "@/lib/validators";
import { sendNewsletterConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { email, name, phone, sourcePage } = parsed.data;

  // Generate a confirmation token for double opt-in.
  const confirmToken = randomUUID();

  try {
    await db.insert(newsletterSubscribers).values({
      email,
      name: name || null,
      phone: phone || null,
      sourcePage,
      confirmToken,
    });
  } catch (err: unknown) {
    // Unique constraint violation → already subscribed, treat as success.
    // Drizzle wraps the pg error in a "Failed query" Error with the
    // original error on the `cause` property.
    const pgErr = (err as { code?: string; cause?: { code?: string } });
    const code = pgErr?.code ?? pgErr?.cause?.code;
    if (code === "23505") {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 409 });
    }
    console.error("[api/newsletter] Failed to persist subscriber", err);
    return NextResponse.json({ error: "Couldn't subscribe right now." }, { status: 500 });
  }

  // Send the double opt-in confirmation email (best-effort).
  await sendNewsletterConfirmationEmail(email, confirmToken);

  return NextResponse.json({ ok: true });
}
