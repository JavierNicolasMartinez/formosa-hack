import { useState, useEffect, useRef } from "react";
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
  Zap,
  CheckCircle2,
  Mic,
} from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

function CourseSearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");

  const timeoutRef = useRef(null);

  const courses = [
    {
      id: 1,
      title: "Programación Web para Principiantes",
      description:
        "Aprende los fundamentos de la programación web y crea tu primera página.",
      category: "programacion",
      level: "principiante",
      duration: "8h",
      students: 150,
      rating: 4.8,
      image:
        "https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg",
      instructor: "Ana García",
      featured: true,
      matchesStyle: true,
      learningStyles: ["visual", "kinestesico"],
    },
    {
      id: 2,
      title: "Diseño Digital para Proyectos",
      description: "Crea diseños impactantes para campañas comunitarias.",
      category: "diseno",
      level: "principiante",
      duration: "6h",
      students: 89,
      rating: 4.9,
      image:
        "https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg",
      instructor: "Carlos Méndez",
      featured: false,
      matchesStyle: false,
      learningStyles: ["visual", "lectura"],
    },
    {
      id: 3,
      title: "Habilidades Digitales",
      description: "Domina herramientas digitales esenciales.",
      category: "habilidades-digitales",
      level: "principiante",
      duration: "10h",
      students: 200,
      rating: 4.7,
      image:
        "https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg",
      instructor: "Laura Fernández",
      featured: true,
      matchesStyle: true,
      learningStyles: ["visual", "lectura", "kinestesico"],
    },
    {
      id: 4,
      title: "Educación Ambiental",
      description: "Aprende sobre prácticas sostenibles.",
      category: "sostenibilidad",
      level: "principiante",
      duration: "5h",
      students: 120,
      rating: 4.6,
      image:
        "https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg",
      instructor: "David Chen",
      featured: false,
      matchesStyle: true,
      learningStyles: ["visual", "lectura"],
    },
    {
      id: 5,
      title: "Comunicación Efectiva",
      description: "Aprende a comunicar ideas de manera clara.",
      category: "comunicacion",
      level: "intermedio",
      duration: "4h",
      students: 95,
      rating: 4.5,
      image:
        "https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg",
      instructor: "María López",
      featured: true,
      matchesStyle: true,
      learningStyles: ["auditivo", "kinestesico"],
    },
    {
      id: 6,
      title: "Introducción a Python",
      description: "Fundamentos de programación con Python.",
      category: "programacion",
      level: "principiante",
      duration: "12h",
      students: 180,
      rating: 4.7,
      image:
        "https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg",
      instructor: "Roberto Silva",
      featured: false,
      matchesStyle: false,
      learningStyles: ["lectura", "kinestesico"],
    },
  ];

  // Comandos de voz
  const commands = [
    {
      command: ["mostrar cursos", "listar cursos", "ver cursos"],
      callback: () => {
        const courseList = courses
          .map(
            (c, idx) =>
              `${idx + 1}. ${c.title}, duración: ${c.duration}. ${c.description}`,
          )
          .join(" ");
        speak(`Estos son los cursos disponibles: ${courseList}`);
      },
    },
    {
      command: [
        "entrar a *",
        "abrir curso *",
        "quiero entrar a *",
        "curso número *",
      ],
      callback: (courseName) => {
        let course;
        if (!isNaN(courseName)) {
          const index = parseInt(courseName) - 1;
          course = courses[index];
        } else {
          course = courses.find((c) =>
            c.title.toLowerCase().includes(courseName.toLowerCase()),
          );
        }

        if (course) {
          speak(`Abriendo el curso ${course.title}`);
          navigate(`/courses/${course.id}`);
        } else {
          speak(`No encontré ningún curso llamado ${courseName}`);
        }
      },
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    const startListening = () =>
      SpeechRecognition.startListening({ continuous: true, language: "es-AR" });

    startListening();
    return () => SpeechRecognition.stopListening();
  }, [browserSupportsSpeechRecognition]);

  // Reinicio automático para evitar saturación
  useEffect(() => {
    if (!transcript) return;
    console.log("Transcript actual:", transcript);
    SpeechRecognition.stopListening();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "es-AR" });
    }, 1000);
  }, [transcript, resetTranscript]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR";
    speechSynthesis.speak(utterance);
  };

  // --- FILTROS Y UTILIDADES ---
  const categories = [
    {
      value: "all",
      label: "Todos",
      icon: <Book className="w-4 h-4" />,
      color: "bg-slate-500",
    },
    {
      value: "programacion",
      label: "Programación",
      icon: <Cpu className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      value: "diseno",
      label: "Diseño",
      icon: <Palette className="w-4 h-4" />,
      color: "bg-purple-500",
    },
    {
      value: "habilidades-digitales",
      label: "Habilidades",
      icon: <Lightbulb className="w-4 h-4" />,
      color: "bg-amber-500",
    },
    {
      value: "sostenibilidad",
      label: "Sostenibilidad",
      icon: <Leaf className="w-4 h-4" />,
      color: "bg-emerald-500",
    },
    {
      value: "comunicacion",
      label: "Comunicación",
      icon: <Zap className="w-4 h-4" />,
      color: "bg-red-500",
    },
  ];

  const levels = [
    { value: "all", label: "Todos los niveles" },
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
  ];

  const learningStyles = [
    { value: "all", label: "Todos los estilos" },
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
      visual: <Eye className="w-3 h-3" />,
      auditivo: <Headphones className="w-3 h-3" />,
      lectura: <BookOpen className="w-3 h-3" />,
      kinestesico: <Target className="w-3 h-3" />,
    };
    return icons[style] || <Book className="w-3 h-3" />;
  };

  const getLearningStyleColor = (style) => {
    const colors = {
      visual: "bg-blue-100 text-blue-700",
      auditivo: "bg-green-100 text-green-700",
      lectura: "bg-purple-100 text-purple-700",
      kinestesico: "bg-orange-100 text-orange-700",
    };
    return colors[style] || "bg-slate-100 text-slate-700";
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Hero */}
        <section className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Encuentra tu curso ideal
          </h1>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="¿Qué te gustaría aprender?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <Mic
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                listening ? "text-green-500 animate-pulse" : "text-slate-400"
              }`}
            />
          </div>
        </section>

        {/* Filtros */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === category.value
                    ? `${category.color} text-white shadow-md`
                    : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400"
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">
                  Nivel
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">
                  Estilo de aprendizaje
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {learningStyles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(selectedCategory !== "all" ||
              selectedLevel !== "all" ||
              selectedStyle !== "all") && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setSelectedStyle("all");
                  }}
                  className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 text-sm"
                >
                  <X className="w-3 h-3" />
                  <span>Limpiar filtros</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Resultados */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {filteredCourses.length} cursos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {course.featured && (
                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                        <Star className="w-2 h-2 fill-current" />
                        <span>Destacado</span>
                      </span>
                    )}
                    {course.matchesStyle && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                        <CheckCircle2 className="w-2 h-2" />
                        <span>Para ti</span>
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Clock className="w-2 h-2" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-xs mb-2 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{course.instructor}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{course.students}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {course.learningStyles.map((style) => (
                      <span
                        key={style}
                        className={`px-2 py-1 rounded text-xs flex items-center space-x-1 ${getLearningStyleColor(
                          style,
                        )}`}
                      >
                        {getLearningStyleIcon(style)}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-slate-700 text-xs font-medium">
                          {course.rating}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          course.level === "principiante"
                            ? "bg-green-100 text-green-700"
                            : course.level === "intermedio"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="mt-2 bg-slate-800 text-white text-center px-3 py-1 rounded-lg text-xs font-medium hover:bg-slate-700 transition-colors flex items-center space-x-1 w-full"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Empezar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                No se encontraron cursos
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Ajusta tus filtros de búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setSelectedStyle("all");
                }}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
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
