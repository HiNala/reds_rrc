import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import {
  getProjectById,
  updateProject,
  deleteProject,
  type ProjectInput,
} from "@/lib/projects-queries";
import { track } from "@/lib/analytics-server";

export const dynamic = "force-dynamic";

/** GET /api/admin/projects/[id] — single project with images. */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  const project = await getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

/** PUT /api/admin/projects/[id] — update a project. */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = json as Partial<ProjectInput>;
  if (body.title !== undefined && (typeof body.title !== "string" || body.title.trim().length === 0)) {
    return NextResponse.json({ error: "Title cannot be empty." }, { status: 422 });
  }

  const project = await updateProject(id, {
    ...(body.title !== undefined && { title: body.title.trim() }),
    ...(body.description !== undefined && { description: body.description?.trim() || undefined }),
    ...(body.category !== undefined && { category: body.category?.trim() || undefined }),
    ...(body.location !== undefined && { location: body.location?.trim() || undefined }),
    ...(body.published !== undefined && { published: body.published }),
    ...(body.featured !== undefined && { featured: body.featured }),
    ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  await track("admin_project_update", { props: { projectId: id } });
  return NextResponse.json({ project });
}

/** DELETE /api/admin/projects/[id] — delete a project and its images. */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  try {
    await deleteProject(id);
    await track("admin_project_delete", { props: { projectId: id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/projects] DELETE failed", err);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
