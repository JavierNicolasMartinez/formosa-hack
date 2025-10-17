import Admin from "../models/Admin.model.js";

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate("user");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener administradores", error });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).populate("user");
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener administrador", error });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const saved = await newAdmin.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear administrador", error });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Administrador no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar administrador", error });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Administrador no encontrado" });
    res.json({ message: "Administrador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar administrador", error });
  }
};
