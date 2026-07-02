"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface GalleryImage {
  id: number;
  storageKey: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export function ImageGalleryManager({
  projectId,
  images: initialImages,
}: {
  projectId: number;
  images: GalleryImage[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (fileArray.length === 0) return;

      setUploading(true);
      for (const file of fileArray) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("alt", file.name.replace(/\.[^.]+$/, ""));

          const res = await fetch(`/api/admin/projects/${projectId}/images`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error ?? `Failed to upload ${file.name}`);
          }

          const { image } = await res.json();
          setImages((prev) => [...prev, image]);
          toast.success(`Uploaded ${file.name}`);
        } catch (err) {
          toast.error(err instanceof Error ? err.message : `Failed to upload ${file.name}`);
        }
      }
      setUploading(false);
      router.refresh();
    },
    [projectId, router]
  );

  async function handleDelete(imageId: number, filename: string) {
    try {
      const res = await fetch(
        `/api/admin/projects/${projectId}/images/${imageId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete image");
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      toast.success(`Deleted ${filename}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete image");
    }
  }

  async function handleAltUpdate(imageId: number, alt: string) {
    try {
      const res = await fetch(
        `/api/admin/projects/${projectId}/images/${imageId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alt }),
        }
      );
      if (!res.ok) throw new Error("Failed to update alt text");
      setImages((prev) =>
        prev.map((img) => (img.id === imageId ? { ...img, alt } : img))
      );
    } catch {
      toast.error("Failed to update alt text");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Images</CardTitle>
        <CardDescription>
          Drag and drop images here, or click to browse. JPG, PNG, WebP, AVIF, GIF up to 15 MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-12 transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Uploading…</p>
            </>
          ) : (
            <>
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Upload className="size-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  High-quality photos show your best work
                </p>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) uploadFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {/* Image grid */}
        {images.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-muted"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={img.url}
                    alt={img.alt ?? `Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                  {idx === 0 && (
                    <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      Cover
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(img.id, img.alt ?? "image")}
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md bg-destructive/90 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
                    aria-label="Delete image"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="p-2">
                  <Input
                    value={img.alt ?? ""}
                    onChange={(e) => handleAltUpdate(img.id, e.target.value)}
                    placeholder="Alt text (describe the image)"
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
            <ImageIcon className="size-8 opacity-40" />
            <p className="text-sm">No images yet — upload some above.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
