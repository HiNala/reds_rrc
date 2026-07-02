import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import {
  deleteProjectImage,
  updateProjectImage,
} from "@/lib/projects-queries";

export const dynamic = "force-dynamic";

/** DELETE /api/admin/projects/[id]/images/[imageId] — delete a project image. */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  await requireAdmin();
  const { imageId: imageIdStr } = await params;
  const imageId = parseInt(imageIdStr, 10);
  if (Number.isNaN(imageId)) {
    return NextResponse.json({ error: "Invalid image ID." }, { status: 400 });
  }

  try {
    await deleteProjectImage(imageId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/projects/images] DELETE failed", err);
    return NextResponse.json({ error: "Failed to delete image." }, { status: 500 });
  }
}

/** PATCH /api/admin/projects/[id]/images/[imageId] — update alt text / sort order. */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  await requireAdmin();
  const { imageId: imageIdStr } = await params;
  const imageId = parseInt(imageIdStr, 10);
  if (Number.isNaN(imageId)) {
    return NextResponse.json({ error: "Invalid image ID." }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = json as { alt?: string; sortOrder?: number };
  const image = await updateProjectImage(imageId, {
    ...(body.alt !== undefined && { alt: body.alt }),
    ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
  });

  if (!image) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
  return NextResponse.json({ image });
}
