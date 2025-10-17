import { useState } from "react";

function LearningStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [learningStyle, setLearningStyle] = useState(null);
  const [manualOverride, setManualOverride] = useState(false);

  const questions = [
    {
      section: "Estilo de Aprendizaje",
      question: "Cuando estudio algo nuevo, me resulta más fácil aprender si:",
      options: [
        { text: "Veo ejemplos, gráficos o videos", type: "visual" },
        { text: "Escucho explicaciones o clases en audio", type: "auditivo" },
        { text: "Leo textos, libros o apuntes", type: "lectura" },
        { text: "Hago prácticas o actividades", type: "kinestesico" },
      ],
    },
    {
      section: "Estilo de Aprendizaje",
      question: "Cuando quiero recordar información, prefiero:",
      options: [
        { text: "Diagramas o mapas conceptuales", type: "visual" },
        { text: "Explicar o escuchar grabaciones", type: "auditivo" },
        { text: "Subrayar o escribir resúmenes", type: "lectura" },
        { text: "Resolver problemas prácticos", type: "kinestesico" },
      ],
    },
    {
      section: "Estilo de Aprendizaje",
      question: "En un examen, me siento más seguro cuando:",
      options: [
        { text: "He visto material visual", type: "visual" },
        { text: "He escuchado explicaciones", type: "auditivo" },
        { text: "He leído y tomado apuntes", type: "lectura" },
        { text: "He practicado ejercicios", type: "kinestesico" },
      ],
    },
    {
      section: "Motivación",
      question: "Me motiva estudiar cuando:",
      options: [
        { text: "Veo aplicación en la vida real", type: "practico" },
        { text: "Hay retos que me desafían", type: "competitivo" },
        { text: "Puedo organizar mi tiempo", type: "autonomo" },
        { text: "Recibo reconocimiento", type: "reconocimiento" },
      ],
    },
    {
      section: "Motivación",
      question: "Prefiero aprender:",
      options: [
        { text: "Solo, a mi ritmo", type: "individual" },
        { text: "En grupo, compartiendo ideas", type: "colaborativo" },
        { text: "Con un mentor que me guíe", type: "guiado" },
        { text: "Mezclando diferentes formas", type: "flexible" },
      ],
    },
    {
      section: "Hábitos de Estudio",
      question: "Cuando aprendo por mi cuenta:",
      options: [
        { text: "Busco videos tutoriales", type: "visual" },
        { text: "Escucho podcasts", type: "auditivo" },
        { text: "Leo artículos o libros", type: "lectura" },
        { text: "Hago proyectos prácticos", type: "kinestesico" },
      ],
    },
    {
      section: "Hábitos de Estudio",
      question: "Para aprender mejor, prefiero:",
      options: [
        { text: "Planificar mi tiempo", type: "organizado" },
        { text: "Pasos cortos y claros", type: "estructurado" },
        { text: "Diferentes formatos", type: "variado" },
        { text: "Proyectos reales", type: "practico" },
      ],
    },
    {
      section: "Intereses",
      question: "Elige tus áreas de interés:",
      options: [
        { text: "Tecnología e IA", type: "tecnologia" },
        { text: "Salud y Biotecnología", type: "salud" },
        { text: "Energía Sustentable", type: "energia" },
        { text: "Negocios Digitales", type: "negocios" },
        { text: "Arte Digital", type: "arte" },
      ],
      multiple: true,
    },
  ];

  const learningStyles = {
    visual: {
      name: "Visual",
      icon: "👀",
      description: "Aprendes mejor viendo",
      color: "from-blue-500 to-cyan-600",
      methods: [
        "📊 Diagramas y mapas conceptuales",
        "🎥 Videos explicativos",
        "📈 Infografías visuales",
        "🎨 Organizadores gráficos",
      ],
      message:
        "Tu mente procesa mejor la información cuando puede verla representada visualmente. Transformas conceptos abstractos en imágenes mentales claras.",
    },
    auditivo: {
      name: "Auditivo",
      icon: "👂",
      description: "Aprendes mejor escuchando",
      color: "from-green-500 to-emerald-600",
      methods: [
        "🎧 Podcasts y audiolibros",
        "💬 Discusiones grupales",
        "🎵 Grabaciones de clases",
        "🗣️ Enseñar a otros",
      ],
      message:
        "Tu cerebro captura y retiene información cuando la escucha. Recuerdas perfectamente explicaciones y puedes aprender mientras haces otras actividades.",
    },
    lectura: {
      name: "Lectura/Escritura",
      icon: "📖",
      description: "Aprendes mejor leyendo",
      color: "from-purple-500 to-indigo-600",
      methods: [
        "📚 Libros especializados",
        "📝 Apuntes detallados",
        "🖊️ Resúmenes escritos",
        "📋 Organizadores textuales",
      ],
      message:
        "Las palabras escritas son tu mejor aliado. A través de la lectura y escritura logras una comprensión profunda de los temas.",
    },
    kinestesico: {
      name: "Kinestésico",
      icon: "✨",
      description: "Aprendes mejor haciendo",
      color: "from-orange-500 to-red-500",
      methods: [
        "🔬 Experimentos prácticos",
        "🛠️ Proyectos hands-on",
        "🎯 Simulaciones reales",
        "🏃‍♂️ Aprendizaje activo",
      ],
      message:
        "Necesitas experimentar y poner en práctica lo que aprendes. Comprendes mejor cuando tus manos y cuerpo participan en el aprendizaje.",
    },
  };

  const handleAnswer = (option, isMultiple = false) => {
    if (isMultiple) {
      const currentAnswers = answers[currentQuestion] || [];
      const newAnswers = currentAnswers.includes(option.type)
        ? currentAnswers.filter((a) => a !== option.type)
        : [...currentAnswers, option.type];

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: newAnswers,
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: option.type,
      }));
    }
  };

  const calculateResults = () => {
    const styleScores = { visual: 0, auditivo: 0, lectura: 0, kinestesico: 0 };

    const styleQuestions = [0, 1, 2, 5];

    styleQuestions.forEach((qIndex) => {
      const answer = answers[qIndex];
      if (answer && styleScores[answer] !== undefined) {
        styleScores[answer]++;
      }
    });

    let dominantStyle = "visual";
    let maxScore = 0;

    Object.entries(styleScores).forEach(([style, score]) => {
      if (score > maxScore) {
        maxScore = score;
        dominantStyle = style;
      }
    });

    setLearningStyle(dominantStyle);
    setShowResults(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && learningStyle) {
    const style = learningStyles[learningStyle];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Resultado - Más grande */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${style.color} text-white p-8 text-center`}
            >
              <div className="text-6xl mb-4">{style.icon}</div>
              <h2 className="text-3xl font-bold mb-2">
                Eres un Aprendiz {style.name}
              </h2>
              <p className="text-xl opacity-90">{style.description}</p>
            </div>

            <div className="p-8">
              {/* Mensaje Motivacional */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🌟</div>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-3">
                      ¡Felicidades!
                    </h3>
                    <p className="text-amber-700 text-lg leading-relaxed">
                      {style.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Métodos Recomendados */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Métodos Recomendados
                </h3>
                <div className="grid gap-4">
                  {style.methods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 bg-slate-50 rounded-xl p-4 border border-slate-200"
                    >
                      <span className="text-3xl">{method.split(" ")[0]}</span>
                      <span className="text-slate-700 text-lg font-medium">
                        {method.substring(method.indexOf(" ") + 1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-slate-200">
                <button
                  onClick={() => setManualOverride(true)}
                  className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors border border-slate-300 text-base"
                >
                  ¿No estás convencido? Cambiar estilo
                </button>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all shadow-inner text-base"
                >
                  Comenzar mi Journey
                </button>
              </div>
            </div>
          </div>

          {/* Selector Manual */}
          {manualOverride && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Elige tu Estilo de Aprendizaje
                </h3>
                <div className="space-y-4 mb-6">
                  {Object.entries(learningStyles).map(([key, style]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setLearningStyle(key);
                        setManualOverride(false);
                      }}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        learningStyle === key
                          ? `border-slate-800 bg-slate-50`
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{style.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-800 text-lg">
                            {style.name}
                          </div>
                          <div className="text-slate-600">
                            {style.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setManualOverride(false)}
                  className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header - Más compacto pero más grande */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Descubre Tu Estilo 🧠
          </h1>
          <p className="text-slate-600 text-lg">
            Responde para personalizar tu experiencia de aprendizaje
          </p>
        </div>

        {/* Test Container - Más grande */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200">
          {/* Progress Bar */}
          <div className="bg-slate-100 h-3">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="p-8">
            {/* Section Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-base font-medium">
                  {questions[currentQuestion].section}
                </span>
                <span className="text-slate-500 text-base">
                  {currentQuestion + 1} de {questions.length}
                </span>
              </div>
            </div>

            {/* Question - Más grande */}
            <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
              {questions[currentQuestion].question}
            </h2>

            {/* Options - Más grandes y mejor espaciadas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = questions[currentQuestion].multiple
                  ? (answers[currentQuestion] || []).includes(option.type)
                  : answers[currentQuestion] === option.type;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(option, questions[currentQuestion].multiple)
                    }
                    className={`p-6 rounded-2xl border-2 transition-all text-left min-h-[100px] flex items-center ${
                      isSelected
                        ? "border-slate-800 bg-slate-50 shadow-lg"
                        : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "bg-slate-800 border-slate-800 text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {isSelected && "✓"}
                      </div>
                      <span className="text-slate-800 text-lg font-medium leading-tight">
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation - Más grande */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-8 py-4 rounded-xl font-semibold transition-colors text-lg ${
                  currentQuestion === 0
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ← Anterior
              </button>

              <button
                onClick={nextQuestion}
                disabled={
                  !answers[currentQuestion] ||
                  (questions[currentQuestion].multiple &&
                    answers[currentQuestion].length === 0)
                }
                className={`px-8 py-4 rounded-xl font-semibold transition-all text-lg ${
                  !answers[currentQuestion] ||
                  (questions[currentQuestion].multiple &&
                    answers[currentQuestion].length === 0)
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:shadow-xl shadow-inner"
                }`}
              >
                {currentQuestion === questions.length - 1
                  ? "Ver Resultados"
                  : "Siguiente →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningStyleTest;
