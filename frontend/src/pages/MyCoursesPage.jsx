// src/pages/MyCoursesPage.jsx
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Play,
  Clock,
  Star,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  TrendingUp,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

/**
 * Página "Mis Cursos" (Student)
 * - Lista de cursos donde el alumno está inscripto
 * - Búsqueda, filtros (estado/etiquetas), orden, paginación
 * - Tarjetas aireadas con CTA "Continuar"
 * - Badge del estilo de aprendizaje (si existe) y CTA al test si falta
 *
 * 👉 Reemplazá fetchMyCourses() por tu API real.
 */

const TAGS = [
  { key: "visual", label: "Visual" },
  { key: "auditive", label: "Auditiva" },
  { key: "reading_writing", label: "Lectura/Escritura" },
  { key: "kinesthetic", label: "Kinestésico" },
  { key: "intro", label: "Principiante" },
  { key: "project", label: "Proyecto" },
];

const PROGRESS_STATE = [
  { key: "in_progress", label: "En curso" },
  { key: "not_started", label: "No iniciado" },
  { key: "completed", label: "Completado" },
];

// 🎯 Simulación API (reemplazar)
async function fetchMyCourses() {
  await new Promise((r) => setTimeout(r, 500));
  return [
    {
      id: "m1",
      title: "Fundamentos de Diseño Visual",
      description:
        "Aprendé composición, color, tipografía y narrativa visual con ejercicios guiados.",
      tags: ["visual", "intro"],
      cover: null,
      progressPct: 42,
      lessonsDone: 8,
      lessonsTotal: 19,
      lastAccess: "2025-10-14T18:10:00Z",
      rating: 4.7,
      durationHours: 7.5,
    },
    {
      id: "m2",
      title: "Aprender con Música: Ritmo y Memoria",
      description:
        "Estrategias auditivas para estudiar con playlists, mnemotecnia y patrones rítmicos.",
      tags: ["auditive", "project"],
      cover: null,
      progressPct: 0,
      lessonsDone: 0,
      lessonsTotal: 12,
      lastAccess: null,
      rating: 4.6,
      durationHours: 5,
    },
    {
      id: "m3",
      title: "Lectura Eficiente y Toma de Apuntes",
      description:
        "Técnicas de subrayado, resúmenes y organización de notas para absorber textos con foco.",
      tags: ["reading_writing", "intro"],
      cover: null,
      progressPct: 100,
      lessonsDone: 15,
      lessonsTotal: 15,
      lastAccess: "2025-10-10T09:00:00Z",
      rating: 4.8,
      durationHours: 4,
    },
    {
      id: "m4",
      title: "Laboratorio Maker: Proyectos Kinestésicos",
      description:
        "Poné manos a la obra con prototipos, experimentos y desafíos prácticos.",
      tags: ["kinesthetic", "project"],
      cover: null,
      progressPct: 68,
      lessonsDone: 17,
      lessonsTotal: 25,
      lastAccess: "2025-10-16T16:45:00Z",
      rating: 4.5,
      durationHours: 12,
    },
  ];
}

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Controles
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [tag, setTag] = useState("all");
  const [sortBy, setSortBy] = useState("recent"); // recent | progress_desc | rating_desc | title_asc

  // Paginación
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Learning style
  const [lsResult, setLsResult] = useState(null);
  const [lsPending, setLsPending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMyCourses();
        setCourses(data);
      } catch (e) {
        console.error(e);
        setErr("No pudimos cargar tus cursos. Intentá de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    try {
      const r = localStorage.getItem("learningStyle.result");
      const p = localStorage.getItem("learningStyle.pending");
      setLsResult(r ? JSON.parse(r) : null);
      setLsPending(p ? JSON.parse(p)?.required === true : false);
    } catch {
      setLsResult(null);
      setLsPending(false);
    }
  }, []);

  const filtered = useMemo(() => {
    let list = [...courses];

    // búsqueda
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }

    // estado por progreso
    if (state !== "all") {
      list = list.filter((c) => {
        if (state === "in_progress")
          return c.progressPct > 0 && c.progressPct < 100;
        if (state === "not_started") return c.progressPct === 0;
        if (state === "completed") return c.progressPct === 100;
        return true;
      });
    }

    // etiqueta
    if (tag !== "all") {
      list = list.filter((c) => c.tags?.includes(tag));
    }

    // orden
    switch (sortBy) {
      case "recent":
        list.sort(
          (a, b) =>
            new Date(b.lastAccess || 0).getTime() -
            new Date(a.lastAccess || 0).getTime(),
        );
        break;
      case "progress_desc":
        list.sort((a, b) => b.progressPct - a.progressPct);
        break;
      case "rating_desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "title_asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [courses, query, state, tag, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [query, state, tag, sortBy]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const styleChip = useMemo(() => {
    if (!lsResult?.dominantStyle) return null;
    const m = mapStyleMeta(lsResult.dominantStyle);
    return (
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${m.chip}`}
        title="Estilo de aprendizaje sugerido"
      >
        <Sparkles className="w-3.5 h-3.5" />
        {m.label}
      </span>
    );
  }, [lsResult]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Mis Cursos
              </h1>
              <p className="text-slate-600 text-sm">
                {user?.username ? `Hola, ${user.username}. ` : ""}
                Continuá donde quedaste o descubrí nuevas rutas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {styleChip}
            {(!lsResult || lsPending) && (
              <a
                href="/learning-styles"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white hover:shadow"
              >
                <TrendingUp className="w-4 h-4" />
                Hacer test de aprendizaje
              </a>
            )}
          </div>
        </header>

        {/* Controles */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="grid md:grid-cols-4 gap-3">
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="all">Todos</option>
                  {PROGRESS_STATE.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Etiqueta */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Etiqueta
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="all">Todas</option>
                {TAGS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
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
                <option value="recent">Más reciente</option>
                <option value="progress_desc">Más avanzado</option>
                <option value="rating_desc">Mejor calificados</option>
                <option value="title_asc">Título (A–Z)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Estado de carga/error */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-700" />
          </div>
        )}
        {err && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-4">
            {err}
          </div>
        )}

        {/* Lista */}
        {!loading && !err && (
          <>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((c) => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>

                {/* Paginación */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Página {page} de {totalPages} — {filtered.length} curso
                    {filtered.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------- Subcomponentes ----------------- */

function CourseCard({ course }) {
  const state = getState(course.progressPct);
  const tags = (course.tags || []).slice(0, 3); // máx 3 visibles

  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
      {/* Header visual */}
      <div className="h-28 bg-gradient-to-r from-slate-700 to-slate-900 relative">
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${state.chip}`}
          >
            {state.label}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-white/90 rounded-full transition-all"
              style={{ width: `${course.progressPct}%` }}
            />
          </div>
          <div className="mt-1 text-[11px] text-white/90 flex justify-between">
            <span>{course.progressPct}%</span>
            <span>
              {course.lessonsDone}/{course.lessonsTotal} lecciones
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg line-clamp-2">
            {course.title}
          </h3>
          <p className="text-slate-600 text-sm mt-1 line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Metas rápidas */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <Badge
            icon={<Clock className="w-4 h-4" />}
            label={`${course.durationHours} h`}
          />
          <Badge
            icon={<Star className="w-4 h-4" />}
            label={course.rating ? course.rating.toFixed(1) : "—"}
          />
          <Badge icon={<Play className="w-4 h-4" />} label="Continuo" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => {
            const meta = mapTag(t);
            return (
              <span
                key={t}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${meta.chip}`}
              >
                {meta.label}
              </span>
            );
          })}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <a
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:shadow"
          >
            <Play className="w-4 h-4" />
            {course.progressPct === 0 ? "Empezar" : "Continuar"}
          </a>
        </div>
      </div>
    </article>
  );
}

function Badge({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
        <Award className="w-5 h-5 text-slate-400" />
      </div>
      <h3 className="mt-4 text-slate-900 font-semibold">
        Todavía no tenés cursos
      </h3>
      <p className="text-slate-600 text-sm mt-1">
        Explorá el catálogo y empezá tu primera ruta de aprendizaje.
      </p>
      <a
        href="/courses"
        className="inline-flex items-center gap-2 mt-4 bg-slate-900 text-white px-4 py-2 rounded-xl hover:shadow"
      >
        <BookOpen className="w-5 h-5" />
        Explorar cursos
      </a>
    </div>
  );
}

/* ----------------- Helpers ----------------- */

function getState(progressPct) {
  if (progressPct >= 100)
    return {
      label: "Completado",
      chip: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    };
  if (progressPct <= 0)
    return {
      label: "No iniciado",
      chip: "bg-slate-100 text-slate-700 border border-slate-200",
    };
  return {
    label: "En curso",
    chip: "bg-amber-100 text-amber-700 border border-amber-200",
  };
}

function mapTag(tagKey) {
  switch (tagKey) {
    case "visual":
      return {
        label: "Visual",
        chip: "bg-indigo-100 text-indigo-800 border-indigo-200",
      };
    case "auditive":
      return {
        label: "Auditiva",
        chip: "bg-cyan-100 text-cyan-800 border-cyan-200",
      };
    case "reading_writing":
      return {
        label: "Lectura/Escritura",
        chip: "bg-amber-100 text-amber-800 border-amber-200",
      };
    case "kinesthetic":
      return {
        label: "Kinestésico",
        chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    case "intro":
      return {
        label: "Principiante",
        chip: "bg-purple-100 text-purple-800 border-purple-200",
      };
    case "project":
      return {
        label: "Proyecto",
        chip: "bg-pink-100 text-pink-800 border-pink-200",
      };
    default:
      return {
        label: tagKey,
        chip: "bg-slate-100 text-slate-700 border-slate-200",
      };
  }
}

function mapStyleMeta(styleKey) {
  switch (styleKey) {
    case "visual":
      return {
        label: "Estilo Visual",
        chip: "bg-indigo-100 text-indigo-800 border-indigo-200",
      };
    case "auditive":
      return {
        label: "Estilo Auditivo",
        chip: "bg-cyan-100 text-cyan-800 border-cyan-200",
      };
    case "reading_writing":
      return {
        label: "Lectura/Escritura",
        chip: "bg-amber-100 text-amber-800 border-amber-200",
      };
    case "kinesthetic":
      return {
        label: "Kinestésico",
        chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    default:
      return {
        label: "Mi estilo",
        chip: "bg-slate-100 text-slate-700 border-slate-200",
      };
  }
}
