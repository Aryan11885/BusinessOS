import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getProjectById } from "@/services/api";
import EditProjectForm from "@/components/EditProjectForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  const project = await getProjectById(id);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Project</h1>

          <Link href={`/projects/${id}`} className="text-blue-600">
            ← Back
          </Link>
        </div>

        <EditProjectForm project={project} />
      </div>
    </AppLayout>
  );
}
