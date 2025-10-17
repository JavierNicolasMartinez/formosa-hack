import StudentResult from "../models/StudentResult.model.js";

export const getAllStudentResults = async (req, res) => {
  try {
    const results = await StudentResult.find()
      .populate("student", "user")
      .populate("form")
      .populate("answers.question");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener resultados", error });
  }
};

export const getStudentResultById = async (req, res) => {
  try {
    const result = await StudentResult.findById(req.params.id)
      .populate("student", "user")
      .populate("form")
      .populate("answers.question");
    if (!result) return res.status(404).json({ message: "Resultado no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener resultado", error });
  }
};

export const createStudentResult = async (req, res) => {
  try {
    const newResult = new StudentResult(req.body);
    const saved = await newResult.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear resultado", error });
  }
};

export const updateStudentResult = async (req, res) => {
  try {
    const updated = await StudentResult.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("student", "user")
      .populate("form")
      .populate("answers.question");
    if (!updated) return res.status(404).json({ message: "Resultado no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar resultado", error });
  }
};

export const deleteStudentResult = async (req, res) => {
  try {
    const deleted = await StudentResult.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Resultado no encontrado" });
    res.json({ message: "Resultado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar resultado", error });
  }
};
