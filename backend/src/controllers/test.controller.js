import TestModel from "../models/test.model.js";

export const getAllTests = async (req, res) => {
  try {
    const tests = await TestModel.find();
    res.status(200).json({ ok: true, data: tests });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const test = await TestModel.findById(req.params.id);
    if (!test) return res.status(404).json({ ok: false, message: "Test no encontrado" });
    res.status(200).json({ ok: true, data: test });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createTest = async (req, res) => {
  try {
    const test = await TestModel.create(req.body);
    res.status(201).json({ ok: true, message: "Test creado correctamente", data: test });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const updated = await TestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: "Test no encontrado" });
    res.status(200).json({ ok: true, message: "Test actualizado correctamente", data: updated });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const deleted = await TestModel.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ ok: false, message: "Test no encontrado" });
    res.status(200).json({ ok: true, message: "Test eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
