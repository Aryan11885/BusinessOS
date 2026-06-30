"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import KanbanBoard from "./KanbanBoard";
import AddTaskModal from "./AddTaskModal";

type Props = {
  project: any;
  tasks: any[];
};

export default function ProjectWorkspace({ project, tasks }: Props) {
  const [showModal, setShowModal] = useState(false);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "TODO").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <p className="text-gray-500 mt-2">{project.description}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          + Add Task
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <ProgressBar progress={project.progress} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <KanbanBoard tasks={tasks} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h3>Total Tasks</h3>
          <p className="text-3xl font-bold mt-3">{totalTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Completed</h3>
          <p className="text-3xl font-bold mt-3">{completedTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>In Progress</h3>
          <p className="text-3xl font-bold mt-3">{inProgressTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Pending</h3>
          <p className="text-3xl font-bold mt-3">{pendingTasks}</p>
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          projectId={project.id}
          onClose={() => setShowModal(false)}
          onTaskCreated={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
