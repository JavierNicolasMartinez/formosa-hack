// src/components/tutor-courses/PaginationBar.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationBar({
  page,
  setPage,
  totalPages,
  totalItems,
}) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <span className="text-sm text-slate-600">
        Página {page} de {totalPages} — {totalItems} curso
        {totalItems !== 1 ? "s" : ""}
      </span>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
