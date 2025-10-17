// src/components/tutor-courses/EmptyState.jsx
import { PlusCircle, MoreVertical } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
      <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
        <MoreVertical className="w-5 h-5 text-slate-400" />
      </div>
      <h3 className="mt-5 text-slate-900 font-semibold text-lg">
        Aún no hay cursos
      </h3>
      <p className="text-slate-600 text-sm mt-1">
        Publicá tu primer curso para que aparezca en este listado.
      </p>
      <a
        href="/create-course"
        className="inline-flex items-center gap-2 mt-5 bg-slate-900 text-white px-4 py-2 rounded-xl hover:shadow"
      >
        <PlusCircle className="w-5 h-5" />
        Crear curso
      </a>
    </div>
  );
}
