import Student from "../models/Student.model.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user")
      .populate("studyMethod");
    res.status(200).json({ ok: true, data: students });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al obtener estudiantes", error });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user")
      .populate("studyMethod");
    if (!student) return res.status(404).json({ ok: false, message: "Estudiante no encontrado" });
    res.status(200).json({ ok: true, data: student });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al obtener estudiante", error });
  }
};

export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const saved = await newStudent.save();
    res.status(201).json({ ok: true, data: saved });
  } catch (error) {
    res.status(400).json({ ok: false, message: "Error al crear estudiante", error });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: "Estudiante no encontrado" });
    res.status(200).json({ ok: true, data: updated });
  } catch (error) {
    res.status(400).json({ ok: false, message: "Error al actualizar estudiante", error });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ ok: false, message: "Estudiante no encontrado" });

    student.deletedAt = new Date();
    await student.save();

    res.status(200).json({ ok: true, message: "Estudiante eliminado correctamente (soft delete)" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al eliminar estudiante", error });
  }
};
