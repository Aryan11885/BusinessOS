"use client";

import { useState } from "react";

import ProgressBar from "./ProgressBar";
import KanbanBoard from "./KanbanBoard";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

type Props = {
  project: any;
  tasks: any[];
};

export default function ProjectWorkspace({ project, tasks }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "TODO").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <p className="text-gray-500 mt-2">{project.description}</p>
        </div>

        <div className="flex gap-3">
          <a
            href={`/projects/${project.id}/edit`}
            className="bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Edit Project
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow p-6">
        <ProgressBar progress={project.progress} />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Tasks</h3>

          <p className="text-3xl font-bold mt-3">{totalTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Completed</h3>

          <p className="text-3xl font-bold mt-3">{completedTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">In Progress</h3>

          <p className="text-3xl font-bold mt-3">{inProgressTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Pending</h3>

          <p className="text-3xl font-bold mt-3">{pendingTasks}</p>
        </div>
      </div>

      {/* Kanban */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-5">Task Board</h2>

        <KanbanBoard
          tasks={tasks}
          onTaskClick={(task) => setSelectedTask(task)}
        />
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          projectId={project.id}
          onClose={() => setShowModal(false)}
          onTaskCreated={() => {
            window.location.reload();
          }}
        />
      )}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
