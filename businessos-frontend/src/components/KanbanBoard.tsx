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

export default function KanbanBoard({
  tasks,
  onTaskClick,
}: Props) {
  const todo = tasks.filter((task) => task.status === "TODO");

  const progress = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const review = tasks.filter(
    (task) => task.status === "REVIEW"
  );

  const done = tasks.filter((task) => task.status === "DONE");

  const columns = [
    {
      title: "TODO",
      items: todo,
    },
    {
      title: "IN PROGRESS",
      items: progress,
    },
    {
      title: "REVIEW",
      items: review,
    },
    {
      title: "DONE",
      items: done,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((column) => (
        <div
          key={column.title}
          className="bg-slate-100 rounded-xl p-4 min-h-[500px]"
        >
          <h2 className="font-bold text-lg mb-4 flex justify-between">
            <span>{column.title}</span>

            <span className="bg-white rounded-full px-2 text-sm">
              {column.items.length}
            </span>
          </h2>

          <div className="space-y-3">
            {column.items.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick?.(task)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}