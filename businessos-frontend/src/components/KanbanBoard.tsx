import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee?: string;
};

type Props = {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
};

const COLUMN_ACCENTS: Record<string, string> = {
  TODO: "bg-slate-400",
  "IN PROGRESS": "bg-indigo-500",
  REVIEW: "bg-amber-500",
  DONE: "bg-emerald-500",
};

export default function KanbanBoard({ tasks, onTaskClick }: Props) {
  const todo = tasks.filter((task) => task.status === "TODO");
  const progress = tasks.filter((task) => task.status === "IN_PROGRESS");
  const review = tasks.filter((task) => task.status === "REVIEW");
  const done = tasks.filter((task) => task.status === "DONE");

  const columns = [
    { title: "TODO", items: todo },
    { title: "IN PROGRESS", items: progress },
    { title: "REVIEW", items: review },
    { title: "DONE", items: done },
  ];

  return (
    <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory lg:overflow-visible">
      {columns.map((column) => (
        <div
          key={column.title}
          className="bg-slate-50 border border-slate-100 rounded-xl p-4 min-h-[400px] sm:min-h-[500px] shrink-0 w-[80vw] xs:w-72 sm:w-80 lg:w-auto snap-start"
        >
          <h2 className="font-semibold text-sm text-slate-700 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  COLUMN_ACCENTS[column.title] ?? "bg-slate-400"
                }`}
              />
              {column.title}
            </span>

            <span className="bg-white border border-slate-200 rounded-full px-2 py-0.5 text-xs font-medium text-slate-500">
              {column.items.length}
            </span>
          </h2>

          <div className="space-y-3">
            {column.items.length === 0 ? (
              <div className="flex items-center justify-center text-center py-10 border border-dashed border-slate-200 rounded-lg">
                <p className="text-xs text-slate-400">No tasks here</p>
              </div>
            ) : (
              column.items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick?.(task)}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}