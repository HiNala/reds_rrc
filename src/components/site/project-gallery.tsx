"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Star, MapPin, Camera } from "lucide-react";

import { ProjectLightbox } from "./project-lightbox";

interface GalleryProject {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  featured: boolean;
  images: { url: string; alt: string | null; sortOrder: number }[];
}

export function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  const [lightboxProject, setLightboxProject] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect all categories for filter chips
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [projects]);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeFilter) return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  const activeProject = lightboxProject !== null
    ? projects.find((p) => p.id === lightboxProject)
    : null;

  function openLightbox(projectId: number, imageIndex: number) {
    setLightboxProject(projectId);
    setLightboxIndex(imageIndex);
  }

  return (
    <div>
      {/* Category filters */}
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveFilter(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const cover = project.images[0];
            return (
              <article
                key={project.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl"
                onClick={() => cover && openLightbox(project.id, 0)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {cover ? (
                    <Image
                      src={cover.url}
                      alt={cover.alt ?? project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <Camera className="size-10 opacity-30" />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <Star className="size-3 fill-current" /> Featured
                    </div>
                  )}

                  {/* Image count badge */}
                  {project.images.length > 1 && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <Camera className="size-3" /> {project.images.length}
                    </div>
                  )}

                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-heading text-lg font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                      {project.category && <span>{project.category}</span>}
                      {project.category && project.location && <span>·</span>}
                      {project.location && (
                        <span className="flex items-center gap-0.5">
                          <MapPin className="size-3" /> {project.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thumbnail strip (if multiple images) */}
                {project.images.length > 1 && (
                  <div className="flex gap-1 overflow-hidden p-2">
                    {project.images.slice(0, 5).map((img, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(project.id, i);
                        }}
                        className="relative size-14 shrink-0 overflow-hidden rounded-md ring-2 ring-transparent transition-all hover:ring-primary"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt ?? project.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                    {project.images.length > 5 && (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground">
                        +{project.images.length - 5}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <Camera className="size-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">
            No projects to show yet
          </p>
          <p className="text-sm text-muted-foreground">
            Check back soon — we&apos;re adding new project photos regularly.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {activeProject && activeProject.images.length > 0 && (
        <ProjectLightbox
          images={activeProject.images}
          index={lightboxIndex}
          onClose={() => setLightboxProject(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
