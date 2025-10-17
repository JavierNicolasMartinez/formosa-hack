// src/pages/TutorDashboardPage.jsx
import useAuth from "../hooks/useAuth";
import {
  BookOpen,
  Users,
  Star,
  Video,
  BookText,
  PlusCircle,
} from "lucide-react";
import { useMemo } from "react";

function StatCard({ title, value, icon, gradient }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-slate-600 text-sm">{title}</p>
    </div>
  );
}

function Progress({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

export default function TutorDashboardPage() {
  const { user } = useAuth();

  // Datos de ejemplo — reemplaza luego por datos reales desde tu API
  const tutorStats = useMemo(
    () => ({
      totalStudents: 45,
      activeCourses: 3,
      satisfaction: 4.9,
    }),
    [],
  );

  const recentEnrollments = useMemo(
    () => [
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
    ],
    [],
  );

  const coursePerformance = useMemo(
    () => [
      { id: 1, title: "Aprender con música", students: 25, completion: 68 },
      {
        id: 2,
        title: "Diseño Visual y Creatividad",
        students: 15,
        completion: 45,
      },
      { id: 3, title: "Lectura Comprensiva", students: 5, completion: 20 },
    ],
    [],
  );

  const upcomingSessions = useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                ¡Bienvenido, {user?.username || "Tutor"}! 👨‍🏫
              </h1>
              <p className="text-slate-600">
                Comparte tu conocimiento con el mundo — ayuda a otros a aprender
                de forma gratuita y significativa.
              </p>
            </div>
            <a
              href="/create-course"
              className="mt-4 lg:mt-0 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-shadow"
            >
              <PlusCircle className="w-5 h-5" />
              Crear curso
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Estudiantes Totales"
              value={tutorStats.totalStudents}
              icon={<Users className="w-6 h-6" />}
              gradient="from-blue-500 to-cyan-600"
            />
            <StatCard
              title="Cursos Activos"
              value={tutorStats.activeCourses}
              icon={<BookOpen className="w-6 h-6" />}
              gradient="from-green-500 to-emerald-600"
            />
            <StatCard
              title="Satisfacción Promedio"
              value={tutorStats.satisfaction}
              icon={<Star className="w-6 h-6" />}
              gradient="from-purple-500 to-indigo-600"
            />
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
                {coursePerformance.length === 0 ? (
                  <EmptyState
                    title="Aún no tienes cursos"
                    subtitle="Crea tu primer curso para empezar a medir el progreso de tus estudiantes."
                    ctaText="Crear curso"
                    ctaHref="/create-course"
                  />
                ) : (
                  coursePerformance.map((course) => (
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
                      <div className="w-full sm:w-56">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>Completado</span>
                          <span>{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} />
                      </div>
                    </div>
                  ))
                )}
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
                {recentEnrollments.length === 0 ? (
                  <EmptyState
                    title="Sin nuevas inscripciones"
                    subtitle="Cuando alguien se inscriba a tus cursos, aparecerá aquí."
                  />
                ) : (
                  recentEnrollments.map((enrollment) => (
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
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            {/* Sesiones */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Sesiones Próximas
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingSessions.length === 0 ? (
                  <EmptyState
                    title="Sin sesiones programadas"
                    subtitle="Programa una sesión en vivo para tus estudiantes."
                  />
                ) : (
                  upcomingSessions.map((session) => (
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
                        <p className="text-slate-600 text-xs">
                          {session.course}
                        </p>
                      </div>
                      <span className="text-slate-500 text-sm">
                        {session.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, subtitle, ctaText, ctaHref }) {
  return (
    <div className="text-center py-8">
      <p className="text-slate-800 font-semibold">{title}</p>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      {ctaText && ctaHref && (
        <a
          href={ctaHref}
          className="inline-block mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white hover:shadow-lg transition-shadow"
        >
          {ctaText}
        </a>
      )}
    </div>
  );
}
