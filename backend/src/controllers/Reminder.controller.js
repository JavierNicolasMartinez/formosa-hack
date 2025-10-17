import Reminder from "../models/Reminder.model.js";

export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find()
      .populate("student")
      .populate("content");
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener recordatorios", error });
  }
};

export const getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id)
      .populate("student")
      .populate("content");

    if (!reminder) return res.status(404).json({ message: "Recordatorio no encontrado" });

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener recordatorio", error });
  }
};

export const createReminder = async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    const saved = await newReminder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear recordatorio", error });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Recordatorio no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar recordatorio", error });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const deleted = await Reminder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recordatorio no encontrado" });
    res.json({ message: "Recordatorio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar recordatorio", error });
  }
};
