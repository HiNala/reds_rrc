import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { newsletterSchema } from "@/lib/validators";

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

  const { email, sourcePage } = parsed.data;

  try {
    await db.insert(newsletterSubscribers).values({
      email,
      sourcePage,
    });
  } catch (err: unknown) {
    // Unique constraint violation → already subscribed, treat as success.
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 409 });
    }
    console.error("[api/newsletter] Failed to persist subscriber", err);
    return NextResponse.json({ error: "Couldn't subscribe right now." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
