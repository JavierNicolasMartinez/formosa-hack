// src/components/tutor-courses/FiltersBar.jsx
import { Layers, Search, SlidersHorizontal } from "lucide-react";
import { LEARNING_STYLES, STATUS } from "../../pages/TutorCoursesPage";

export default function FiltersBar({
  query,
  setQuery,
  status,
  setStatus,
  style,
  setStyle,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Buscar */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Buscar
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Título o descripción…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Estado
          </label>
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="all">Todos</option>
              {STATUS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estilo */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Tipo de enseñanza
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="all">Todos</option>
              {LEARNING_STYLES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orden */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="updated_desc">Más recientes (actualización)</option>
            <option value="students_desc">Más estudiantes</option>
            <option value="rating_desc">Mejor calificados</option>
            <option value="title_asc">Título (A–Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
