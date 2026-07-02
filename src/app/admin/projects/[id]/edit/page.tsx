import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { requireAdmin } from "@/lib/auth";
import { getProjectById } from "@/lib/projects-queries";
import { ProjectForm } from "../../_components/project-form";
import { ImageGalleryManager } from "../../_components/image-gallery-manager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) notFound();

  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/projects"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
        <h1 className="font-heading text-2xl font-semibold">Edit Project</h1>
        <p className="text-sm text-muted-foreground">
          Update details and manage images for this project.
        </p>
      </div>

      <ProjectForm
        mode="edit"
        initialData={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.description ?? "",
          category: project.category ?? "",
          location: project.location ?? "",
          published: project.published,
          featured: project.featured,
          sortOrder: project.sortOrder,
        }}
      />

      <ImageGalleryManager projectId={project.id} images={project.images} />
    </div>
  );
}
