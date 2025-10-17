import Message from "../models/Message.model.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender")
      .populate("recipient")
      .populate("contentRef");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener mensajes", error });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("sender")
      .populate("recipient")
      .populate("contentRef");

    if (!message) return res.status(404).json({ message: "Mensaje no encontrado" });

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener mensaje", error });
  }
};

export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear mensaje", error });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Mensaje no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar mensaje", error });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Mensaje no encontrado" });

    message.deletedAt = new Date();
    await message.save();

    res.json({ message: "Mensaje eliminado correctamente (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar mensaje", error });
  }
};
