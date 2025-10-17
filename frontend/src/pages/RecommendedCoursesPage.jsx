// src/pages/RecommendedCoursesPage.jsx
import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  Star,
  Clock,
  BookOpen,
  Filter,
  CheckCircle2,
  Flame,
  Brain,
  Compass,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

/**
 * RecommendedCoursesPage (Student)
 * - Lee el resultado del test desde localStorage ("learningStyle.result" / "learningStyle.pending")
 * - Recomienda cursos ponderando estilo de aprendizaje + intereses
 * - Búsqueda, filtros, orden, paginación
 * - Cards aireadas y claras con CTA "Inscribirme"
 *
 * 👉 Reemplazá fetchCatalog() y enrollInCourse() por tus endpoints reales.
 */

// Simulación de catálogo (reemplazar por API real)
async function fetchCatalog() {
  await new Promise((r) => setTimeout(r, 550));
  return [
    {
      id: "r1",
      title: "Diseño Visual: de 0 a 1",
      description:
        "Aprendé color, composición, tipografía y narrativa visual con proyectos guiados.",
      learningStyle: "visual",
      interests: ["art_media", "business"],
      rating: 4.8,
      durationHours: 7,
      lessons: 18,
      popular: true,
      tags: ["visual", "intro"],
    },
    {
      id: "r2",
      title: "Memoria Auditiva con Música",
      description:
        "Estrategias auditivas: playlists, ritmos y mnemotecnia para recordar conceptos.",
      learningStyle: "auditive",
      interests: ["art_media"],
      rating: 4.6,
      durationHours: 5,
      lessons: 12,
      popular: false,
      tags: ["auditive", "project"],
    },
    {
      id: "r3",
      title: "Lectura Eficiente + Apuntes",
      description:
        "Técnicas de lectura, subrayado y resúmenes para absorber textos con foco.",
      learningStyle: "reading_writing",
      interests: ["business"],
      rating: 4.7,
      durationHours: 4.5,
      lessons: 14,
      popular: true,
      tags: ["reading_writing", "intro"],
    },
    {
      id: "r4",
      title: "Laboratorio Maker: Proyectos Kinestésicos",
      description:
        "Aprendé haciendo: prototipos, experimentos y desafíos prácticos.",
      learningStyle: "kinesthetic",
      interests: ["ai_tech", "energy_sustain"],
      rating: 4.5,
      durationHours: 10,
      lessons: 22,
      popular: false,
      tags: ["kinesthetic", "project"],
    },
    {
      id: "r5",
      title: "Introducción a IA para Creativos",
      description:
        "Explorá IA aplicada a medios digitales, prompts y flujos de trabajo.",
      learningStyle: "visual",
      interests: ["ai_tech", "art_media"],
      rating: 4.9,
      durationHours: 6,
      lessons: 16,
      popular: true,
      tags: ["visual", "project"],
    },
    {
      id: "r6",
      title: "Sustentabilidad y Energías Renovables",
      description:
        "Fundamentos de energía limpia, casos reales y mini-proyectos.",
      learningStyle: "reading_writing",
      interests: ["energy_sustain"],
      rating: 4.4,
      durationHours: 8,
      lessons: 17,
      popular: false,
      tags: ["reading_writing", "project"],
    },
  ];
}

// Simulación de inscripción (reemplazar por API real)
async function enrollInCourse(courseId) {
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, courseId };
}

const TAGS = [
  { key: "visual", label: "Visual" },
  { key: "auditive", label: "Auditiva" },
  { key: "reading_writing", label: "Lectura/Escritura" },
  { key: "kinesthetic", label: "Kinestésico" },
  { key: "intro", label: "Principiante" },
  { key: "project", label: "Proyecto" },
];

const ORDER = [
  { key: "score_desc", label: "Mejor para mí" },
  { key: "rating_desc", label: "Mejor calificados" },
  { key: "duration_asc", label: "Más cortos" },
  { key: "title_asc", label: "Título (A–Z)" },
];

export default function RecommendedCoursesPage() {
  const { user } = useAuth();

  // catálago
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // preferencias del test
  const [lsResult, setLsResult] = useState(null);
  const [lsPending, setLsPending] = useState(false);

  // controles UI
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [sortBy, setSortBy] = useState("score_desc");

  // paginación
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // estado de enrolamiento simulado
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrolledIds, setEnrolledIds] = useState(() => new Set());

  // cargar catálogo
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await fetchCatalog();
        setCatalog(data);
      } catch (e) {
        console.error(e);
        setErr("No pudimos cargar recomendaciones. Probá de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // leer test
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

  // score de recomendación
  function score(course) {
    let s = 0;
    // match de estilo (peso alto)
    if (
      lsResult?.dominantStyle &&
      course.learningStyle === lsResult.dominantStyle
    ) {
      s += 10;
    }
    // intereses (peso medio: 3 por match)
    if (Array.isArray(lsResult?.interests) && Array.isArray(course.interests)) {
      const set = new Set(lsResult.interests);
      const overlap = course.interests.reduce(
        (acc, i) => acc + (set.has(i) ? 1 : 0),
        0,
      );
      s += overlap * 3;
    }
    // popularidad + rating
    if (course.popular) s += 2;
    s += Math.min(5, Math.max(0, (course.rating || 0) - 4)) * 1.5; // 0–1.5 aprox si >4
    return s;
  }

  // lista derivada
  const enriched = useMemo(
    () =>
      catalog.map((c) => ({
        ...c,
        _score: score(c),
      })),
    [catalog, lsResult],
  );

  const filtered = useMemo(() => {
    let list = [...enriched];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }

    if (tag !== "all") {
      list = list.filter((c) => c.tags?.includes(tag));
    }

    if (onlyPopular) {
      list = list.filter((c) => c.popular);
    }

    switch (sortBy) {
      case "score_desc":
        list.sort((a, b) => b._score - a._score);
        break;
      case "rating_desc":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "duration_asc":
        list.sort((a, b) => (a.durationHours || 0) - (b.durationHours || 0));
        break;
      case "title_asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [enriched, query, tag, onlyPopular, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [query, tag, onlyPopular, sortBy]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  async function handleEnroll(id) {
    try {
      setEnrollingId(id);
      const res = await enrollInCourse(id);
      if (res?.ok) {
        const next = new Set(enrolledIds);
        next.add(id);
        setEnrolledIds(next);
      }
    } finally {
      setEnrollingId(null);
    }
  }

  // estilo chip (si existe resultado de test)
  const styleChip = lsResult?.dominantStyle && (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-slate-100 text-slate-800 border-slate-200">
      <Brain className="w-3.5 h-3.5" />
      {mapStyleLabel(lsResult.dominantStyle)}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Cursos Recomendados
              </h1>
              <p className="text-slate-600 text-sm">
                {user?.username ? `Hola, ${user.username}. ` : ""}
                Elegimos estas opciones para vos según tu forma de aprender.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {styleChip}
            {(!lsResult || lsPending) && (
              <a
                href="/learning-styles"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white hover:shadow"
              >
                <Compass className="w-4 h-4" />
                Hacer/actualizar test
              </a>
            )}
          </div>
        </header>

        {/* Controles */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="grid md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Buscar
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Título o descripción…"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

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

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                {ORDER.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyPopular}
                  onChange={(e) => setOnlyPopular(e.target.checked)}
                  className="rounded border-slate-300 text-slate-700 focus:ring-slate-500"
                />
                <Filter className="w-4 h-4" />
                Solo populares
              </label>
            </div>
          </div>
        </section>

        {/* Estados */}
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
                    <CourseCard
                      key={c.id}
                      course={c}
                      score={c._score}
                      enrolling={enrollingId === c.id}
                      enrolled={enrolledIds.has(c.id)}
                      onEnroll={() => handleEnroll(c.id)}
                    />
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

function CourseCard({ course, score, onEnroll, enrolling, enrolled }) {
  const state = course.popular
    ? "bg-amber-100 text-amber-700 border border-amber-200"
    : "bg-slate-100 text-slate-700 border border-slate-200";

  const styleChip = styleTagChip(course.learningStyle);

  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-slate-700 to-slate-900 relative">
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${state}`}
          >
            {course.popular ? (
              <>
                <Flame className="w-3.5 h-3.5 mr-1" />
                Popular
              </>
            ) : (
              "Sugerido"
            )}
          </span>
          {styleChip}
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 text-[11px] rounded bg-white/10 text-white border border-white/20">
          score {Math.round(score)}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-[11px]">
          <div className="inline-flex items-center gap-1">
            <Star className="w-3.5 h-3.5" /> {course.rating}
          </div>
          <div className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {course.durationHours} h
          </div>
          <div className="inline-flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> {course.lessons} lecciones
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg line-clamp-2">
            {course.title}
          </h3>
          <p className="text-slate-600 text-sm mt-1 line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {(course.tags || []).map((t) => {
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
        <div className="pt-2 flex items-center justify-between">
          <a
            href={`/courses/${course.id}`}
            className="text-slate-800 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-50 inline-flex items-center gap-2"
          >
            Ver curso
          </a>
          <button
            onClick={onEnroll}
            disabled={enrolling || enrolled}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
              enrolled
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-900 text-white hover:shadow"
            } disabled:opacity-70`}
            title={enrolled ? "Ya estás inscripto" : "Inscribirme"}
          >
            {enrolled ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Inscripto
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                {enrolling ? "Inscribiendo..." : "Inscribirme"}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-slate-400" />
      </div>
      <h3 className="mt-4 text-slate-900 font-semibold">
        Aún no hay recomendaciones
      </h3>
      <p className="text-slate-600 text-sm mt-1">
        Hacé el test de aprendizaje para obtener sugerencias personalizadas.
      </p>
      <a
        href="/learning-styles"
        className="inline-flex items-center gap-2 mt-4 bg-slate-900 text-white px-4 py-2 rounded-xl hover:shadow"
      >
        <Compass className="w-5 h-5" />
        Ir al test
      </a>
    </div>
  );
}

/* ----------------- Helpers ----------------- */

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

function mapStyleLabel(styleKey) {
  switch (styleKey) {
    case "visual":
      return "Visual";
    case "auditive":
      return "Auditivo";
    case "reading_writing":
      return "Lectura/Escritura";
    case "kinesthetic":
      return "Kinestésico";
    default:
      return "Mi estilo";
  }
}

function styleTagChip(styleKey) {
  switch (styleKey) {
    case "visual":
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium border bg-indigo-100 text-indigo-800 border-indigo-200">
          Visual
        </span>
      );
    case "auditive":
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium border bg-cyan-100 text-cyan-800 border-cyan-200">
          Auditivo
        </span>
      );
    case "reading_writing":
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium border bg-amber-100 text-amber-800 border-amber-200">
          Lectura/Escritura
        </span>
      );
    case "kinesthetic":
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium border bg-emerald-100 text-emerald-800 border-emerald-200">
          Kinestésico
        </span>
      );
    default:
      return null;
  }
}
