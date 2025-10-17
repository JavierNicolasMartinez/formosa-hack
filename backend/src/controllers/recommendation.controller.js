import Recommendation from "../models/Recommendation.model.js";

export const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate("student")
      .populate("content");
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener recomendaciones", error });
  }
};

export const getRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id)
      .populate("student")
      .populate("content");

    if (!recommendation) return res.status(404).json({ message: "Recomendación no encontrada" });

    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener recomendación", error });
  }
};

export const createRecommendation = async (req, res) => {
  try {
    const newRecommendation = new Recommendation(req.body);
    const saved = await newRecommendation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear recomendación", error });
  }
};

export const updateRecommendation = async (req, res) => {
  try {
    const updated = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Recomendación no encontrada" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar recomendación", error });
  }
};

export const deleteRecommendation = async (req, res) => {
  try {
    const deleted = await Recommendation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recomendación no encontrada" });
    res.json({ message: "Recomendación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar recomendación", error });
  }
};
