"use client";

import { useEffect, useState } from "react";
import { createTask } from "@/services/api";
import { X, Loader2 } from "lucide-react";

type Props = {
  projectId: number;
  onClose: () => void;
  onTaskCreated: () => void;
};

export default function AddTaskModal({ projectId, onClose, onTaskCreated }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    assignee: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTask({
        project_id: projectId,
        ...form,
      });

      onTaskCreated();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Add Task</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Task Title
            </label>
            <input
              placeholder="e.g. Design landing page"
              required
              value={form.title}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              placeholder="Add more detail..."
              rows={3}
              value={form.description}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Assignee
            </label>
            <input
              placeholder="Team member name"
              value={form.assignee}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Priority
            </label>
            <select
              value={form.priority}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-slate-200 text-slate-700 rounded-lg px-5 py-3 text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg px-5 py-3 text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}