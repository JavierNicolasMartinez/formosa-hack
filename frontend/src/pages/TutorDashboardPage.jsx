import useAuth from "../hooks/useAuth";
import {
  BookOpen,
  Users,
  Star,
  Video,
  Headphones,
  BookText,
  Hand,
  PlusCircle,
  Settings,
} from "lucide-react";

function TutorDashboardPage() {
  const { user } = useAuth();

  // Datos de ejemplo (sin fines económicos)
  const tutorStats = {
    totalStudents: 45,
    activeCourses: 3,
    satisfaction: 4.9,
  };

  const recentEnrollments = [
    {
      id: 1,
      student: "María González",
      course: "Aprender con música",
      date: "15 Nov",
    },
    {
      id: 2,
      student: "Carlos López",
      course: "Diseño Visual y Creatividad",
      date: "14 Nov",
    },
    {
      id: 3,
      student: "Ana Rodríguez",
      course: "Lectura Comprensiva",
      date: "13 Nov",
    },
  ];

  const coursePerformance = [
    { id: 1, title: "Aprender con música", students: 25, completion: 68 },
    {
      id: 2,
      title: "Diseño Visual y Creatividad",
      students: 15,
      completion: 45,
    },
    { id: 3, title: "Lectura Comprensiva", students: 5, completion: 20 },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Sesión en vivo: Técnicas Visuales",
      course: "Diseño Visual",
      time: "Hoy, 18:00",
      type: "live",
    },
    {
      id: 2,
      title: "Revisión de Material Auditivo",
      course: "Aprender con música",
      time: "20 Nov, 16:00",
      type: "review",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Bienvenida */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                ¡Bienvenido, {user?.username || "Tutor"}! 👨‍🏫
              </h1>
              <p className="text-slate-600 text-lg">
                Comparte tu conocimiento con el mundo — ayuda a otros a aprender
                de forma gratuita y significativa.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: "Estudiantes Totales",
                value: tutorStats.totalStudents,
                icon: <Users className="w-6 h-6" />,
                color: "from-blue-500 to-cyan-600",
              },
              {
                title: "Cursos Activos",
                value: tutorStats.activeCourses,
                icon: <BookOpen className="w-6 h-6" />,
                color: "from-green-500 to-emerald-600",
              },
              {
                title: "Satisfacción Promedio",
                value: tutorStats.satisfaction,
                icon: <Star className="w-6 h-6" />,
                color: "from-purple-500 to-indigo-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}
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
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-8">
            {/* Rendimiento */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Progreso de tus Cursos
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {coursePerformance.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h3 className="font-semibold text-slate-800 text-lg mb-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-6 text-sm text-slate-600">
                        <span>
                          <Users className="inline w-4 h-4 mr-1" />
                          {course.students} estudiantes
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-48">
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Completado</span>
                        <span>{course.completion}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inscripciones */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Nuevos Estudiantes
                </h2>
              </div>
              <div className="p-6">
                {recentEnrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {enrollment.student}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {enrollment.course}
                      </p>
                    </div>
                    <span className="text-slate-500 text-sm">
                      {enrollment.date}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            {/* Crear curso */}
            <section className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-lg text-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4 space-x-3">
                  <PlusCircle className="w-6 h-6 text-cyan-300" />
                  <h3 className="text-xl font-bold">Crear Curso Gratuito</h3>
                </div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Título del curso"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-slate-300 focus:outline-none"
                  />
                  <textarea
                    placeholder="Descripción breve"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-slate-300 focus:outline-none"
                  />
                  <select className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none">
                    <option value="">Tipo de aprendizaje</option>
                    <option value="auditivo">Auditivo</option>
                    <option value="audiovisual">Audiovisual</option>
                    <option value="lectura">Lectura / Escritura</option>
                    <option value="kinestesico">Kinestésico</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg font-semibold transition-all"
                  >
                    Publicar Curso
                  </button>
                </form>
              </div>
            </section>

            {/* Sesiones */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Sesiones Próximas
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        session.type === "live"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {session.type === "live" ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <BookText className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 text-sm">
                        {session.title}
                      </h4>
                      <p className="text-slate-600 text-xs">{session.course}</p>
                    </div>
                    <span className="text-slate-500 text-sm">
                      {session.time}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboardPage;
