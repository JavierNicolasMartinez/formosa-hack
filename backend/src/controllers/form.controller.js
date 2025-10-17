import FormModel from "../models/Form.model.js";

export const createForm = async (req, res) => {
  try {
    const form = await FormModel.create(req.body);
    res.status(201).json({ ok: true, data: form });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await FormModel.find().populate("content");
    res.status(200).json({ ok: true, data: forms });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getFormById = async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id).populate("content");
    if (!form) return res.status(404).json({ ok: false, message: "Formulario no encontrado" });
    res.status(200).json({ ok: true, data: form });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const updateForm = async (req, res) => {
  try {
    const form = await FormModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!form) return res.status(404).json({ ok: false, message: "Formulario no encontrado" });
    res.status(200).json({ ok: true, data: form });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const form = await FormModel.findByIdAndUpdate(req.params.id, { deletedAt: new Date() }, { new: true });
    if (!form) return res.status(404).json({ ok: false, message: "Formulario no encontrado" });
    res.status(200).json({ ok: true, message: "Formulario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
