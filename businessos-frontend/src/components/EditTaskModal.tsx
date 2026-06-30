"use client";

import { useState } from "react";
import { updateTask } from "@/services/api";
import { deleteTask } from "@/services/api";

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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[550px] p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">✏ Edit Task</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Task Title</label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="border rounded-lg w-full p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="border rounded-lg w-full p-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Status</label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="border rounded-lg w-full p-3"
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>REVIEW</option>
                <option>DONE</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Priority</label>

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value,
                  })
                }
                className="border rounded-lg w-full p-3"
              >
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Assignee</label>

            <input
              value={form.assignee}
              onChange={(e) =>
                setForm({
                  ...form,
                  assignee: e.target.value,
                })
              }
              className="border rounded-lg w-full p-3"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={async () => {
              const confirmed = window.confirm("Delete this task?");

              if (!confirmed) return;

              await deleteTask(String(task.id));

              window.location.reload();
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Delete Task
          </button>

          <div className="flex gap-3">
            <button onClick={onClose} className="border px-6 py-3 rounded-lg">
              Cancel
            </button>

            <button
              onClick={async () => {
                await updateTask(String(task.id), {
                  project_id: task.project_id,
                  title: form.title,
                  description: form.description,
                  status: form.status,
                  priority: form.priority,
                  assignee: form.assignee,
                });

                window.location.reload();
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
