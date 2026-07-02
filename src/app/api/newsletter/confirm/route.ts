import { NextResponse, type NextRequest } from "next/server";
import { db, schema } from "@/db/client";
import { eq } from "drizzle-orm";

/**
 * GET /api/newsletter/confirm?token=... — double opt-in confirmation.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(
      new URL("/newsletter/invalid?reason=missing", request.nextUrl.origin),
    );
  }

  try {
    const [subscriber] = await db
      .select()
      .from(schema.newsletterSubscribers)
      .where(eq(schema.newsletterSubscribers.confirmToken, token))
      .limit(1);

    if (!subscriber) {
      return NextResponse.redirect(
        new URL("/newsletter/invalid?reason=token", request.nextUrl.origin),
      );
    }

    if (subscriber.confirmed) {
      return NextResponse.redirect(
        new URL("/newsletter/confirmed?already=true", request.nextUrl.origin),
      );
    }

    await db
      .update(schema.newsletterSubscribers)
      .set({ confirmed: true, confirmedAt: new Date(), confirmToken: null })
      .where(eq(schema.newsletterSubscribers.id, subscriber.id));

    return NextResponse.redirect(
      new URL("/newsletter/confirmed", request.nextUrl.origin),
    );
  } catch (err) {
    console.error("[/api/newsletter/confirm] failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
