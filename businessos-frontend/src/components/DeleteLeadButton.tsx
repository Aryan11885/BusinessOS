"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteLead } from "@/services/api";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteLeadButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteLead(String(id));
      router.push("/leads");
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      {isDeleting ? "Deleting..." : "Delete Lead"}
    </button>
  );
}