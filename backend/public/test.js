const apiURL = "http://localhost:3000/api/tests";
const container = document.getElementById("test-container");
const nextBtn = document.getElementById("next-btn");

let questions = [];
let currentIndex = 0;

// 🔸 Cargar preguntas desde la API
async function loadQuestions() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    questions = data.data || data; // depende de cómo envíes la respuesta
    renderQuestion();
  } catch (error) {
    console.error("Error al cargar preguntas:", error);
    container.innerHTML = "<p>No se pudieron cargar las preguntas.</p>";
  }
}

// 🔸 Renderizar la pregunta actual
function renderQuestion() {
  if (questions.length === 0) {
    container.innerHTML = "<p>No hay preguntas disponibles.</p>";
    nextBtn.style.display = "none";
    return;
  }

  const question = questions[currentIndex];
  container.innerHTML = `
    <h3>${question.section}</h3>
    <p>${question.question}</p>
    ${question.options
      .map(
        (opt, idx) => `
        <label>
          <input type="radio" name="option" value="${opt.score}" />
          ${opt.text}
        </label><br>
      `
      )
      .join("")}
  `;
}

// 🔸 Avanzar a la siguiente pregunta
nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    container.innerHTML = "<h2>¡Test completado!</h2>";
    nextBtn.style.display = "none";
  }
});

// 🔸 Iniciar
loadQuestions();

