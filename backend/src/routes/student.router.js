import express from "express"
import {submitDiagnosticTest,getStudentDashboard,getRecommendedContent,viewContent,submitForm,submitFeedback,rateTutor,sendMessageToTutor,getMessages,setStudyAvailability,createReminder,getReminders,updateReminder,reportContent,getStudentProgress,} from "../controllers/student.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { requireStudent } from "../middleware/role.middleware.js"

const router = express.Router()

// Todas las rutas requieren autenticación y rol de estudiante
router.use(authenticate)
router.use(requireStudent)

// Diagnóstico y onboarding
router.post("/diagnostic-test", submitDiagnosticTest)

// Dashboard y progreso
router.get("/dashboard", getStudentDashboard)
router.get("/progress", getStudentProgress)

// Contenido
router.get("/content/recommended", getRecommendedContent)
router.get("/content/:contentId/view", viewContent)

// Formularios y tests
router.post("/forms/:formId/submit", submitForm)

// Feedback y calificaciones
router.post("/content/:contentId/feedback", submitFeedback)
router.post("/tutors/:tutorId/rate", rateTutor)

// Mensajería
router.post("/tutors/:tutorId/message", sendMessageToTutor)
router.get("/messages", getMessages)

// Disponibilidad y recordatorios
router.post("/availability", setStudyAvailability)
router.post("/reminders", createReminder)
router.get("/reminders", getReminders)
router.put("/reminders/:reminderId", updateReminder)

// Reportes
router.post("/content/:contentId/report", reportContent)

export default router
