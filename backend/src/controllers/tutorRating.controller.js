import TutorRating from "../models/TutorRating.model.js";

export const getAllTutorRatings = async (req, res) => {
  try {
    const ratings = await TutorRating.find()
      .populate("student")
      .populate("tutor");
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener calificaciones", error });
  }
};

export const getTutorRatingById = async (req, res) => {
  try {
    const rating = await TutorRating.findById(req.params.id)
      .populate("student")
      .populate("tutor");
    if (!rating) return res.status(404).json({ message: "Calificación no encontrada" });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener calificación", error });
  }
};

export const createTutorRating = async (req, res) => {
  try {
    const newRating = new TutorRating(req.body);
    const saved = await newRating.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear calificación", error });
  }
};

export const updateTutorRating = async (req, res) => {
  try {
    const updated = await TutorRating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Calificación no encontrada" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar calificación", error });
  }
};

export const deleteTutorRating = async (req, res) => {
  try {
    const deleted = await TutorRating.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Calificación no encontrada" });
    res.json({ message: "Calificación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar calificación", error });
  }
};
