type Task = {
  id: number;
  title: string;
  priority: string;
  assignee: string;
};

export default function TaskCard({
  task,
}: {
  task: Task;
}) {
  const priorityColor = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl shadow border p-4 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColor[
              task.priority as keyof typeof priorityColor
            ]
          }`}
        >
          {task.priority}
        </span>

      </div>

      <h3 className="font-semibold mt-4">
        {task.title}
      </h3>

      <div className="flex items-center justify-between mt-6">

        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

            {task.assignee?.charAt(0)}

          </div>

          <span className="text-sm">
            {task.assignee}
          </span>

        </div>

      </div>

    </div>
  );
}