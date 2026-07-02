import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Star, Camera } from "lucide-react";

import { SITE, absoluteUrl } from "@/lib/site-config";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectDetailGallery } from "@/components/site/project-detail-gallery";
import {
  getPublishedProjectBySlug,
  getPublishedProjects,
  type ProjectWithImages,
} from "@/lib/projects-queries";
import { STATIC_PROJECTS } from "@/lib/static-projects";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let project: ProjectWithImages | null = null;
  try {
    project = await getPublishedProjectBySlug(slug);
  } catch (err) {
    console.error(`[projects/[slug]] DB error for slug="${slug}":`, err);
  }
  // Fall back to static projects
  if (!project) {
    project = (STATIC_PROJECTS.find((p) => p.slug === slug) as unknown as ProjectWithImages) ?? null;
  }
  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const cover = project.images[0];
  const title = `${project.title} | ${SITE.shortName}`;
  const description =
    project.description ??
    `See the ${project.title} project by ${SITE.name}${project.location ? ` in ${project.location}` : ""}.`;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/projects/${project.slug}`),
      type: "article",
      images: cover
        ? [{ url: cover.url, alt: cover.alt ?? project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover ? [cover.url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let project: ProjectWithImages | null = null;
  try {
    project = await getPublishedProjectBySlug(slug);
  } catch (err) {
    console.error(`[projects/[slug]] DB error for slug="${slug}":`, err);
  }
  // Fall back to static projects
  if (!project) {
    project = (STATIC_PROJECTS.find((p) => p.slug === slug) as unknown as ProjectWithImages) ?? null;
  }
  if (!project) notFound();

  // Get related projects (same category, excluding current, limit 3)
  let related: ProjectWithImages[] = [];
  try {
    const all = await getPublishedProjects();
    // Filter out SVG-image projects
    const realAll = all.filter((p) => !p.images[0]?.url?.endsWith(".svg"));
    related = realAll
      .filter((p) => p.id !== project!.id && p.category === project!.category)
      .slice(0, 3);
    if (related.length < 3) {
      const others = realAll
        .filter((p) => p.id !== project!.id && !related.some((r) => r.id === p.id))
        .slice(0, 3 - related.length);
      related = [...related, ...others];
    }
  } catch {
    // DB not available
  }
  // If no DB related projects, use static ones
  if (related.length === 0) {
    related = STATIC_PROJECTS
      .filter((p) => p.slug !== slug)
      .slice(0, 3) as unknown as ProjectWithImages[];
  }

  const cover = project.images[0];
  const galleryImages = project.images.slice(1);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/projects" className="hover:text-foreground">
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground">{project.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
              <Star className="size-3 fill-current" /> Featured
            </span>
          )}
          {project.category && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {project.category}
            </span>
          )}
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        {project.location && (
          <p className="mt-3 flex items-center gap-1.5 text-lg text-muted-foreground">
            <MapPin className="size-5" /> {project.location}
          </p>
        )}
        {project.description && (
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}
      </header>

      {/* Cover image */}
      {cover && (
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
          <Image
            src={cover.url}
            alt={cover.alt ?? project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            Project Gallery
            <span className="ml-2 text-base font-normal text-muted-foreground">
              ({galleryImages.length} {galleryImages.length === 1 ? "photo" : "photos"})
            </span>
          </h2>
          <ProjectDetailGallery images={project.images.slice(1)} />
        </section>
      )}

      {/* No images state */}
      {project.images.length === 0 && (
        <div className="mb-16 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
          <Camera className="size-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">
            Photos coming soon
          </p>
        </div>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            More Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rp) => (
              <Link
                key={rp.id}
                href={`/projects/${rp.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {rp.images[0] ? (
                    <Image
                      src={rp.images[0].url}
                      alt={rp.images[0].alt ?? rp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <Camera className="size-8 opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-heading text-base font-semibold leading-tight">
                      {rp.title}
                    </h3>
                    {rp.category && (
                      <p className="mt-0.5 text-xs text-white/80">{rp.category}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to all projects
        </Link>
      </div>

      {/* CTA */}
      <CtaBand
        heading="Like what you see?"
        subheading="Let's talk about your project. We'll bring the same craftsmanship and care to your home or business."
        trackLocation="project-detail-cta"
      />
    </div>
  );
}
