import Content from "../models/Content.model.js";

export const getAllContents = async (req, res) => {
  try {
    const contents = await Content.find().populate("tutor");
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener contenidos", error });
  }
};

export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate("tutor");
    if (!content) return res.status(404).json({ message: "Contenido no encontrado" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener contenido", error });
  }
};

export const createContent = async (req, res) => {
  try {
    const newContent = new Content(req.body);
    const saved = await newContent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear contenido", error });
  }
};

export const updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Contenido no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar contenido", error });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Contenido no encontrado" });

    content.deletedAt = new Date();
    await content.save();

    res.json({ message: "Contenido eliminado correctamente (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar contenido", error });
  }
};
