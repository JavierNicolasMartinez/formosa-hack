import Tutor from "../models/Tutor.model.js";

export const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find().populate("user");
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tutores", error });
  }
};

export const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).populate("user");
    if (!tutor) return res.status(404).json({ message: "Tutor no encontrado" });
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tutor", error });
  }
};

export const createTutor = async (req, res) => {
  try {
    const newTutor = new Tutor(req.body);
    const saved = await newTutor.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear tutor", error });
  }
};

export const updateTutor = async (req, res) => {
  try {
    const updated = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Tutor no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar tutor", error });
  }
};

export const softDeleteTutor = async (req, res) => {
  try {
    const deleted = await Tutor.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ message: "Tutor no encontrado" });
    res.json({ message: "Tutor eliminado correctamente (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tutor", error });
  }
};
