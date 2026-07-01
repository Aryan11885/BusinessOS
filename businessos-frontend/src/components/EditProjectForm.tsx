"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject, deleteProject } from "@/services/api";
import { Trash2, Save, Loader2 } from "lucide-react";

type Props = {
  project: any;
};

export default function EditProjectForm({ project }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    organization_id: project.organization_id,
    customer_id: project.customer_id,
    name: project.name,
    description: project.description,
    status: project.status,
    progress: project.progress,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateProject(String(project.id), form);
      router.push(`/projects/${project.id}`);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteProject(String(project.id));
      router.push("/projects");
      router.refresh();
    } catch (error: any) {
      alert(
        "Cannot delete this project because it still has tasks. Delete all tasks first.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const busy = isSaving || isDeleting;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-8 space-y-5"
    >
      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Project Name
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          rows={5}
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
            <option value="NOT_STARTED">NOT_STARTED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          {isDeleting ? "Deleting..." : "Delete Project"}
        </button>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Updating..." : "Update Project"}
        </button>
      </div>
    </form>
  );
}