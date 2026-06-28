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
