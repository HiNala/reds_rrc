import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Camera, ArrowRight } from "lucide-react";

import { SITE, absoluteUrl } from "@/lib/site-config";
import { CtaBand } from "@/components/site/cta-band";
import { getPublishedProjects, type ProjectWithImages } from "@/lib/projects-queries";
import { STATIC_PROJECTS } from "@/lib/static-projects";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${SITE.shortName}'s portfolio of completed construction and renovation projects — kitchens, bathrooms, restaurants, commercial build-outs, and custom home additions.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${SITE.shortName}`,
    description: `Explore ${SITE.shortName}'s portfolio of completed construction and renovation projects.`,
    url: absoluteUrl("/projects"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${SITE.shortName}`,
    description: `Explore ${SITE.shortName}'s portfolio of completed construction and renovation projects.`,
  },
};

export default async function ProjectsPage() {
  let projects: ProjectWithImages[] = [];
  try {
    projects = await getPublishedProjects();
    // Only use DB projects if they have non-SVG images (real uploads, not seed SVGs)
    const hasRealImages = projects.length > 0 && projects.every(
      (p) => p.images.length > 0 && !p.images[0]?.url?.endsWith(".svg")
    );
    if (!hasRealImages) {
      projects = [];
    }
  } catch {
    // DB not available
  }

  // Fall back to static projects with real photos from /public/gallery/
  if (projects.length === 0) {
    projects = STATIC_PROJECTS as unknown as ProjectWithImages[];
  }

  // Collect categories for stats
  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      {/* Hero */}
      <header className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Our Work
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Projects We&apos;re Proud Of
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-border" />
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          From kitchen renovations to restaurant build-outs, every project we take on
          is held to the same standard: craftsmanship that lasts, communication that
          respects your time, and results that exceed expectations.
        </p>
      </header>

      {/* Stats bar */}
      {projects.length > 0 && (
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Projects" value={projects.length} />
          <StatCard label="Categories" value={categories.length} />
          <StatCard
            label="Photos"
            value={projects.reduce((sum, p) => sum + p.images.length, 0)}
          />
          <StatCard
            label="Featured"
            value={projects.filter((p) => p.featured).length}
          />
        </div>
      )}

      {/* Project grid */}
      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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

      {/* CTA */}
      <div className="mt-20">
        <CtaBand
          heading="Have a project in mind?"
          subheading="Tell us what you're planning and we'll show you why our clients recommend us to friends and family."
          trackLocation="projects-page-cta"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <p className="text-3xl font-bold tabular-nums text-primary">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectWithImages }) {
  const cover = project.images[0];
  const imageCount = project.images.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:border-primary/30"
    >
      {/* Cover image */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Star className="size-3 fill-current" /> Featured
          </div>
        )}

        {/* Image count badge */}
        {imageCount > 1 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Camera className="size-3" /> {imageCount}
          </div>
        )}

        {/* Caption */}
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

      {/* Body */}
      {project.description && (
        <div className="flex flex-1 flex-col p-4">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
            View project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      )}
    </Link>
  );
}
