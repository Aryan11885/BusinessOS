import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getProjects } from "@/services/api";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Project
        </Link>
      </div>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-3 text-left">
              Project
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Progress
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project: any) => (
            <tr
              key={project.id}
              className="border-t"
            >
              <td className="p-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.name}
                </Link>
              </td>

              <td className="p-3">
                {project.status}
              </td>

              <td className="p-3">
                {project.progress}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}