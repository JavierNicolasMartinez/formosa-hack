import StudyMethod from "../models/StudyMethod.model.js";

export const getAllStudyMethods = async (req, res) => {
  try {
    const methods = await StudyMethod.find();
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener métodos de estudio", error });
  }
};

export const getStudyMethodById = async (req, res) => {
  try {
    const method = await StudyMethod.findById(req.params.id);
    if (!method) return res.status(404).json({ message: "Método de estudio no encontrado" });
    res.json(method);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener método de estudio", error });
  }
};

export const createStudyMethod = async (req, res) => {
  try {
    const newMethod = new StudyMethod(req.body);
    const saved = await newMethod.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear método de estudio", error });
  }
};

export const updateStudyMethod = async (req, res) => {
  try {
    const updated = await StudyMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Método de estudio no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar método de estudio", error });
  }
};

export const deleteStudyMethod = async (req, res) => {
  try {
    const deleted = await StudyMethod.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Método de estudio no encontrado" });
    res.json({ message: "Método de estudio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar método de estudio", error });
  }
};
