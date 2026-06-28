"use client";

import { useState } from "react";
import { createTask } from "@/services/api";

type Props = {
  projectId: number;
  onClose: () => void;
  onTaskCreated: () => void;
};

export default function AddTaskModal({ projectId, onClose, onTaskCreated, }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    assignee: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createTask({
      project_id: projectId,
      ...form,
    });

    onTaskCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-5">Add Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Task Title"
            className="border rounded w-full p-3"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description"
            className="border rounded w-full p-3"
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            placeholder="Assignee"
            className="border rounded w-full p-3"
            onChange={(e) =>
              setForm({
                ...form,
                assignee: e.target.value,
              })
            }
          />

          <select
            className="border rounded w-full p-3"
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value,
              })
            }
          >
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>

          <button className="bg-blue-600 text-white rounded px-5 py-3">
            Create Task
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
