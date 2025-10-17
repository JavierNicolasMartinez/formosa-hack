// src/pages/LearningStyleTestPage.jsx
import { useMemo, useState } from "react";
import {
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Headphones,
  FileText,
  Hand,
} from "lucide-react";

/**
 * Test por pasos (1 pregunta por pantalla), estética más calma,
 * contenedor de pregunta más angosto, celebración del resultado
 * y posibilidad de ajustar manualmente el estilo final.
 *
 * Guarda en localStorage:
 *  - "learningStyle.result"  { dominantStyle, dominantStyleLabel, motivationProfile, interests, manualOverride?, completedAt }
 *  - "learningStyle.pending" { required:false, completedAt }
 */

const STYLE_META = {
  visual: {
    key: "visual",
    label: "Visual",
    icon: <BookOpen className="w-5 h-5" />,
    chip: "bg-indigo-100 text-indigo-800 border-indigo-200",
    bg: "bg-indigo-600",
    gradient: "from-slate-200 to-slate-100", // suave
  },
  auditive: {
    key: "auditive",
    label: "Auditivo",
    icon: <Headphones className="w-5 h-5" />,
    chip: "bg-cyan-100 text-cyan-800 border-cyan-200",
    bg: "bg-cyan-600",
    gradient: "from-slate-200 to-slate-100",
  },
  reading_writing: {
    key: "reading_writing",
    label: "Lectura/Escritura",
    icon: <FileText className="w-5 h-5" />,
    chip: "bg-amber-100 text-amber-800 border-amber-200",
    bg: "bg-amber-600",
    gradient: "from-slate-200 to-slate-100",
  },
  kinesthetic: {
    key: "kinesthetic",
    label: "Kinestésico",
    icon: <Hand className="w-5 h-5" />,
    chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
    bg: "bg-emerald-600",
    gradient: "from-slate-200 to-slate-100",
  },
};

const STYLE_MAP = {
  a: "visual",
  b: "auditive",
  c: "reading_writing",
  d: "kinesthetic",
};

const QUESTIONS = [
  // --- Estilo (sección 1) ---
  {
    id: "q1",
    section: "Estilo de Aprendizaje",
    text: "Cuando estudio algo nuevo, me resulta más fácil aprender si:",
    options: {
      a: "Veo ejemplos, gráficos o videos que expliquen el tema.",
      b: "Escucho explicaciones, conversaciones o clases en audio.",
      c: "Leo textos, libros, apuntes o resúmenes.",
      d: "Hago prácticas, experimentos o actividades prácticas.",
    },
  },
  {
    id: "q2",
    section: "Estilo de Aprendizaje",
    text: "Cuando quiero recordar información, prefiero:",
    options: {
      a: "Diagramas, esquemas o mapas conceptuales.",
      b: "Explicárselo a alguien o escuchar grabaciones.",
      c: "Subrayar, escribir o leer varias veces.",
      d: "Resolver problemas, hacer proyectos o ejercicios.",
    },
  },
  {
    id: "q3",
    section: "Estilo de Aprendizaje",
    text: "En un examen, me siento más seguro cuando:",
    options: {
      a: "He visto ejemplos y material visual.",
      b: "He escuchado explicaciones o grabaciones.",
      c: "He leído y tomado apuntes.",
      d: "He practicado con ejercicios y actividades concretas.",
    },
  },
  // --- Motivación (sección 2) ---
  {
    id: "q4",
    section: "Motivación",
    text: "Me motiva estudiar cuando:",
    options: {
      a: "Entiendo cómo lo que aprendo me servirá en la vida real.",
      b: "Hay retos, juegos o competencias que me desafían.",
      c: "Puedo aprender a mi ritmo y organizar mi tiempo.",
      d: "Recibo reconocimiento, elogios o recompensas.",
    },
  },
  {
    id: "q5",
    section: "Motivación",
    text: "Prefiero aprender:",
    options: {
      a: "Solo, concentrándome en mi propio ritmo.",
      b: "Con un grupo pequeño, compartiendo ideas.",
      c: "Con un mentor o profesor que me guíe.",
      d: "Mezclando todas las formas anteriores.",
    },
  },
  {
    id: "q6",
    section: "Motivación",
    text: "Para mantener la motivación, suelo:",
    options: {
      a: "Establecer metas pequeñas y alcanzables.",
      b: "Aprender en bloques cortos de tiempo.",
      c: "Cambiar metodologías para no aburrirme.",
      d: "Crear recompensas personales al cumplir objetivos.",
    },
  },
  // --- Hábitos (sección 3) ---
  {
    id: "q7",
    section: "Hábitos",
    text: "Cuando quiero aprender algo por mi cuenta, generalmente:",
    options: {
      a: "Busco videos o tutoriales online.",
      b: "Escucho podcasts o audiolibros relacionados.",
      c: "Leo artículos, libros o apuntes.",
      d: "Hago proyectos prácticos o simulaciones.",
    },
  },
  {
    id: "q8",
    section: "Hábitos",
    text: "Para aprender mejor y de forma autodidacta, prefiero:",
    options: {
      a: "Planificar mi tiempo y organizar mis materiales.",
      b: "Dividir el aprendizaje en pasos cortos y claros.",
      c: "Usar diferentes formatos para no aburrirme.",
      d: "Aplicar lo aprendido en proyectos o ejercicios reales.",
    },
  },
  {
    id: "q9",
    section: "Hábitos",
    text: "Cuando me enfrento a un tema difícil, suelo:",
    options: {
      a: "Ver videos o tutoriales paso a paso.",
      b: "Escuchar explicaciones de expertos o podcasts.",
      c: "Leer varios textos o buscar resúmenes.",
      d: "Practicar con ejercicios, experimentos o ejemplos reales.",
    },
  },
  // --- Intereses múltiples (sección 4) ---
  {
    id: "q10",
    section: "Intereses",
    text: "Elegí las áreas que más te interesan (podés marcar más de una):",
    multiple: true,
    options: {
      ai_tech: "Tecnología e IA",
      health_bio: "Salud y Biotecnología",
      energy_sustain: "Energía y Sustentabilidad",
      business: "Negocios y Emprendimiento Digital",
      art_media: "Arte y Medios Digitales",
    },
  },
];

const motivationMaps = {
  q4: {
    a: "aplicación_práctica",
    b: "retos_gamificación",
    c: "autonomía_ritmo_propio",
    d: "reconocimiento_recompensas",
  },
  q5: { a: "individual", b: "grupo_pequeño", c: "mentor_guía", d: "mixto" },
  q6: {
    a: "metas_pequeñas",
    b: "bloques_cortos",
    c: "variar_metodologías",
    d: "recompensas_personales",
  },
};

export default function LearningStyleTestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: [],
  });
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [manualStyle, setManualStyle] = useState(""); // override opcional

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const progressPct = Math.round(
    ((submitted ? total : step + 1) / total) * 100,
  );

  function selectOption(qid, value, multiple = false) {
    setAnswers((prev) => {
      if (!multiple) return { ...prev, [qid]: value };
      const set = new Set(prev[qid]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [qid]: Array.from(set) };
    });
  }

  const canNext = useMemo(() => {
    if (current.multiple) return true; // opcional
    return !!answers[current.id];
  }, [current, answers]);

  function next() {
    if (step < total - 1) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function computeStyleScores() {
    const counters = {
      visual: 0,
      auditive: 0,
      reading_writing: 0,
      kinesthetic: 0,
    };
    ["q1", "q2", "q3", "q7", "q8", "q9"].forEach((qid) => {
      const opt = answers[qid];
      const s = STYLE_MAP[opt];
      if (s) counters[s] += 1;
    });
    return counters;
  }

  const styleScores = computeStyleScores();

  const dominantStyle = useMemo(() => {
    const arr = Object.entries(styleScores).sort((a, b) => b[1] - a[1]);
    return arr[0]?.[0] ?? "visual";
  }, [styleScores]);

  const finalStyle = manualStyle || dominantStyle; // preferir override si lo hay
  const styleMeta = STYLE_META[finalStyle];

  const motivationProfile = useMemo(() => {
    return {
      motivador: motivationMaps.q4[answers.q4] || null,
      preferenciaSocial: motivationMaps.q5[answers.q5] || null,
      estrategiaConstancia: motivationMaps.q6[answers.q6] || null,
    };
  }, [answers.q4, answers.q5, answers.q6]);

  function suggestionsForStyle(style) {
    switch (style) {
      case "visual":
        return [
          "Videos, infografías y diagramas como base.",
          "Mapas conceptuales (Notion, Excalidraw, Miro).",
          "Convertí resúmenes en esquemas visuales.",
        ];
      case "auditive":
        return [
          "Podcasts, audiolibros y clases grabadas.",
          "Explicá el tema en voz alta a otra persona.",
          "Grabá resúmenes propios en audio.",
        ];
      case "reading_writing":
        return [
          "Artículos/libros + apuntes claros.",
          "Subrayado y resúmenes escritos.",
          "Transcribí ideas de videos a notas detalladas.",
        ];
      case "kinesthetic":
        return [
          "Proyectos prácticos y simuladores.",
          "Ejercicios paso a paso y laboratorios.",
          "Aplicá lo aprendido de inmediato.",
        ];
      default:
        return [];
    }
  }

  function persistResult(manualOverride = false) {
    const dominantStyleLabel = STYLE_META[finalStyle]?.label ?? null;
    const result = {
      dominantStyle: finalStyle,
      dominantStyleLabel,
      motivationProfile,
      interests: answers.q10,
      manualOverride: manualOverride || undefined,
      completedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("learningStyle.result", JSON.stringify(result));
      localStorage.setItem(
        "learningStyle.pending",
        JSON.stringify({ required: false, completedAt: result.completedAt }),
      );
    } catch {
      // silenciar
    }
  }

  function submit() {
    setSaving(true);
    persistResult(Boolean(manualStyle));
    setSubmitted(true);
    setTimeout(() => setSaving(false), 450);
  }

  function handleManualChange(newStyle) {
    setManualStyle(newStyle);
    // Persistimos inmediatamente la preferencia manual para que quede guardada si recarga
    persistResult(true);
  }

  function handleReset() {
    setAnswers({
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: [],
    });
    setManualStyle("");
    setSubmitted(false);
    setStep(0);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      {/* Header sobrio */}
      <header className="container  mx-auto px-6 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Test de Estilo de Aprendizaje
            </h1>
            <p className="text-slate-600">
              Una pregunta por paso. Colores suaves, foco en lo importante.
            </p>
          </div>
        </div>

        {/* Barra de progreso sutil */}
        <div className="mt-6 h-2 rounded-full bg-slate-200 overflow-hidden max-w-2xl">
          <div
            className="h-2 bg-slate-900 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-slate-500">
          {submitted ? "Completado" : `Progreso: ${step + 1} / ${total}`}
        </div>
      </header>

      <main className="container mx-auto px-6 pb-12">
        {/* Resultado */}
        {submitted ? (
          <section className="mx-auto max-w-2xl">
            {/* Tarjeta con celebración leve */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Banda superior discreta con color del estilo */}
              <div className={`h-16 ${styleMeta.bg} relative`}>
                {/* mini confetti sutil */}
                <div className="absolute inset-0 opacity-20">
                  <div className="animate-pulse h-full w-full bg-[radial-gradient(80%_80%_at_10%_10%,white,transparent)]" />
                </div>
                <div className="absolute left-4 top-4 inline-flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${styleMeta.chip}`}
                  >
                    ¡Listo! Tu estilo sugerido es {styleMeta.label}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Celebración */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      ¡Genial! Este enfoque puede potenciar tu aprendizaje
                    </h2>
                    <p className="text-slate-600 text-sm">
                      Probá estas ideas para empezar hoy:
                    </p>
                  </div>
                </div>

                {/* Sugerencias (sin puntajes) */}
                <ul className="space-y-2 list-disc list-inside text-slate-700">
                  {suggestionsForStyle(finalStyle).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                {/* Ajuste manual del resultado */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    ¿Sentís que otro enfoque te representa mejor? Podés ajustar
                    tu metodología favorita acá, y la vamos a guardar como
                    preferencia:
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.values(STYLE_META).map((m) => {
                      const active = finalStyle === m.key;
                      return (
                        <button
                          key={m.key}
                          onClick={() => handleManualChange(m.key)}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition ${
                            active
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                          }`}
                          title={m.label}
                        >
                          {m.icon}
                          {m.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Resultado guardado en tu dispositivo
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50"
                    >
                      Rehacer test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Paso actual (contenedor angosto)
          <section className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5 md:p-7">
              <div className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                {current.section}
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
                {current.text}
              </h2>

              {/* Opciones: compactas pero cómodas */}
              <div className="mt-5 grid gap-2">
                {Object.entries(current.options).map(([value, label]) => {
                  const selected = current.multiple
                    ? answers[current.id].includes(value)
                    : answers[current.id] === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        selectOption(current.id, value, !!current.multiple)
                      }
                      className={`text-left rounded-2xl border px-4 py-3 transition ${
                        selected
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                            selected
                              ? "border-white bg-white/20"
                              : "border-slate-300"
                          }`}
                        >
                          {selected ? (
                            <span className="h-2.5 w-2.5 rounded-full bg-white" />
                          ) : null}
                        </span>
                        <span
                          className={`text-[15px] leading-relaxed ${
                            selected ? "text-white/95" : "text-slate-700"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navegación */}
              <div className="mt-7 flex items-center justify-between">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>

                {step < total - 1 ? (
                  <button
                    onClick={next}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:shadow disabled:opacity-50"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:shadow"
                    disabled={saving}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Guardando..." : "Guardar resultado"}
                  </button>
                )}
              </div>
            </div>

            {/* Intereses (si la pregunta actual es múltiple, mostrar micro-ayuda) */}
            {current.multiple && (
              <p className="mt-3 text-xs text-slate-500">
                Consejo: elegí las áreas que más te llamen la atención. Podés
                dejarlo vacío si todavía no lo tenés claro.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
