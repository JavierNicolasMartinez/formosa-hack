
/**
 * Calcula la metodología óptima según respuestas del estudiante
 * @param {Array} answers - Array de respuestas con { type, score }
 * @returns {Object} { recommendedMethod: String, scores: Object }
 */
export const calculateStudyMethod = (answers) => {
  // lógica que recibe las respuestas y devuelve el método recomendado
  const scores = { Visual: 0, Auditory: 0, Kinesthetic: 0 };

  answers.forEach((a) => {
    if (a.type && a.score) {
      scores[a.type] += a.score;
    }
  });

  const recommendedMethod = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  return { recommendedMethod, scores };
};

