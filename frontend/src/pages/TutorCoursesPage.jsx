// src/pages/TutorCoursesPage.jsx
import { useEffect, useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import { PlusCircle, BookOpen } from "lucide-react";
import FiltersBar from "../components/tutor-courses/FiltersBar";
import CourseCard from "../components/tutor-courses/CourseCard";
import PaginationBar from "../components/tutor-courses/PaginationBar";
import EmptyState from "../components/tutor-courses/EmptyState";

export const LEARNING_STYLES = [
  { key: "visual", label: "Visual" },
  { key: "auditive", label: "Auditiva" },
  { key: "reading_writing", label: "Lectura/Escritura" },
  { key: "kinesthetic", label: "Práctica/Kinestésica" },
];

export const STATUS = [
  { key: "published", label: "Publicado" },
  { key: "draft", label: "Borrador" },
  { key: "archived", label: "Archivado" },
];

// Simulación de API (reemplazá con tu servicio real)
async function fetchCoursesAPI() {
  await new Promise((r) => setTimeout(r, 600));
  return [
    {
      id: "c1",
      title: "Aprender con música",
      description:
        "Un enfoque auditivo para interiorizar conceptos a través del ritmo y la melodía.",
      learningStyle: "auditive",
      status: "published",
      students: 25,
      rating: 4.8,
      lessons: 12,
      updatedAt: "2025-10-12T15:10:00Z",
      thumbnail: null,
    },
    {
      id: "c2",
      title: "Diseño Visual y Creatividad",
      description:
        "Curso visual con ejercicios prácticos de composición, color y narrativa.",
      learningStyle: "visual",
      status: "published",
      students: 15,
      rating: 4.6,
      lessons: 9,
      updatedAt: "2025-10-15T09:30:00Z",
      thumbnail: null,
    },
    {
      id: "c3",
      title: "Lectura Comprensiva",
      description:
        "Estrategias de lectura/escritura para mejorar la comprensión y la memoria.",
      learningStyle: "reading_writing",
      status: "draft",
      students: 5,
      rating: 4.2,
      lessons: 6,
      updatedAt: "2025-10-10T12:00:00Z",
      thumbnail: null,
    },
    {
      id: "c4",
      title: "Laboratorio Kinestésico",
      description:
        "Aprendizaje basado en la práctica con proyectos de construcción y experimentos.",
      learningStyle: "kinesthetic",
      status: "archived",
      students: 0,
      rating: 0,
      lessons: 4,
      updatedAt: "2025-10-01T17:20:00Z",
      thumbnail: null,
    },
  ];
}

export default function TutorCoursesPage() {
  const { user } = useAuth();

  // Datos
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Controles UI
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [style, setStyle] = useState("all");
  const [sortBy, setSortBy] = useState("updated_desc");

  // Paginación
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await fetchCoursesAPI(); // 🔁 Reemplazar por tu API real
        setCourses(data);
      } catch (e) {
        console.error(e);
        setErr("No se pudieron cargar tus cursos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filtro + búsqueda + orden
  const filtered = useMemo(() => {
    let list = [...courses];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }
    if (status !== "all") list = list.filter((c) => c.status === status);
    if (style !== "all") list = list.filter((c) => c.learningStyle === style);

    switch (sortBy) {
      case "updated_desc":
        list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case "students_desc":
        list.sort((a, b) => b.students - a.students);
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
  }, [courses, query, status, style, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [query, status, style, sortBy]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Acciones simuladas
  async function handlePublishToggle(courseId) {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              status: c.status === "published" ? "draft" : "published",
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    );
  }

  async function handleDelete(courseId) {
    if (!confirm("¿Seguro que deseas eliminar este curso?")) return;
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Mis cursos publicados
              </h1>
              <p className="text-slate-600 text-sm">
                {user?.username ? `Hola, ${user.username}. ` : ""}Gestiona y
                optimiza tus cursos.
              </p>
            </div>
          </div>

          <a
            href="/create-course"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition"
          >
            <PlusCircle className="w-5 h-5" />
            Crear curso
          </a>
        </div>

        {/* Filtros */}
        <FiltersBar
          query={query}
          setQuery={setQuery}
          status={status}
          setStatus={setStatus}
          style={style}
          setStyle={setStyle}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Estado de carga/error */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 flex items-center justify-center">
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
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onPublishToggle={() => handlePublishToggle(course.id)}
                      onDelete={() => handleDelete(course.id)}
                    />
                  ))}
                </div>

                <PaginationBar
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                  totalItems={filtered.length}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
