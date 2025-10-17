// src/components/tutor-courses/CourseCard.jsx
import { BookOpen, Eye, Edit3, Trash2, Star, Users } from "lucide-react";

const STYLE_THEME = {
  visual: {
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    chip: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
    ring: "ring-fuchsia-100",
  },
  auditive: {
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    chip: "bg-cyan-100 text-cyan-800 border-cyan-200",
    ring: "ring-cyan-100",
  },
  reading_writing: {
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    chip: "bg-amber-100 text-amber-800 border-amber-200",
    ring: "ring-amber-100",
  },
  kinesthetic: {
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
    ring: "ring-emerald-100",
  },
};

function getStyleTheme(learningStyle) {
  return STYLE_THEME[learningStyle] ?? STYLE_THEME.visual;
}

function StatusBadge({ status }) {
  const map = {
    published: "bg-green-100 text-green-800 border border-green-200",
    draft: "bg-slate-100 text-slate-700 border border-slate-200",
    archived: "bg-rose-100 text-rose-800 border border-rose-200",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${map[status] || map.draft}`}
    >
      {status === "published"
        ? "Publicado"
        : status === "archived"
          ? "Archivado"
          : "Borrador"}
    </span>
  );
}

function Metric({ icon, label }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
      {icon}
      <span className="leading-relaxed">{label}</span>
    </div>
  );
}

export default function CourseCard({ course, onPublishToggle, onDelete }) {
  const theme = getStyleTheme(course.learningStyle);
  const updated = new Date(course.updatedAt).toLocaleString();
  const styleLabel =
    {
      visual: "Visual",
      auditive: "Auditiva",
      reading_writing: "Lectura/Escritura",
      kinesthetic: "Práctica/Kinestésica",
    }[course.learningStyle] || "—";

  return (
    <div
      className={`bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 ring-1 ${theme.ring} hover:-translate-y-0.5`}
    >
      {/* Header con más altura y aire */}
      <div
        className={`h-32 md:h-36 bg-gradient-to-r ${theme.gradient} relative`}
      >
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(60%_60%_at_20%_0%,_white,_transparent)]" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <StatusBadge status={course.status} />
          <span
            className={`px-2.5 py-1 text-[12px] rounded-full ${theme.chip} border`}
          >
            {styleLabel}
          </span>
        </div>

        {/* Icono decorativo con más espacio */}
        <div className="absolute -bottom-5 right-5 hidden md:flex w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 items-center justify-center shadow-md">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Body: padding más generoso y mayor separación vertical */}
      <div className="p-6 md:p-7 space-y-5">
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 text-lg md:text-xl leading-snug">
            {course.title}
          </h3>
          <p className="text-slate-600 text-[15px] md:text-base leading-relaxed line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Métricas: más gap y chips más grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <Metric
            icon={<Users className="w-4 h-4" />}
            label={`${course.students} alumnos`}
          />
          <Metric
            icon={<BookOpen className="w-4 h-4" />}
            label={`${course.lessons} lecciones`}
          />
          <Metric
            icon={<Star className="w-4 h-4" />}
            label={course.rating ? `${course.rating.toFixed(1)} ★` : "—"}
          />
        </div>

        <div className="pt-2 text-[12px] md:text-sm text-slate-500">
          Actualizado: {updated}
        </div>

        {/* Footer: separado por borde y más padding */}
        <div className="pt-5 mt-2 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <a
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-2 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-xl hover:bg-slate-50"
              title="Ver curso"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Ver</span>
            </a>
            <a
              href={`/courses/${course.id}/edit`}
              className="inline-flex items-center gap-2 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-xl hover:bg-slate-50"
              title="Editar curso"
            >
              <Edit3 className="w-4 h-4" />
              <span className="text-sm font-medium">Editar</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPublishToggle}
              className="inline-flex items-center gap-2 text-white bg-slate-900 px-4 py-2 rounded-xl hover:shadow font-medium"
              title={
                course.status === "published" ? "Pasar a borrador" : "Publicar"
              }
            >
              {course.status === "published" ? "Despublicar" : "Publicar"}
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl hover:bg-rose-50 font-medium"
              title="Eliminar curso"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
