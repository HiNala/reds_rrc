import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { getSession } from "@/lib/auth";
import { track } from "@/lib/analytics-server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const note = typeof body.note === "string" ? body.note.trim() : "";

  if (!note) {
    return NextResponse.json({ error: "Note text is required" }, { status: 400 });
  }

  // Verify lead exists
  const [lead] = await db
    .select({ id: schema.leads.id })
    .from(schema.leads)
    .where(eq(schema.leads.id, id))
    .limit(1);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const [created] = await db
    .insert(schema.leadNotes)
    .values({
      leadId: id,
      note,
      author: session.email,
    })
    .returning();

  await track("admin_lead_note", { props: { leadId: id, author: session.email } });

  return NextResponse.json({ ok: true, note: created });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
  }

  const notes = await db
    .select()
    .from(schema.leadNotes)
    .where(eq(schema.leadNotes.leadId, id))
    .orderBy(schema.leadNotes.createdAt);

  return NextResponse.json({ notes });
}
