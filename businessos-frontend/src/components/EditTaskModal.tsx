"use client";

import { useEffect, useState } from "react";
import { updateTask } from "@/services/api";
import { deleteTask } from "@/services/api";
import { X, Loader2, Pencil } from "lucide-react";

type Props = {
  task: any;
  onClose: () => void;
};

export default function EditTaskModal({ task, onClose }: Props) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    assignee: task.assignee || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteTask(String(task.id));
      window.location.reload();
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      await updateTask(String(task.id), {
        project_id: task.project_id,
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority,
        assignee: form.assignee,
      });
      window.location.reload();
    } finally {
      setIsSaving(false);
    }
  }

  const busy = isSaving || isDeleting;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Pencil className="w-5 h-5 text-slate-500" />
            Edit Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Task Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>REVIEW</option>
                <option>DONE</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Assignee
            </label>
            <input
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-8">
          <button
            onClick={handleDelete}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete Task"}
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={busy}
              className="border border-slate-200 text-slate-700 px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}