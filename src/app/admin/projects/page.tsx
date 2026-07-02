import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star, Eye, EyeOff } from "lucide-react";

import { requireAdmin } from "@/lib/auth";
import { getAllProjects, type AdminProjectWithImages } from "@/lib/projects-queries";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteProjectButton } from "./_components/delete-project-button";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getAllProjects();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your project gallery ({projects.length} total)
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/admin/projects/new" />}>
          <Plus className="size-4" /> New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">No projects yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first project to start building your gallery.
            </p>
            <Button nativeButton={false} render={<Link href="/admin/projects/new" />}>
              <Plus className="size-4" /> Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: AdminProjectWithImages }) {
  const cover = project.images[0];
  const imageCount = project.images.length;

  return (
    <Card className="group flex flex-col overflow-hidden p-0">
      {/* Cover image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <span className="text-sm">No image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          {project.featured && (
            <Badge className="bg-amber-500/90 text-white hover:bg-amber-500">
              <Star className="mr-0.5 size-3 fill-current" /> Featured
            </Badge>
          )}
          <Badge
            className={
              project.published
                ? "bg-emerald-500/90 text-white hover:bg-emerald-500"
                : "bg-zinc-500/90 text-white hover:bg-zinc-500"
            }
          >
            {project.published ? (
              <>
                <Eye className="mr-0.5 size-3" /> Published
              </>
            ) : (
              <>
                <EyeOff className="mr-0.5 size-3" /> Draft
              </>
            )}
          </Badge>
        </div>

        {/* Image count */}
        {imageCount > 0 && (
          <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {imageCount} {imageCount === 1 ? "image" : "images"}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading font-semibold text-foreground line-clamp-1">
          {project.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          {project.category && <span>{project.category}</span>}
          {project.category && project.location && <span>·</span>}
          {project.location && <span>{project.location}</span>}
        </div>
        {project.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/admin/projects/${project.id}/edit`} />}
            className="flex-1"
          >
            <Pencil className="size-3.5" /> Edit
          </Button>
          <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
        </div>
      </div>
    </Card>
  );
}
