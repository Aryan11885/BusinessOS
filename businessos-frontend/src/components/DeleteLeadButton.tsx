"use client";

import { useRouter } from "next/navigation";
import { deleteLead } from "@/services/api";

export default function DeleteLeadButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this lead?"
    );

    if (!confirmed) return;

    await deleteLead(String(id));

    router.push("/leads");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete Lead
    </button>
  );
}