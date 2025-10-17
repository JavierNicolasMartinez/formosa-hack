// src/pages/CourseSearchPage.jsx
import { useState, useMemo } from "react";
import {
  Search,
  Users,
  BookOpen,
  Star,
  Clock,
  User,
  X,
  Target,
  Book,
  Palette,
  Cpu,
  Leaf,
  Lightbulb,
  Eye,
  Headphones,
  Mic,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceListCourses from "../components/VoiceListCourses";

const IMAGES = {
  python:
    "https://wallpapers.com/images/hd/4k-programming-python-coding-logo-6suq19bkkzq27mai.jpg",
  comunicacion:
    "https://img.freepik.com/vector-gratis/concepto-companeros-trabajo-pagina-inicio_23-2148298504.jpg?semt=ais_hybrid&w=740&q=80",
  ambiental: "https://fepropaz.com/wp-content/uploads/2024/01/6-1.jpg",
  habilidades:
    "https://www.shutterstock.com/shutterstock/videos/3622039125/thumb/11.jpg?ip=x480",
  diseno:
    "https://img.freepik.com/foto-gratis/concepto-programacion-navegacion-tecnologia-diseno-web_53876-163260.jpg",
  web: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCwNChvNOBeHy5fKXoolxY7NJyGUFFnogl9g&s",
};

function CourseSearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");

  // Catálogo (usando las imágenes provistas)
  const courses = useMemo(
    () => [
      {
        id: 1,
        title: "Programación Web para Principiantes",
        description:
          "Aprende los fundamentos del desarrollo web y crea tu primera página.",
        category: "programacion",
        level: "principiante",
        duration: "8h",
        students: 150,
        rating: 4.8,
        image: IMAGES.web,
        instructor: "Ana García",
        featured: true,
        matchesStyle: true,
        learningStyles: ["visual", "kinestesico"],
      },
      {
        id: 2,
        title: "Diseño Digital para Proyectos",
        description: "Crea diseños impactantes para campañas y productos.",
        category: "diseno",
        level: "principiante",
        duration: "6h",
        students: 89,
        rating: 4.9,
        image: IMAGES.diseno,
        instructor: "Carlos Méndez",
        featured: false,
        matchesStyle: false,
        learningStyles: ["visual", "lectura"],
      },
      {
        id: 3,
        title: "Habilidades Digitales",
        description: "Domina herramientas y hábitos digitales esenciales.",
        category: "habilidades-digitales",
        level: "principiante",
        duration: "10h",
        students: 200,
        rating: 4.7,
        image: IMAGES.habilidades,
        instructor: "Laura Fernández",
        featured: true,
        matchesStyle: true,
        learningStyles: ["visual", "lectura", "kinestesico"],
      },
      {
        id: 4,
        title: "Educación Ambiental",
        description: "Incorporá prácticas sostenibles con impacto real.",
        category: "sostenibilidad",
        level: "principiante",
        duration: "5h",
        students: 120,
        rating: 4.6,
        image: IMAGES.ambiental,
        instructor: "David Chen",
        featured: false,
        matchesStyle: true,
        learningStyles: ["visual", "lectura"],
      },
      {
        id: 5,
        title: "Comunicación Efectiva",
        description: "Transmití ideas claras en equipo y en público.",
        category: "comunicacion",
        level: "intermedio",
        duration: "4h",
        students: 95,
        rating: 4.5,
        image: IMAGES.comunicacion,
        instructor: "María López",
        featured: true,
        matchesStyle: true,
        learningStyles: ["auditivo", "kinestesico"],
      },
      {
        id: 6,
        title: "Introducción a Python",
        description: "Fundamentos de programación en Python con ejercicios.",
        category: "programacion",
        level: "principiante",
        duration: "12h",
        students: 180,
        rating: 4.7,
        image: IMAGES.python,
        instructor: "Roberto Silva",
        featured: false,
        matchesStyle: false,
        learningStyles: ["lectura", "kinestesico"],
      },
    ],
    [],
  );

  // --- FILTROS Y UTILIDADES ---
  const categories = [
    {
      value: "all",
      label: "Todos",
      icon: <Book className="w-4 h-4" />,
      badge: "bg-slate-600",
    },
    {
      value: "programacion",
      label: "Programación",
      icon: <Cpu className="w-4 h-4" />,
      badge: "bg-blue-600",
    },
    {
      value: "diseno",
      label: "Diseño",
      icon: <Palette className="w-4 h-4" />,
      badge: "bg-purple-600",
    },
    {
      value: "habilidades-digitales",
      label: "Habilidades",
      icon: <Lightbulb className="w-4 h-4" />,
      badge: "bg-amber-600",
    },
    {
      value: "sostenibilidad",
      label: "Sostenibilidad",
      icon: <Leaf className="w-4 h-4" />,
      badge: "bg-emerald-600",
    },
    {
      value: "comunicacion",
      label: "Comunicación",
      icon: <Target className="w-4 h-4" />,
      badge: "bg-rose-600",
    },
  ];

  const levels = [
    { value: "all", label: "Todos los niveles" },
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
  ];

  const learningStyles = [
    { value: "all", label: "Todos" },
    { value: "visual", label: "Visual" },
    { value: "auditivo", label: "Auditivo" },
    { value: "lectura", label: "Lectura" },
    { value: "kinestesico", label: "Kinestésico" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesStyle =
      selectedStyle === "all" || course.learningStyles.includes(selectedStyle);
    return matchesSearch && matchesCategory && matchesLevel && matchesStyle;
  });

  const getLearningStyleIcon = (style) => {
    const icons = {
      visual: <Eye className="w-3.5 h-3.5" />,
      auditivo: <Headphones className="w-3.5 h-3.5" />,
      lectura: <BookOpen className="w-3.5 h-3.5" />,
      kinestesico: <Target className="w-3.5 h-3.5" />,
    };
    return icons[style] || <Book className="w-3.5 h-3.5" />;
  };

  const styleChip = (style) => {
    const palette = {
      visual: "bg-indigo-100 text-indigo-800 border-indigo-200",
      auditivo: "bg-cyan-100 text-cyan-800 border-cyan-200",
      lectura: "bg-amber-100 text-amber-800 border-amber-200",
      kinestesico: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    return (
      <span
        key={style}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border ${palette[style] || "bg-slate-100 text-slate-800 border-slate-200"}`}
        title={style}
      >
        {getLearningStyleIcon(style)}
        {style.charAt(0).toUpperCase() + style.slice(1)}
      </span>
    );
  };

  const levelBadge = (level) => {
    const m = {
      principiante: "bg-green-100 text-green-800 border-green-200",
      intermedio: "bg-blue-100 text-blue-800 border-blue-200",
      avanzado: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] border ${m[level] || "bg-slate-100 text-slate-800 border-slate-200"}`}
      >
        {level}
      </span>
    );
  };
  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Asistente de voz para estudiantes (navegación + lectura de cursos) */}
      <VoiceListCourses courses={filteredCourses} autoStart={true} />

      <div className="container mx-auto px-6 py-10">
        {/* Hero */}
        <section className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Explora contenido gratuito y práctico
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Encontrá tu curso ideal
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Filtrá por categoría, nivel o tu estilo de aprendizaje y empezá hoy.
          </p>

          <div className="max-w-2xl mx-auto relative mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="¿Qué te gustaría aprender?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-11 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700 bg-white"
            />
            <Mic
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              title="Dictado (si está habilitado por accesibilidad)"
            />
          </div>
        </section>

        {/* Categorías */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => {
              const active = selectedCategory === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all ${
                    active
                      ? `${c.badge} text-white shadow`
                      : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400"
                  }`}
                  title={c.label}
                >
                  {c.icon}
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Filtros secundarios */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">
                  Nivel
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 text-sm font-medium mb-2">
                  Estilo de aprendizaje
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {learningStyles.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSelectedStyle(s.value)}
                      className={`px-3 py-2 rounded-xl text-sm border transition ${
                        selectedStyle === s.value
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(selectedCategory !== "all" ||
              selectedLevel !== "all" ||
              selectedStyle !== "all" ||
              searchTerm.trim()) && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setSelectedStyle("all");
                  }}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm"
                >
                  <X className="w-3.5 h-3.5" />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Resultados */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredCourses.length} curso
              {filteredCourses.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Imagen */}
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {course.featured && (
                      <span className="bg-amber-500/95 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Destacado
                      </span>
                    )}
                    {course.matchesStyle && (
                      <span className="bg-emerald-600/95 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Para vos
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/75 text-white px-2.5 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2">
                    {levelBadge(course.level)}
                    {course.learningStyles.slice(0, 2).map((s) => styleChip(s))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {course.instructor}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      {course.rating}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-md transition"
                  >
                    Empezar
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-14">
              <Search className="w-9 h-9 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                No se encontraron cursos
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Probá con otras palabras o limpiá los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setSelectedStyle("all");
                }}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow transition"
              >
                Ver todos los cursos
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CourseSearchPage;
