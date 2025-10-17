import ContentView from "../models/ContentView.model.js";

export const getAllContentViews = async (req, res) => {
  try {
    const contentViews = await ContentView.find()
      .populate("student")
      .populate("content");

    res.json(contentViews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener visualizaciones", error });
  }
};

export const getContentViewById = async (req, res) => {
  try {
    const contentView = await ContentView.findById(req.params.id)
      .populate("student")
      .populate("content");

    if (!contentView)
      return res.status(404).json({ message: "Visualización no encontrada" });

    res.json(contentView);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener visualización", error });
  }
};

export const createContentView = async (req, res) => {
  try {
    const newContentView = new ContentView(req.body);
    const saved = await newContentView.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear visualización", error });
  }
};

export const updateContentView = async (req, res) => {
  try {
    const updated = await ContentView.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Visualización no encontrada" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar visualización", error });
  }
};

export const deleteContentView = async (req, res) => {
  try {
    const deleted = await ContentView.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Visualización no encontrada" });

    res.json({ message: "Visualización eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar visualización", error });
  }
};
