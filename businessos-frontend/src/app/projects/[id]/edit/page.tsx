import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getProjectById } from "@/services/api";
import EditProjectForm from "@/components/EditProjectForm";
import { ArrowLeft } from "lucide-react";

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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Edit Project
          </h1>

          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <EditProjectForm project={project} />
      </div>
    </AppLayout>
  );
}