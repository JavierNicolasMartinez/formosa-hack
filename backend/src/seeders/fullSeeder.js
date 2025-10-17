// fullSeeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import {
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
} from "../models/index.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/testdb";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado ✅");

    // Limpiar colecciones
    await Promise.all([
      User.deleteMany(),
      Student.deleteMany(),
      Tutor.deleteMany(),
      Admin.deleteMany(),
      StudyMethod.deleteMany(),
      Content.deleteMany(),
      Form.deleteMany(),
      Question.deleteMany(),
      StudentResult.deleteMany(),
      ContentView.deleteMany(),
      Feedback.deleteMany(),
      TutorRating.deleteMany(),
      Message.deleteMany(),
      Report.deleteMany(),
      Reminder.deleteMany(),
      Recommendation.deleteMany(),
    ]);
    console.log("Colecciones limpiadas 🧹");

    // Crear métodos de estudio
    const studyMethods = await StudyMethod.insertMany([
      { name: "Visual", description: "Aprende mejor viendo imágenes o videos" },
      { name: "Auditory", description: "Aprende mejor escuchando" },
      { name: "Kinesthetic", description: "Aprende haciendo actividades físicas" },
    ]);

    const hashedPassword = await bcrypt.hash("123456", 10);

    // Crear usuarios
    const users = await User.insertMany([
      { username: "student01", email: "student01@example.com", password: hashedPassword, role: "student" },
      { username: "student02", email: "student02@example.com", password: hashedPassword, role: "student" },
      { username: "tutor01", email: "tutor01@example.com", password: hashedPassword, role: "tutor" },
      { username: "admin01", email: "admin01@example.com", password: hashedPassword, role: "admin" },
    ]);

    // Crear estudiantes
    const students = await Student.insertMany([
      {
        user: users.find(u => u.role === "student" && u.username === "student01")._id,
        studyMethod: studyMethods[0]._id,
        interests: ["Math", "Science"],
        daysAvailable: ["Mon", "Wed"],
        schedulesAvailable: ["18:00-19:00"],
      },
      {
        user: users.find(u => u.role === "student" && u.username === "student02")._id,
        studyMethod: studyMethods[1]._id,
        interests: ["History", "Art"],
        daysAvailable: ["Tue", "Thu"],
        schedulesAvailable: ["20:00-21:00"],
      },
    ]);

    // Crear tutor
    const tutors = await Tutor.insertMany([
      {
        user: users.find(u => u.role === "tutor")._id,
        description: "Tutor de ciencias",
        areasExpertise: ["Math", "Physics"],
      },
    ]);

    // Crear admin
    await Admin.create({
      user: users.find(u => u.role === "admin")._id,
      roleDescription: "Administrador del sistema",
    });

    console.log("Tutores creados:", tutors.map(t => t._id));
    const contents = await Content.insertMany([
    {
        title: "Matemática básica",
        description: "Introducción a álgebra",
        type: "PDF",
        level: "short",
        tutor: tutors[0]?._id, // seguridad si tutors[0] no existe
    },
    {
        title: "Física avanzada",
        description: "Conceptos de mecánica",
        type: "Video",
        level: "medium",
        tutor: tutors[0]?._id,
    },
    ]);
    console.log("Contents creados:", contents);

    // Formularios
    const forms = await Form.insertMany([
      { title: "Quiz Matemática", content: contents[0]._id, difficulty: "basic" },
      { title: "Quiz Física", content: contents[1]._id, difficulty: "intermediate" },
    ]);

    // Preguntas
    const questions = await Question.insertMany([
      {
        form: forms[0]._id,
        statement: "¿Cuánto es 2+2?",
        type: "multiple_choice",
        options: [
          { text: "3", correct: false },
          { text: "4", correct: true },
          { text: "5", correct: false },
        ],
      },
      {
        form: forms[1]._id,
        statement: "La aceleración de gravedad es 9.8 m/s². Verdadero o falso?",
        type: "true_false",
        options: [
          { text: "Verdadero", correct: true },
          { text: "Falso", correct: false },
        ],
      },
    ]);

    // Resultados de estudiantes
    await StudentResult.insertMany([
      {
        student: students[0]._id,
        form: forms[0]._id,
        answers: [{ question: questions[0]._id, answer: "4", correct: true, score: 1 }],
        totalScore: 1,
        maxScore: 1,
      },
      {
        student: students[1]._id,
        form: forms[1]._id,
        answers: [{ question: questions[1]._id, answer: "Verdadero", correct: true, score: 1 }],
        totalScore: 1,
        maxScore: 1,
      },
    ]);

    // ContentView
    await ContentView.insertMany([
      { student: students[0]._id, content: contents[0]._id, completed: true, progress: 100 },
      { student: students[1]._id, content: contents[1]._id, completed: false, progress: 50 },
    ]);

    // Feedback
    await Feedback.insertMany([
      { student: students[0]._id, content: contents[0]._id, comment: "Muy útil!" },
      { student: students[1]._id, content: contents[1]._id, comment: "Interesante contenido" },
    ]);

    // TutorRating
    await TutorRating.insertMany([
      { student: students[0]._id, tutor: tutors[0]._id, stars: 5, comment: "Excelente tutor" },
      { student: students[1]._id, tutor: tutors[0]._id, stars: 4, comment: "Buena explicación" },
    ]);

    // Mensajes
    await Message.insertMany([
      { sender: users[0]._id, recipient: users[2]._id, content: "Hola tutor, necesito ayuda" },
      { sender: users[1]._id, recipient: users[2]._id, content: "Hola tutor, consulta sobre física" },
    ]);

    // Reportes
    await Report.insertMany([
      { student: students[0]._id, content: contents[1]._id, reason: "Contenido inapropiado" },
    ]);

    // Reminders
    await Reminder.insertMany([
      { student: students[0]._id, content: contents[0]._id, days: ["Mon", "Wed"], time: "18:00", message: "Estudia Matemática" },
      { student: students[1]._id, content: contents[1]._id, days: ["Tue", "Thu"], time: "20:00", message: "Estudia Física" },
    ]);

    // Recommendations
    await Recommendation.insertMany([
      { student: students[0]._id, content: contents[1]._id, reason: "Relacionado con tu estudio" },
      { student: students[1]._id, content: contents[0]._id, reason: "Refuerza conceptos previos" },
    ]);

    console.log("Seeder completo ejecutado con éxito 🎉");
    process.exit();
  } catch (error) {
    console.error("Error al ejecutar el seeder:", error);
    process.exit(1);
  }
};

seedDatabase();
