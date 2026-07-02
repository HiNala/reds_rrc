import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { STATIC_PROJECTS } from "@/lib/static-projects";

/**
 * Homepage project showcase — displays a curated selection of the original
 * site's project photos in an asymmetric masonry-style grid.
 * Uses images from /public/gallery/ (original site assets).
 */
export function ProjectShowcase() {
  // Pick 6 featured/var visually diverse projects for the homepage
  const featured = STATIC_PROJECTS.filter((p) => p.featured);
  const showcase = (featured.length >= 6 ? featured : STATIC_PROJECTS).slice(0, 6);

  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Our Work
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Projects we&apos;re proud of
          </h2>
          <p className="mt-4 text-muted-foreground">
            From outdoor living spaces to restaurant build-outs, every project
            is held to the same standard: craftsmanship that lasts.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((project, i) => {
            // Make the first card span 2 rows on large screens for visual interest
            const isFeatured = i === 0;
            return (
              <Reveal
                key={project.slug}
                delay={i * 0.06}
                className={isFeatured ? "lg:row-span-2" : ""}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-xl"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-muted ${
                      isFeatured ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={project.images[0].url}
                      alt={project.images[0].alt ?? project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                      {project.category}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                      View project <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            See all projects <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
