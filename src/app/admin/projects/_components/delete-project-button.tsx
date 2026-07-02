"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function DeleteProjectButton({
  projectId,
  projectTitle,
}: {
  projectId: number;
  projectTitle: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to delete project");
      }
      toast.success("Project deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm" aria-label={`Delete ${projectTitle}`}>
            <Trash2 className="size-3.5" />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{projectTitle}</strong>? This will
            remove the project and all its images from the gallery. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
