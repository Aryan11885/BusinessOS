import AppLayout from "@/components/AppLayout";
import { getProjectById, getTasks } from "@/services/api";
import ProgressBar from "@/components/ProgressBar";
import KanbanBoard from "@/components/KanbanBoard";
import ProjectWorkspace from "@/components/ProjectWorkspace";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const project = await getProjectById(id);
  const allTasks = await getTasks();

  const tasks = allTasks.filter((task: any) => task.project_id === Number(id));

  return (
    <AppLayout>
      <ProjectWorkspace project={project} tasks={tasks} />
    </AppLayout>
  );
}
