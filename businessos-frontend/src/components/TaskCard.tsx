import { Flag } from "lucide-react";

type Task = {
  id: number;
  title: string;
  priority: string;
  assignee?: string;
};

type Props = {
  task: Task;
  onClick?: () => void;
};

const PRIORITY_STYLES: Record<string, { badge: string; border: string }> = {
  HIGH: { badge: "bg-red-50 text-red-700", border: "border-l-red-400" },
  MEDIUM: { badge: "bg-amber-50 text-amber-700", border: "border-l-amber-400" },
  LOW: { badge: "bg-emerald-50 text-emerald-700", border: "border-l-emerald-400" },
};

export default function TaskCard({ task, onClick }: Props) {
  const style = PRIORITY_STYLES[task.priority] ?? {
    badge: "bg-slate-100 text-slate-600",
    border: "border-l-slate-300",
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      className={`bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 ${style.border} p-4 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${style.badge}`}
        >
          <Flag className="w-3 h-3" />
          {task.priority}
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 mt-3 leading-snug">
        {task.title}
      </h3>

      <div className="flex items-center mt-4 gap-2">
        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
          {task.assignee ? task.assignee.charAt(0).toUpperCase() : "?"}
        </div>

        <span className="text-sm text-slate-500 truncate">
          {task.assignee || "Unassigned"}
        </span>
      </div>
    </div>
  );
}