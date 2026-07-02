import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "../_components/project-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "New Project" };

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/projects"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
        <h1 className="font-heading text-2xl font-semibold">New Project</h1>
        <p className="text-sm text-muted-foreground">
          Create a project, then add images from the edit page.
        </p>
      </div>

      <ProjectForm mode="create" />
    </div>
  );
}
