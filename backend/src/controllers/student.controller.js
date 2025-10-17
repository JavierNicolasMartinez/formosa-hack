import {Student,Content,ContentView,Feedback,TutorRating,Message,Reminder,Recommendation,StudentResult,Form,Question,Report,StudyMethod,Tutor,} from "../models/index.js"

// Diagnóstico de método de estudio
export const submitDiagnosticTest = async (req, res) => {
  try {
    const { userId } = req.user
    const { answers, interests, studyHabits, careerInterests } = req.body

    // Calcular método de estudio basado en respuestas
    const studyMethodResult = calculateStudyMethod(answers)

    // Buscar o crear el método de estudio
    let studyMethod = await StudyMethod.findOne({ name: studyMethodResult })

    if (!studyMethod) {
      studyMethod = await StudyMethod.create({
        name: studyMethodResult,
        description: `Método de estudio ${studyMethodResult}`,
      })
    }

    // Actualizar perfil del estudiante
    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    student.studyMethod = studyMethod._id
    student.interests = interests || []
    student.metadata.onboardingCompleted = true
    await student.save()

    // Generar recomendaciones iniciales
    await generateInitialRecommendations(student._id, studyMethod._id, interests)

    res.status(200).json({
      success: true,
      message: "Test diagnóstico completado exitosamente",
      data: {
        studyMethod: studyMethod.name,
        student,
      },
    })
  } catch (error) {
    console.error("Error en submitDiagnosticTest:", error)
    res.status(500).json({
      success: false,
      message: "Error al procesar el test diagnóstico",
      error: error.message,
    })
  }
}

// Dashboard personalizado del estudiante
export const getStudentDashboard = async (req, res) => {
  try {
    const { userId } = req.user

    const student = await Student.findOne({ user: userId })
      .populate("studyMethod")
      .populate("user", "first_name last_name email")

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    // Obtener recomendaciones de contenido
    const recommendations = await Recommendation.find({
      student: student._id,
      read: false,
    })
      .populate({
        path: "content",
        populate: { path: "tutor", populate: { path: "user" } },
      })
      .limit(10)
      .sort({ assignedAt: -1 })

    // Obtener contenidos vistos recientemente
    const recentViews = await ContentView.find({ student: student._id })
      .populate("content")
      .sort({ viewedAt: -1 })
      .limit(5)

    // Obtener recordatorios activos
    const reminders = await Reminder.find({
      student: student._id,
      active: true,
    })

    res.status(200).json({
      success: true,
      data: {
        student: {
          name: `${student.user.first_name} ${student.user.last_name}`,
          studyMethod: student.studyMethod?.name || "No asignado",
          interests: student.interests,
          stats: student.stats,
        },
        recommendations,
        recentViews,
        reminders,
      },
    })
  } catch (error) {
    console.error("Error en getStudentDashboard:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener el dashboard",
      error: error.message,
    })
  }
}

// Obtener contenido recomendado
export const getRecommendedContent = async (req, res) => {
  try {
    const { userId } = req.user
    const { page = 1, limit = 10, category, type } = req.query

    const student = await Student.findOne({ user: userId }).populate("studyMethod")

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    // Construir filtro de contenido
    const contentFilter = { isActive: true }

    if (category) contentFilter.category = category
    if (type) contentFilter.type = type

    // Filtrar por intereses del estudiante
    if (student.interests.length > 0) {
      contentFilter.tags = { $in: student.interests }
    }

    const skip = (page - 1) * limit

    const contents = await Content.find(contentFilter)
      .populate({
        path: "tutor",
        populate: { path: "user", select: "first_name last_name" },
      })
      .skip(skip)
      .limit(Number.parseInt(limit))
      .sort({ uploadedAt: -1 })

    const total = await Content.countDocuments(contentFilter)

    res.status(200).json({
      success: true,
      data: {
        contents,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error en getRecommendedContent:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener contenido recomendado",
      error: error.message,
    })
  }
}

// Ver contenido específico
export const viewContent = async (req, res) => {
  try {
    const { userId } = req.user
    const { contentId } = req.params

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const content = await Content.findById(contentId).populate({
      path: "tutor",
      populate: { path: "user" },
    })

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Contenido no encontrado",
      })
    }

    // Registrar visualización
    let contentView = await ContentView.findOne({
      student: student._id,
      content: contentId,
    })

    if (!contentView) {
      contentView = await ContentView.create({
        student: student._id,
        content: contentId,
        viewedAt: new Date(),
      })
    } else {
      contentView.viewedAt = new Date()
      await contentView.save()
    }

    // Actualizar última actividad del estudiante
    student.metadata.lastActiveAt = new Date()
    await student.save()

    res.status(200).json({
      success: true,
      data: {
        content,
        contentView,
      },
    })
  } catch (error) {
    console.error("Error en viewContent:", error)
    res.status(500).json({
      success: false,
      message: "Error al ver contenido",
      error: error.message,
    })
  }
}

// Completar formulario/test de contenido
export const submitForm = async (req, res) => {
  try {
    const { userId } = req.user
    const { formId } = req.params
    const { answers } = req.body

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const form = await Form.findById(formId).populate("content")

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Formulario no encontrado",
      })
    }

    // Obtener preguntas del formulario
    const questions = await Question.find({ form: formId })

    // Calcular puntaje
    let totalScore = 0
    let maxScore = 0
    const processedAnswers = []

    for (const answer of answers) {
      const question = questions.find((q) => q._id.toString() === answer.questionId)

      if (!question) continue

      maxScore += question.score

      let isCorrect = false
      let earnedScore = 0

      if (question.type === "multiple_choice") {
        const correctOption = question.options.find((opt) => opt.correct)
        isCorrect = correctOption?.text === answer.answer
        earnedScore = isCorrect ? question.score : 0
      } else if (question.type === "true_false") {
        const correctOption = question.options.find((opt) => opt.correct)
        isCorrect = correctOption?.text === answer.answer
        earnedScore = isCorrect ? question.score : 0
      }

      totalScore += earnedScore

      processedAnswers.push({
        question: question._id,
        answer: answer.answer,
        correct: isCorrect,
        score: earnedScore,
      })
    }

    // Guardar resultado
    const studentResult = await StudentResult.create({
      student: student._id,
      form: formId,
      answers: processedAnswers,
      totalScore,
      maxScore,
      completedAt: new Date(),
    })

    // Actualizar estadísticas del estudiante
    student.stats.contentsCompleted += 1
    const newAverage =
      (student.stats.averageScore * (student.stats.contentsCompleted - 1) + (totalScore / maxScore) * 100) /
      student.stats.contentsCompleted
    student.stats.averageScore = Math.round(newAverage * 100) / 100
    await student.save()

    // Marcar contenido como completado
    await ContentView.findOneAndUpdate(
      { student: student._id, content: form.content },
      { completed: true, progress: 100 },
      { upsert: true },
    )

    res.status(200).json({
      success: true,
      message: "Formulario completado exitosamente",
      data: {
        result: studentResult,
        percentage: Math.round((totalScore / maxScore) * 100),
      },
    })
  } catch (error) {
    console.error("Error en submitForm:", error)
    res.status(500).json({
      success: false,
      message: "Error al enviar formulario",
      error: error.message,
    })
  }
}

// Dar feedback sobre contenido
export const submitFeedback = async (req, res) => {
  try {
    const { userId } = req.user
    const { contentId } = req.params
    const { comment } = req.body

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const content = await Content.findById(contentId)

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Contenido no encontrado",
      })
    }

    const feedback = await Feedback.create({
      student: student._id,
      content: contentId,
      comment,
    })

    res.status(201).json({
      success: true,
      message: "Feedback enviado exitosamente",
      data: feedback,
    })
  } catch (error) {
    console.error("Error en submitFeedback:", error)
    res.status(500).json({
      success: false,
      message: "Error al enviar feedback",
      error: error.message,
    })
  }
}

// Calificar tutor
export const rateTutor = async (req, res) => {
  try {
    const { userId } = req.user
    const { tutorId } = req.params
    const { stars, comment } = req.body

    if (stars < 1 || stars > 5) {
      return res.status(400).json({
        success: false,
        message: "La calificación debe estar entre 1 y 5 estrellas",
      })
    }

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const tutor = await Tutor.findById(tutorId)

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor no encontrado",
      })
    }

    // Verificar si ya calificó a este tutor
    const existingRating = await TutorRating.findOne({
      student: student._id,
      tutor: tutorId,
    })

    if (existingRating) {
      // Actualizar calificación existente
      const oldStars = existingRating.stars
      existingRating.stars = stars
      existingRating.comment = comment || existingRating.comment
      await existingRating.save()

      // Recalcular promedio del tutor
      const newAverage = (tutor.rating.average * tutor.rating.count - oldStars + stars) / tutor.rating.count
      tutor.rating.average = Math.round(newAverage * 10) / 10
      await tutor.save()

      return res.status(200).json({
        success: true,
        message: "Calificación actualizada exitosamente",
        data: existingRating,
      })
    }

    // Crear nueva calificación
    const rating = await TutorRating.create({
      student: student._id,
      tutor: tutorId,
      stars,
      comment: comment || "",
    })

    // Actualizar promedio del tutor
    const newCount = tutor.rating.count + 1
    const newAverage = (tutor.rating.average * tutor.rating.count + stars) / newCount
    tutor.rating.average = Math.round(newAverage * 10) / 10
    tutor.rating.count = newCount
    await tutor.save()

    res.status(201).json({
      success: true,
      message: "Tutor calificado exitosamente",
      data: rating,
    })
  } catch (error) {
    console.error("Error en rateTutor:", error)
    res.status(500).json({
      success: false,
      message: "Error al calificar tutor",
      error: error.message,
    })
  }
}

// Enviar mensaje a tutor
export const sendMessageToTutor = async (req, res) => {
  try {
    const { userId } = req.user
    const { tutorId } = req.params
    const { content, contentRef } = req.body

    const tutor = await Tutor.findById(tutorId).populate("user")

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor no encontrado",
      })
    }

    const message = await Message.create({
      sender: userId,
      recipient: tutor.user._id,
      content,
      contentRef: contentRef || null,
    })

    res.status(201).json({
      success: true,
      message: "Mensaje enviado exitosamente",
      data: message,
    })
  } catch (error) {
    console.error("Error en sendMessageToTutor:", error)
    res.status(500).json({
      success: false,
      message: "Error al enviar mensaje",
      error: error.message,
    })
  }
}

// Obtener mensajes del estudiante
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.user
    const { page = 1, limit = 20 } = req.query

    const skip = (page - 1) * limit

    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .populate("sender", "first_name last_name")
      .populate("recipient", "first_name last_name")
      .populate("contentRef", "title")
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Message.countDocuments({
      $or: [{ sender: userId }, { recipient: userId }],
    })

    res.status(200).json({
      success: true,
      data: {
        messages,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error en getMessages:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener mensajes",
      error: error.message,
    })
  }
}

// Configurar disponibilidad de estudio
export const setStudyAvailability = async (req, res) => {
  try {
    const { userId } = req.user
    const { daysAvailable, schedulesAvailable } = req.body

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    student.daysAvailable = daysAvailable || student.daysAvailable
    student.schedulesAvailable = schedulesAvailable || student.schedulesAvailable
    await student.save()

    res.status(200).json({
      success: true,
      message: "Disponibilidad actualizada exitosamente",
      data: {
        daysAvailable: student.daysAvailable,
        schedulesAvailable: student.schedulesAvailable,
      },
    })
  } catch (error) {
    console.error("Error en setStudyAvailability:", error)
    res.status(500).json({
      success: false,
      message: "Error al configurar disponibilidad",
      error: error.message,
    })
  }
}

// Crear recordatorio de estudio
export const createReminder = async (req, res) => {
  try {
    const { userId } = req.user
    const { days, time, message, contentId } = req.body

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const reminder = await Reminder.create({
      student: student._id,
      content: contentId || null,
      days,
      time,
      message: message || "Es hora de estudiar",
      active: true,
    })

    res.status(201).json({
      success: true,
      message: "Recordatorio creado exitosamente",
      data: reminder,
    })
  } catch (error) {
    console.error("Error en createReminder:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear recordatorio",
      error: error.message,
    })
  }
}

// Obtener recordatorios del estudiante
export const getReminders = async (req, res) => {
  try {
    const { userId } = req.user

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const reminders = await Reminder.find({ student: student._id }).populate("content", "title")

    res.status(200).json({
      success: true,
      data: reminders,
    })
  } catch (error) {
    console.error("Error en getReminders:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener recordatorios",
      error: error.message,
    })
  }
}

// Actualizar recordatorio
export const updateReminder = async (req, res) => {
  try {
    const { userId } = req.user
    const { reminderId } = req.params
    const { days, time, message, active } = req.body

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const reminder = await Reminder.findOne({
      _id: reminderId,
      student: student._id,
    })

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Recordatorio no encontrado",
      })
    }

    if (days) reminder.days = days
    if (time) reminder.time = time
    if (message) reminder.message = message
    if (typeof active !== "undefined") reminder.active = active

    await reminder.save()

    res.status(200).json({
      success: true,
      message: "Recordatorio actualizado exitosamente",
      data: reminder,
    })
  } catch (error) {
    console.error("Error en updateReminder:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar recordatorio",
      error: error.message,
    })
  }
}

// Reportar contenido inapropiado
export const reportContent = async (req, res) => {
  try {
    const { userId } = req.user
    const { contentId } = req.params
    const { reason } = req.body

    const student = await Student.findOne({ user: userId })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    const content = await Content.findById(contentId)

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Contenido no encontrado",
      })
    }

    const report = await Report.create({
      student: student._id,
      content: contentId,
      reason,
      status: "pending",
    })

    // Incrementar contador de reportes del contenido
    content.flaggedCount += 1
    await content.save()

    res.status(201).json({
      success: true,
      message: "Reporte enviado exitosamente",
      data: report,
    })
  } catch (error) {
    console.error("Error en reportContent:", error)
    res.status(500).json({
      success: false,
      message: "Error al reportar contenido",
      error: error.message,
    })
  }
}

// Obtener progreso del estudiante
export const getStudentProgress = async (req, res) => {
  try {
    const { userId } = req.user

    const student = await Student.findOne({ user: userId }).populate("studyMethod")

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Perfil de estudiante no encontrado",
      })
    }

    // Obtener resultados de tests
    const results = await StudentResult.find({ student: student._id })
      .populate({
        path: "form",
        populate: { path: "content", select: "title category" },
      })
      .sort({ completedAt: -1 })
      .limit(10)

    // Obtener contenidos vistos
    const viewedContents = await ContentView.find({ student: student._id })
      .populate("content", "title type category")
      .sort({ viewedAt: -1 })

    res.status(200).json({
      success: true,
      data: {
        stats: student.stats,
        studyMethod: student.studyMethod?.name,
        recentResults: results,
        viewedContents,
      },
    })
  } catch (error) {
    console.error("Error en getStudentProgress:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener progreso",
      error: error.message,
    })
  }
}

// Funciones auxiliares
function calculateStudyMethod(answers) {
  // Lógica para determinar el método de estudio basado en respuestas
  // Esta es una implementación simplificada
  const scores = {
    Visual: 0,
    Auditivo: 0,
    "Lectura/Escritura": 0,
  }

  answers.forEach((answer) => {
    if (answer.type === "visual") scores.Visual += answer.weight || 1
    if (answer.type === "auditory") scores.Auditivo += answer.weight || 1
    if (answer.type === "reading") scores["Lectura/Escritura"] += answer.weight || 1
  })

  const maxScore = Math.max(...Object.values(scores))
  const methods = Object.keys(scores).filter((key) => scores[key] === maxScore)

  // Si hay empate o puntajes similares, es Mixto
  if (methods.length > 1) {
    return "Mixto"
  }

  return methods[0]
}

async function generateInitialRecommendations(studentId, studyMethodId, interests) {
  try {
    // Buscar contenidos que coincidan con el método de estudio e intereses
    const contentFilter = { isActive: true }

    if (interests && interests.length > 0) {
      contentFilter.tags = { $in: interests }
    }

    const contents = await Content.find(contentFilter).limit(10)

    // Crear recomendaciones
    const recommendations = contents.map((content) => ({
      student: studentId,
      content: content._id,
      reason: "Basado en tu método de estudio e intereses",
      assignedAt: new Date(),
    }))

    if (recommendations.length > 0) {
      await Recommendation.insertMany(recommendations)
    }
  } catch (error) {
    console.error("Error generando recomendaciones iniciales:", error)
  }
}
