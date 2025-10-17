import Question from "../models/Question.model.js";

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("form");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener preguntas", error });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("form");
    if (!question) return res.status(404).json({ message: "Pregunta no encontrada" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pregunta", error });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear pregunta", error });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Pregunta no encontrada" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar pregunta", error });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Pregunta no encontrada" });

    question.deletedAt = new Date();
    await question.save();

    res.json({ message: "Pregunta eliminada correctamente (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pregunta", error });
  }
};
