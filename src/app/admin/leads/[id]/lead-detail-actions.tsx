"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "../../_components/status-badge";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

type Note = {
  id: number;
  note: string;
  author: string | null;
  createdAt: string;
};

export function LeadDetailActions({
  leadId,
  currentStatus,
  notes: initialNotes,
}: {
  leadId: number;
  currentStatus: string;
  notes: Note[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [noteText, setNoteText] = useState("");
  const [savingStatus, startStatusTransition] = useTransition();
  const [savingNote, startNoteTransition] = useTransition();

  function updateStatus(newStatus: string) {
    startStatusTransition(async () => {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    });
  }

  function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    startNoteTransition(async () => {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteText }),
      });
      if (res.ok) {
        const data = await res.json();
        setNotes((prev) => [...prev, data.note]);
        setNoteText("");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Status management */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Lead Status</h3>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              disabled={savingStatus}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all disabled:opacity-50 ${
                status === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Notes & Activity</h3>
        <form onSubmit={addNote} className="mb-4 flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note..."
            className="h-9 flex-1 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={savingNote || !noteText.trim()}
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            Add
          </button>
        </form>
        <div className="flex flex-col gap-3">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          ) : (
            notes
              .slice()
              .reverse()
              .map((n) => (
                <div key={n.id} className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-sm">{n.note}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    {n.author && <span>{n.author}</span>}
                    <span>•</span>
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
