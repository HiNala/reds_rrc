"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectData {
  id?: number;
  title: string;
  description: string;
  category: string;
  location: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
}

export function ProjectForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: ProjectData;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<ProjectData>(
    initialData ?? {
      title: "",
      description: "",
      category: "",
      location: "",
      published: true,
      featured: false,
      sortOrder: 0,
    }
  );

  function update<K extends keyof ProjectData>(key: K, value: ProjectData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: data.title.trim(),
        description: data.description.trim() || undefined,
        category: data.category.trim() || undefined,
        location: data.location.trim() || undefined,
        published: data.published,
        featured: data.featured,
        sortOrder: data.sortOrder,
      };

      if (mode === "create") {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Failed to create project");
        }
        const { project } = await res.json();
        toast.success("Project created — now add some images!");
        router.push(`/admin/projects/${project.id}/edit`);
      } else if (mode === "edit" && initialData?.id) {
        const res = await fetch(`/api/admin/projects/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Failed to update project");
        }
        toast.success("Project saved");
        router.refresh();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Modern Kitchen Renovation"
              required
            />
          </div>

          {/* Category + Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={data.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder="e.g. Kitchen, Bathroom, Restaurant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Napa, CA"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brief description of the project, scope, and outcome..."
              rows={4}
            />
          </div>

          {/* Sort order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort order</Label>
            <Input
              id="sortOrder"
              type="number"
              value={data.sortOrder}
              onChange={(e) => update("sortOrder", parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first in the gallery.
            </p>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={data.published}
                onCheckedChange={(v) => update("published", v === true)}
              />
              <span className="text-sm">
                Published
                <span className="block text-xs text-muted-foreground">
                  Visible on the public clients page
                </span>
              </span>
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={data.featured}
                onCheckedChange={(v) => update("featured", v === true)}
              />
              <span className="text-sm">
                Featured
                <span className="block text-xs text-muted-foreground">
                  Pinned to the top of the gallery
                </span>
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Create Project" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
