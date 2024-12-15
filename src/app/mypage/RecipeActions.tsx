"use client";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

export default function RecipeActions({ recipeId }: { recipeId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("삭제 실패");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/recipes/${recipeId}/edit`}>
        <FiEdit className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />
      </Link>
      <button onClick={handleDelete}>
        <FiTrash2 className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer" />
      </button>
    </div>
  );
}
