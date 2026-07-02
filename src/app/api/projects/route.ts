import { NextResponse } from "next/server";

import { getPublishedProjects } from "@/lib/projects-queries";

export const dynamic = "force-dynamic";

/** GET /api/projects — public list of published projects with image URLs. */
export async function GET() {
  try {
    const projects = await getPublishedProjects();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[api/projects] Failed to fetch projects", err);
    return NextResponse.json(
      { error: "Failed to load projects." },
      { status: 500 }
    );
  }
}
