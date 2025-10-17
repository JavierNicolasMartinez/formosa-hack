// src/pages/StudentDashboardPage.jsx
import useAuth from "../hooks/useAuth";
import {
  Flame,
  BookOpen,
  Clock,
  Trophy,
  Stars,
  ChevronRight,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  Crown,
  Rocket,
  Rainbow,
} from "lucide-react";
import { useMemo } from "react";

/* ---------- UI Primitives ---------- */

function StatCard({ icon, title, value, gradient }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-2xl">
      {/* Glow background */}
      <div
        className={`pointer-events-none absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 ${gradient}`}
      />
      <div className="relative z-10 p-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-inner">
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </div>
          <div className="text-sm text-slate-600">{title}</div>
        </div>
      </div>
      {/* Accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-blue-600 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function CourseRow({ course }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-semibold text-slate-900">
              {course.title}
            </h4>
            <span className="rounded-full bg-gradient-to-r from-sky-100 to-indigo-100 px-2.5 py-1 text-xs text-slate-700 ring-1 ring-inset ring-indigo-200">
              {course.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Próxima lección: <strong>{course.nextLesson}</strong>
          </p>
        </div>
        <div className="text-sm text-slate-500">Vence: {course.dueDate}</div>
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-1/2">
          <ProgressBar value={course.progress} />
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:shadow-lg">
          Continuar
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function RecommendedCard({ course }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h4 className="text-base font-semibold text-slate-900">
            {course.title}
          </h4>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-pink-50 px-2 py-1 ring-1 ring-pink-200">
              {course.category}
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 ring-1 ring-emerald-200">
              🕒 {course.duration}
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-1 ring-1 ring-indigo-200">
              📊 {course.level}
            </span>
          </div>
        </div>
        {course.matchesStyle && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Para vos
          </span>
        )}
      </div>
      <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.01] hover:shadow-lg">
        Explorar curso
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ActivityItem({ activity }) {
  const isQuiz = activity.type === "quiz";
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:bg-white hover:shadow-md">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${isQuiz ? "bg-blue-100 text-blue-600 ring-blue-200" : "bg-violet-100 text-violet-600 ring-violet-200"}`}
      >
        {isQuiz ? "📝" : "🎯"}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-900">
          {activity.title}
        </div>
        <div className="text-xs text-slate-600">{activity.course}</div>
      </div>
      <div className="text-sm text-slate-500">{activity.time}</div>
    </div>
  );
}

function AchievementGrid() {
  const achievements = useMemo(
    () => [
      { icon: "🏆", title: "Principiante", achieved: true },
      { icon: "📚", title: "Lector Ávido", achieved: true },
      { icon: "⚡", title: "Rápido Aprendiz", achieved: false },
      { icon: "🎯", title: "Consistente", achieved: true },
      { icon: "🌟", title: "Estrella", achieved: false },
      { icon: "💡", title: "Innovador", achieved: false },
    ],
    [],
  );

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {achievements.map((a, i) => (
        <div
          key={i}
          className={`rounded-2xl border p-3 shadow-sm ${a.achieved ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50 opacity-80"}`}
        >
          <div className="mb-1 text-2xl">{a.icon}</div>
          <div className="text-xs text-slate-700">{a.title}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */

export default function StudentDashboardPage() {
  const { user } = useAuth();

  // Datos de ejemplo
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
    <div className="min-h-screen bg-[conic-gradient(at_20%_10%,#eef2ff_0deg,#f0f9ff_120deg,#ecfeff_240deg,#f5f3ff_360deg)]">
      {/* Hero (sin navbar) */}
      <section className="relative">
        {/* Sutiles halos de color */}
        <div className="pointer-events-none absolute -top-32 right-10 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="container mx-auto px-6 pb-6 pt-10">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-md backdrop-blur md:flex-row">
            {/* Borde arcoíris animado */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#06b6d4,40%,#a855f7,80%,#f59e0b)]" />
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
                <Sparkles className="h-3.5 w-3.5" />
                Bienvenido de vuelta
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                ¡Hola, {user?.username || "Estudiante"}! 👋
              </h1>
              <p className="mt-2 max-w-xl text-slate-600">
                Continuá tu journey de aprendizaje. Sumate a retos, subí tu
                racha y desbloqueá logros.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 font-medium text-rose-700 ring-1 ring-rose-200">
                  <Crown className="h-3.5 w-3.5" />
                  Nuevo reto semanal
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-700 ring-1 ring-amber-200">
                  <Rocket className="h-3.5 w-3.5" />
                  Objetivos diarios
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-1 font-medium text-indigo-700 ring-1 ring-indigo-200">
                  <Rainbow className="h-3.5 w-3.5" />
                  Modo enfoque
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 text-xl font-bold text-white">
                {(user?.username?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {user?.username || "Usuario"}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  Activo ahora
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            title="Cursos Completados"
            value={userStats.completedCourses}
            icon={<Trophy className="h-6 w-6" />}
            gradient="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"
          />
          <StatCard
            title="En Progreso"
            value={userStats.inProgress}
            icon={<BookOpen className="h-6 w-6" />}
            gradient="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400"
          />
          <StatCard
            title="Racha de Aprendizaje"
            value={`${userStats.learningStreak} días`}
            icon={<Flame className="h-6 w-6" />}
            gradient="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400"
          />
          <StatCard
            title="Horas Totales"
            value={`${userStats.totalHours}h`}
            icon={<Clock className="h-6 w-6" />}
            gradient="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400"
          />
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto grid gap-8 px-6 pb-12 lg:grid-cols-3">
        {/* Columna izquierda */}
        <div className="space-y-8 lg:col-span-2">
          {/* Cursos en progreso */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-md">
            <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-900">
                Tus cursos en progreso
              </h2>
            </div>
            <div className="space-y-5 p-6">
              {currentCourses.map((c) => (
                <CourseRow key={c.id} course={c} />
              ))}
            </div>
          </div>

          {/* Recomendados */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-md">
            <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-900">
                Recomendados para vos
              </h2>
              <p className="text-sm text-slate-600">
                Basado en tu estilo de aprendizaje actual
              </p>
            </div>
            <div className="grid gap-5 p-6 md:grid-cols-2">
              {recommendedCourses.map((c) => (
                <RecommendedCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-8">
          {/* Próximas actividades */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-md">
            <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-900">
                Próximas actividades
              </h2>
            </div>
            <div className="space-y-4 p-6">
              {upcomingActivities.map((a) => (
                <ActivityItem key={a.id} activity={a} />
              ))}
            </div>
          </div>

          {/* Test de aprendizaje */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white shadow-md">
            <div className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Optimiza tu aprendizaje</h3>
              <p className="mt-1 text-sm text-slate-300">
                Realizá el test de estilos y mejorá tus recomendaciones.
              </p>
              <a
                href="/learning-styles"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 shadow-sm transition hover:scale-[1.01] hover:bg-slate-50"
              >
                Hacer el test
                <Stars className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Logros */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-md">
            <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-900">Tus logros</h2>
            </div>
            <div className="p-6">
              <AchievementGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
