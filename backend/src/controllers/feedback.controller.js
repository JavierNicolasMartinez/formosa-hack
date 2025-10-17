import Feedback from "../models/Feedback.model.js";

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("student")
      .populate("content");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener feedbacks", error });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("student")
      .populate("content");

    if (!feedback) {
      return res.status(404).json({ message: "Feedback no encontrado" });
    }

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener feedback", error });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear feedback", error });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Feedback no encontrado" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar feedback", error });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback no encontrado" });
    }

    feedback.deletedAt = new Date();
    await feedback.save();

    res.json({ message: "Feedback eliminado correctamente (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar feedback", error });
  }
};
