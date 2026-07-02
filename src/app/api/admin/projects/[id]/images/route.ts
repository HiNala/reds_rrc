import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { addProjectImage } from "@/lib/projects-queries";
import { uploadProjectImage } from "@/lib/storage";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/projects/[id]/images
 * Multipart form upload: field "file" = the image File, optional "alt" = alt text.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id: idStr } = await params;
  const projectId = parseInt(idStr, 10);
  if (Number.isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const file = formData.get("file");
  const alt = formData.get("alt");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 422 });
  }

  try {
    const uploaded = await uploadProjectImage(file, projectId);
    const image = await addProjectImage(projectId, {
      storageKey: uploaded.key,
      alt: typeof alt === "string" ? alt : file.name,
      contentType: uploaded.contentType,
      size: uploaded.size,
    });

    return NextResponse.json(
      { image: { ...image, url: uploaded.url } },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    console.error("[api/admin/projects/images] Upload failed", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
