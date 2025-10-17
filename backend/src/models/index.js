import mongoose from "mongoose";
const { Schema } = mongoose;


import Admin from "./Admin.model.js";
import Content from "./Content.model.js";
import ContentView from "./ContentView.model.js";
import Feedback from "./Feedback.model.js";
import Form from "./Form.model.js";
import Message from "./Message.model.js";
import Question from "./Question.model.js";
import Recommendation from "./Recommendation.model.js";
import Reminder from "./Reminder.model.js";
import Report from "./Report.model.js";
import Student from "./Student.model.js";
import StudentResult from "./StudentResult.model.js";
import StudyMethod from "./StudyMethod.model.js";
import Tutor from "./Tutor.model.js";
import TutorRating from "./TutorRating.model.js";
import User from "./user.model.js";
import Test from "./test.model.js";

// 📌 Usuario - Estudiante / Tutor / Admin
// Ya están en User, reforzamos para consulta cruzada
Student.schema.add({
  user: { type: "ObjectId", ref: "User", required: true },
  studyMethod: { type: "ObjectId", ref: "StudyMethod", default: null },
});

Tutor.schema.add({
  user: { type: "ObjectId", ref: "User", required: true },
});

Admin.schema.add({
  user: { type: "ObjectId", ref: "User", required: true },
});

// 📚 Contenido
Content.schema.add({
  tutor: { type: "ObjectId", ref: "Tutor", required: true },
});

// 📝 Formulario y Preguntas
Form.schema.add({
  content: { type: "ObjectId", ref: "Content", required: true },
});

Question.schema.add({
  form: { type: "ObjectId", ref: "Form", required: true },
});

// 📊 Resultados de Estudiantes
StudentResult.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  form: { type: "ObjectId", ref: "Form", required: true },
  answers: [
    {
      question: { type: "ObjectId", ref: "Question" },
      answer: Schema.Types.Mixed,
      correct: { type: Boolean, default: false },
      score: { type: Number, default: 0 },
    },
  ],
});

// 👀 Contenido visto
ContentView.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  content: { type: "ObjectId", ref: "Content", required: true },
});

// 💬 Feedback
Feedback.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  content: { type: "ObjectId", ref: "Content", required: true },
});

// ⭐ Calificación de Tutor
TutorRating.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  tutor: { type: "ObjectId", ref: "Tutor", required: true },
});

// ✉️ Mensajes
Message.schema.add({
  sender: { type: "ObjectId", ref: "User", required: true },
  recipient: { type: "ObjectId", ref: "User", required: true },
  contentRef: { type: "ObjectId", ref: "Content", default: null },
});

// 🚨 Reporte / Denuncia
Report.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  content: { type: "ObjectId", ref: "Content", required: true },
  reviewedBy: { type: "ObjectId", ref: "Admin", default: null },
});

// ⏰ Recordatorios
Reminder.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  content: { type: "ObjectId", ref: "Content", default: null },
});

// 📌 Recomendaciones
Recommendation.schema.add({
  student: { type: "ObjectId", ref: "Student", required: true },
  content: { type: "ObjectId", ref: "Content", required: true },
});

// ==========================================
//              EXPORTACIONES
// ==========================================
export {
  Admin,
  Content,
  ContentView,
  Feedback,
  Form,
  Message,
  Question,
  Recommendation,
  Reminder,
  Report,
  Student,
  StudentResult,
  StudyMethod,
  Tutor,
  TutorRating,
  User,
  Test,
};
