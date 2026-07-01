"use client";

import { useState } from "react";
import { Pencil, Plus, ListChecks, CheckCircle2, Clock, Circle } from "lucide-react";

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
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length;
  const pendingTasks = tasks.filter((task) => task.status === "TODO").length;

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: ListChecks, color: "text-slate-600 bg-slate-100" },
    { label: "Completed", value: completedTasks, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "In Progress", value: inProgressTasks, icon: Clock, color: "text-indigo-600 bg-indigo-50" },
    { label: "Pending", value: pendingTasks, icon: Circle, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">
            {project.name}
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          
          <a href={`/projects/${project.id}/edit`}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Pencil className="w-4 h-4" />
            Edit Project
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6">
        <ProgressBar progress={project.progress} />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 transition-all hover:shadow-md"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {label}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">Task Board</h2>

        <KanbanBoard tasks={tasks} onTaskClick={(task) => setSelectedTask(task)} />
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
      {selectedTask && (
        <EditTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}