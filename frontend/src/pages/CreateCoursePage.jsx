// src/pages/CreateCoursePage.jsx
import { useState } from "react";
import {
  BookOpen,
  Upload,
  PlusCircle,
  Trash2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
} from "lucide-react";

/**
 * Página para que un tutor cree cursos:
 * 1) Datos básicos + tipo de enseñanza (visual, auditiva, práctica, lectura/escritura)
 * 2) Subir archivo principal (pdf, mp4, mp3, zip, etc.)
 * 3) Crear preguntas (opción múltiple u abiertas) con respuestas
 *
 * 👇 Integra el submit con tu API en handleSubmit() (usa FormData + JSON).
 */

const LEARNING_STYLES = [
  { key: "visual", label: "Visual" },
  { key: "auditive", label: "Auditiva" },
  { key: "reading_writing", label: "Lectura / Escritura" },
  { key: "kinesthetic", label: "Práctica / Kinestésica" },
];

const LEVELS = [
  { key: "beginner", label: "Inicial" },
  { key: "intermediate", label: "Intermedio" },
  { key: "advanced", label: "Avanzado" },
];

export default function CreateCoursePage() {
  const [step, setStep] = useState(1);

  // Paso 1: Datos del curso
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [learningStyle, setLearningStyle] = useState("visual");
  const [level, setLevel] = useState("beginner");
  const [category, setCategory] = useState("");

  // Paso 2: Contenido (archivo)
  const [file, setFile] = useState(null);

  // Paso 3: Preguntas
  const [questions, setQuestions] = useState([makeEmptyQuestion("multiple")]);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  function makeEmptyQuestion(type = "multiple") {
    return type === "multiple"
      ? {
          id: crypto.randomUUID(),
          type: "multiple", // multiple | open
          prompt: "",
          options: [
            { id: crypto.randomUUID(), text: "", correct: false },
            { id: crypto.randomUUID(), text: "", correct: false },
          ],
        }
      : {
          id: crypto.randomUUID(),
          type: "open",
          prompt: "",
          expectedAnswer: "",
        };
  }

  function addQuestion(type = "multiple") {
    setQuestions((qs) => [...qs, makeEmptyQuestion(type)]);
  }

  function removeQuestion(id) {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  }

  function updateQuestion(id, updater) {
    setQuestions((qs) => qs.map((q) => (q.id === id ? updater(q) : q)));
  }

  function addOption(qid) {
    updateQuestion(qid, (q) => ({
      ...q,
      options: [
        ...q.options,
        { id: crypto.randomUUID(), text: "", correct: false },
      ],
    }));
  }

  function removeOption(qid, oid) {
    updateQuestion(qid, (q) => ({
      ...q,
      options: q.options.filter((o) => o.id !== oid),
    }));
  }

  function setOptionText(qid, oid, text) {
    updateQuestion(qid, (q) => ({
      ...q,
      options: q.options.map((o) => (o.id === oid ? { ...o, text } : o)),
    }));
  }

  function toggleOptionCorrect(qid, oid) {
    updateQuestion(qid, (q) => ({
      ...q,
      options: q.options.map((o) =>
        o.id === oid ? { ...o, correct: !o.correct } : o,
      ),
    }));
  }

  function validate() {
    const e = [];

    if (!title.trim()) e.push("El curso debe tener un título.");
    if (!description.trim()) e.push("Agrega una descripción del curso.");
    if (!learningStyle) e.push("Selecciona el tipo de enseñanza.");
    if (!level) e.push("Selecciona el nivel del curso.");
    if (!file)
      e.push("Sube el archivo principal del curso (PDF/Video/Audio/ZIP).");

    if (!questions.length) {
      e.push("Agrega al menos 1 pregunta.");
    } else {
      questions.forEach((q, idx) => {
        if (!q.prompt.trim())
          e.push(`La pregunta #${idx + 1} necesita un enunciado.`);
        if (q.type === "multiple") {
          if (q.options.length < 2)
            e.push(`La pregunta #${idx + 1} necesita mínimo 2 opciones.`);
          if (!q.options.some((o) => o.correct))
            e.push(
              `La pregunta #${idx + 1} debe tener al menos 1 respuesta correcta.`,
            );
          q.options.forEach((o, j) => {
            if (!o.text.trim())
              e.push(`La pregunta #${idx + 1}: la opción ${j + 1} está vacía.`);
          });
        } else {
          if (!q.expectedAnswer.trim())
            e.push(
              `La pregunta #${idx + 1} (abierta) debe tener una respuesta esperada.`,
            );
        }
      });
    }

    setErrors(e);
    return e.length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setErrors([]);

      // Construir payload (FormData p/ subir archivo + JSON con metadatos)
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("learningStyle", learningStyle);
      formData.append("level", level);
      formData.append("category", category.trim());
      formData.append("file", file);

      // Convertir preguntas a JSON
      formData.append("questions", JSON.stringify(questions));

      // TODO: Integra tu endpoint real:
      // const res = await api.post("/courses", formData, { headers: { "Content-Type": "multipart/form-data" }});
      // if (res.data.ok) { ...navigate o feedback... }

      // Simulación
      await new Promise((r) => setTimeout(r, 1200));
      console.log("✅ Enviando curso:", {
        title,
        description,
        learningStyle,
        level,
        category,
        file: file?.name,
        questions,
      });
      alert(
        "Curso creado con éxito (simulado). Integra la llamada a tu API en handleSubmit().",
      );
      // Opcional: limpiar
      resetAll();
    } catch (err) {
      console.error(err);
      setErrors(["Ocurrió un error al crear el curso. Intenta nuevamente."]);
    } finally {
      setSubmitting(false);
    }
  }

  function resetAll() {
    setTitle("");
    setDescription("");
    setLearningStyle("visual");
    setLevel("beginner");
    setCategory("");
    setFile(null);
    setQuestions([makeEmptyQuestion("multiple")]);
    setStep(1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Crear Curso
              </h1>
              <p className="text-slate-600 text-sm">
                Define el tipo de enseñanza, sube el material y crea la
                evaluación.
              </p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <Stepper step={step} setStep={setStep} />

        {/* Errores */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 mb-6">
            <ul className="list-disc list-inside space-y-1 text-sm">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PASO 1: DATOS */}
          {step === 1 && (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-600" />
                Datos del curso
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Título
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Diseño Visual y Creatividad"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe brevemente de qué trata el curso y sus objetivos..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipo de enseñanza
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {LEARNING_STYLES.map((s) => (
                      <button
                        type="button"
                        key={s.key}
                        onClick={() => setLearningStyle(s.key)}
                        className={`px-3 py-2 rounded-lg border text-sm transition ${
                          learningStyle === s.key
                            ? "border-slate-900 text-slate-900 bg-slate-100"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nivel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {LEVELS.map((l) => (
                      <button
                        type="button"
                        key={l.key}
                        onClick={() => setLevel(l.key)}
                        className={`px-3 py-2 rounded-lg border text-sm transition ${
                          level === l.key
                            ? "border-slate-900 text-slate-900 bg-slate-100"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Categoría (opcional)
                  </label>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ej: Creatividad, Música, Comunicación"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>
            </section>
          )}

          {/* PASO 2: ARCHIVO */}
          {step === 2 && (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-slate-600" />
                Contenido del curso (archivo)
              </h2>

              <div className="rounded-xl border border-dashed border-slate-300 p-6 bg-slate-50">
                <input
                  id="file"
                  type="file"
                  accept=".pdf,.mp4,.mp3,.wav,.zip,.ppt,.pptx,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-600" />
                  </div>
                  <p className="text-slate-700 font-medium">
                    Haz click para subir el archivo
                  </p>
                  <p className="text-slate-500 text-xs">
                    PDF, Video (mp4), Audio (mp3/wav), Presentaciones, ZIP • Máx
                    200MB
                  </p>
                </label>

                {file && (
                  <div className="mt-4 bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-slate-600 hover:text-slate-900 text-sm"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 text-slate-500 text-sm">
                <HelpCircle className="w-4 h-4 mt-0.5" />
                <p>
                  Este archivo será el **material base** del curso (apuntes,
                  video clase, audio, etc.). Puedes complementar luego con más
                  recursos en la edición del curso.
                </p>
              </div>
            </section>
          )}

          {/* PASO 3: PREGUNTAS */}
          {step === 3 && (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-slate-600" />
                Evaluación (Preguntas)
              </h2>

              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-700 font-medium">
                        Pregunta #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <select
                          value={q.type}
                          onChange={(e) =>
                            updateQuestion(q.id, (curr) => {
                              const nextType = e.target.value;
                              if (nextType === curr.type) return curr;
                              // Convertir tipo manteniendo el prompt
                              if (nextType === "multiple") {
                                return {
                                  id: curr.id,
                                  type: "multiple",
                                  prompt: curr.prompt,
                                  options: [
                                    {
                                      id: crypto.randomUUID(),
                                      text: "",
                                      correct: false,
                                    },
                                    {
                                      id: crypto.randomUUID(),
                                      text: "",
                                      correct: false,
                                    },
                                  ],
                                };
                              }
                              return {
                                id: curr.id,
                                type: "open",
                                prompt: curr.prompt,
                                expectedAnswer: "",
                              };
                            })
                          }
                          className="text-sm rounded-lg border border-slate-300 px-2 py-1"
                        >
                          <option value="multiple">Opción múltiple</option>
                          <option value="open">Respuesta abierta</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeQuestion(q.id)}
                          className="text-red-600 hover:bg-red-50 rounded-lg p-2"
                          title="Eliminar pregunta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Enunciado de la pregunta
                    </label>
                    <input
                      value={q.prompt}
                      onChange={(e) =>
                        updateQuestion(q.id, (curr) => ({
                          ...curr,
                          prompt: e.target.value,
                        }))
                      }
                      placeholder="Escribe la pregunta que verán tus alumnos"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 mb-4"
                    />

                    {q.type === "multiple" ? (
                      <div className="space-y-3">
                        {q.options.map((o, j) => (
                          <div key={o.id} className="flex items-center gap-2">
                            <input
                              value={o.text}
                              onChange={(e) =>
                                setOptionText(q.id, o.id, e.target.value)
                              }
                              placeholder={`Opción ${j + 1}`}
                              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                            <button
                              type="button"
                              onClick={() => toggleOptionCorrect(q.id, o.id)}
                              className={`px-3 py-2 rounded-lg border text-sm ${
                                o.correct
                                  ? "border-green-600 text-green-700 bg-green-50"
                                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
                              }`}
                              title="Marcar como correcta"
                            >
                              Correcta
                            </button>
                            <button
                              type="button"
                              onClick={() => removeOption(q.id, o.id)}
                              className="text-slate-600 hover:text-slate-900 rounded-lg p-2"
                              title="Eliminar opción"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div>
                          <button
                            type="button"
                            onClick={() => addOption(q.id)}
                            className="inline-flex items-center gap-2 text-slate-800 border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50"
                          >
                            <PlusCircle className="w-4 h-4" />
                            Agregar opción
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Respuesta esperada
                        </label>
                        <textarea
                          rows={3}
                          value={q.expectedAnswer}
                          onChange={(e) =>
                            updateQuestion(q.id, (curr) => ({
                              ...curr,
                              expectedAnswer: e.target.value,
                            }))
                          }
                          placeholder="Describe qué esperas que responda el alumno"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => addQuestion("multiple")}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Añadir pregunta (opción múltiple)
                  </button>
                  <button
                    type="button"
                    onClick={() => addQuestion("open")}
                    className="inline-flex items-center gap-2 border border-slate-300 text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Añadir pregunta (abierta)
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Footer navegación */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 transition disabled:opacity-50"
              disabled={step === 1 || submitting}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:shadow-lg transition disabled:opacity-50"
                disabled={submitting}
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? "Creando curso..." : "Crear curso"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Stepper({ step, setStep }) {
  const steps = [
    { id: 1, label: "Datos del curso" },
    { id: 2, label: "Contenido" },
    { id: 3, label: "Evaluación" },
  ];
  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-3">
        {steps.map((s) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(s.id)}
              className={`rounded-xl border px-3 py-3 text-left transition ${
                active
                  ? "border-slate-900 bg-slate-100"
                  : done
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">
                  {s.label}
                </span>
                {done && <CheckCircle2 className="w-4 h-4 text-green-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">Paso {s.id} de 3</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
