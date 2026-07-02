"use client";

import { useState } from "react";
import Image from "next/image";

import { ProjectLightbox } from "./project-lightbox";

interface GalleryImage {
  id: number;
  url: string;
  alt: string | null;
  sortOrder: number;
}

/**
 * Interactive gallery for the project detail page.
 * Shows a responsive grid of images that open in a lightbox when clicked.
 */
export function ProjectDetailGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => {
              setLightboxIndex(i);
              setLightboxOpen(true);
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-all hover:shadow-lg hover:border-primary/30"
          >
            <Image
              src={img.url}
              alt={img.alt ?? `Project photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              Click to enlarge
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <ProjectLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
