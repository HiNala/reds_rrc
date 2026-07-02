import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import {
  getAllProjects,
  createProject,
  type ProjectInput,
} from "@/lib/projects-queries";
import { track } from "@/lib/analytics-server";

export const dynamic = "force-dynamic";

/** GET /api/admin/projects — all projects (including drafts). */
export async function GET() {
  await requireAdmin();
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[api/admin/projects] GET failed", err);
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }
}

/** POST /api/admin/projects — create a new project. */
export async function POST(req: NextRequest) {
  await requireAdmin();

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = json as Partial<ProjectInput>;
  if (!body.title || typeof body.title !== "string" || body.title.trim().length === 0) {
    return NextResponse.json({ error: "Title is required." }, { status: 422 });
  }

  try {
    const project = await createProject({
      title: body.title.trim(),
      description: body.description?.trim() || undefined,
      category: body.category?.trim() || undefined,
      location: body.location?.trim() || undefined,
      published: body.published ?? true,
      featured: body.featured ?? false,
      sortOrder: body.sortOrder ?? 0,
    });
    await track("admin_project_create", { props: { projectId: project.id, title: project.title } });
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("[api/admin/projects] POST failed", err);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
