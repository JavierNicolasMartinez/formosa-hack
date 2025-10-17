import useAuth from "../hooks/useAuth";

function StudentDashboardPage() {
  const { user } = useAuth();

  // Datos de ejemplo - luego los reemplazarás con datos reales
  const userStats = {
    completedCourses: 3,
    inProgress: 2,
    learningStreak: 7,
    totalHours: 24,
  };

  const currentCourses = [
    {
      id: 1,
      title: "Introducción a React",
      progress: 65,
      category: "Programación",
      nextLesson: "Hooks Avanzados",
      dueDate: "15 Nov",
    },
    {
      id: 2,
      title: "Diseño UX/UI",
      progress: 30,
      category: "Diseño",
      nextLesson: "Principios de Usabilidad",
      dueDate: "20 Nov",
    },
  ];

  const recommendedCourses = [
    {
      id: 3,
      title: "JavaScript Moderno",
      category: "Programación",
      duration: "8h",
      level: "Intermedio",
      matchesStyle: true,
    },
    {
      id: 4,
      title: "Figma para Desarrolladores",
      category: "Diseño",
      duration: "6h",
      level: "Principiante",
      matchesStyle: true,
    },
    {
      id: 5,
      title: "Node.js Backend",
      category: "Programación",
      duration: "10h",
      level: "Avanzado",
      matchesStyle: false,
    },
  ];

  const upcomingActivities = [
    {
      id: 1,
      title: "Quiz: React Components",
      course: "Introducción a React",
      time: "Hoy, 16:00",
      type: "quiz",
    },
    {
      id: 2,
      title: "Proyecto Final",
      course: "Diseño UX/UI",
      time: "18 Nov",
      type: "project",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-slate-200 font-bold text-sm">AL</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                AdaptaLearn
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-slate-700 font-medium">
                  {user?.username || "Usuario"}
                </span>
              </div>
              <button className="bg-slate-100 hover:bg-slate-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <span className="text-slate-600">⚙️</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Bienvenida y Stats */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                ¡Bienvenido de vuelta, {user?.username || "Estudiante"}! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                Continúa tu journey de aprendizaje personalizado
              </p>
            </div>
            <div className="mt-4 lg:mt-0 bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-700 font-medium">Activo ahora</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Cursos Completados",
                value: userStats.completedCourses,
                icon: "✅",
                color: "from-green-500 to-emerald-600",
              },
              {
                title: "En Progreso",
                value: userStats.inProgress,
                icon: "📚",
                color: "from-blue-500 to-cyan-600",
              },
              {
                title: "Racha de Aprendizaje",
                value: `${userStats.learningStreak} días`,
                icon: "🔥",
                color: "from-orange-500 to-red-500",
              },
              {
                title: "Horas Totales",
                value: `${userStats.totalHours}h`,
                icon: "⏱️",
                color: "from-purple-500 to-indigo-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Cursos en Progreso */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cursos en Progreso */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Tus Cursos en Progreso
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-1 mb-4 sm:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-slate-800">
                          {course.title}
                        </h3>
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">
                        Próxima lección: {course.nextLesson}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Vence: {course.dueDate}</span>
                      </div>
                    </div>
                    <div className="w-full sm:w-48">
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Progreso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <button className="w-full mt-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                        Continuar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cursos Recomendados */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Recomendados para Ti
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Basado en tu estilo de aprendizaje visual
                </p>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">
                          {course.title}
                        </h3>
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                      </div>
                      {course.matchesStyle && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Coincide
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                      <span>🕒 {course.duration}</span>
                      <span>📊 {course.level}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      Explorar Curso
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Columna derecha - Sidebar */}
          <div className="space-y-8">
            {/* Próximas Actividades */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Próximas Actividades
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "quiz"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {activity.type === "quiz" ? "📝" : "🎯"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 text-sm">
                        {activity.title}
                      </h4>
                      <p className="text-slate-600 text-xs">
                        {activity.course}
                      </p>
                    </div>
                    <span className="text-slate-500 text-sm">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Test de Aprendizaje */}
            <section className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl mb-4">
                  🧠
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Optimiza tu Aprendizaje
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Realiza nuestro test de estilos de aprendizaje para obtener
                  recomendaciones más precisas
                </p>
                <button className="w-full bg-white text-slate-800 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                  Realizar Test
                </button>
              </div>
            </section>

            {/* Logros */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">Tus Logros</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: "🏆", title: "Principiante", achieved: true },
                    { icon: "📚", title: "Lector Ávido", achieved: true },
                    { icon: "⚡", title: "Rápido Aprendiz", achieved: false },
                    { icon: "🎯", title: "Consistente", achieved: true },
                    { icon: "🌟", title: "Estrella", achieved: false },
                    { icon: "💡", title: "Innovador", achieved: false },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        achievement.achieved
                          ? "bg-amber-100 border border-amber-200"
                          : "bg-slate-100 border border-slate-200 opacity-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <span className="text-xs text-slate-700">
                        {achievement.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;
