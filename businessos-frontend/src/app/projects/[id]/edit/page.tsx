import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getProjectById } from "@/services/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: Props) {
  const { id } = await params;

  const project = await getProjectById(id);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Edit Project
          </h1>

          <Link
            href={`/projects/${id}`}
            className="text-blue-600"
          >
            ← Back
          </Link>

        </div>

        <form className="bg-white rounded-xl shadow p-8 space-y-5">

          <div>

            <label className="font-medium">
              Project Name
            </label>

            <input
              defaultValue={project.name}
              className="border rounded-lg w-full mt-2 p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Description
            </label>

            <textarea
              defaultValue={project.description}
              className="border rounded-lg w-full mt-2 p-3"
              rows={5}
            />

          </div>

          <div>

            <label className="font-medium">
              Status
            </label>

            <select
              defaultValue={project.status}
              className="border rounded-lg w-full mt-2 p-3"
            >
              <option value="NOT_STARTED">
                NOT_STARTED
              </option>

              <option value="IN_PROGRESS">
                IN_PROGRESS
              </option>

              <option value="COMPLETED">
                COMPLETED
              </option>

            </select>

          </div>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Update Project
          </button>

        </form>

      </div>
    </AppLayout>
  );
}