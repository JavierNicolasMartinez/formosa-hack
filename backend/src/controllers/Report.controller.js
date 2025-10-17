import Report from "../models/Report.model.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("student", "first_name last_name email")
      .populate("content")
      .populate("reviewedBy", "username");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reportes", error });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("student", "first_name last_name email")
      .populate("content")
      .populate("reviewedBy", "username");
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el reporte", error });
  }
};

export const createReport = async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const saved = await newReport.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear reporte", error });
  }
};

export const updateReport = async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("student", "first_name last_name email")
      .populate("content")
      .populate("reviewedBy", "username");

    if (!updated) return res.status(404).json({ message: "Reporte no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar reporte", error });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Reporte no encontrado" });
    res.json({ message: "Reporte eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reporte", error });
  }
};
