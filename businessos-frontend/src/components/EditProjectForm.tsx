"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject, deleteProject } from "@/services/api";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updateProject(String(project.id), form);

    router.push(`/projects/${project.id}`);
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      await deleteProject(String(project.id));

      router.push("/projects");
      router.refresh();
    } catch (error: any) {
      alert(
        "Cannot delete this project because it still has tasks. Delete all tasks first.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-8 space-y-5"
    >
      <div>
        <label className="font-medium">Project Name</label>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="border rounded-lg w-full mt-2 p-3"
        />
      </div>

      <div>
        <label className="font-medium">Description</label>

        <textarea
          rows={5}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="border rounded-lg w-full mt-2 p-3"
        />
      </div>

      <div>
        <label className="font-medium">Status</label>

        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
          className="border rounded-lg w-full mt-2 p-3"
        >
          <option value="NOT_STARTED">NOT_STARTED</option>

          <option value="IN_PROGRESS">IN_PROGRESS</option>

          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Delete Project
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Update Project
        </button>
      </div>
    </form>
  );
}
