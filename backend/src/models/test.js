import { Schema, model } from "mongoose";

const TestSchema = new Schema(
  {
    section: { type: String, required: true }, // Ej: "Sección 1: Estilo de Aprendizaje"
    question: { type: String, required: true }, // Enunciado de la pregunta
    options: [
      {
        text: { type: String, required: true }, // a), b), c)
        score: { type: Number, required: true }, // Puntaje asociado a la opción
        type: { type: String, default: "" }, // Ej: "visual", "auditivo", "lectura" para metodología
      },
    ],
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Soft delete
TestSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const TestModel = model("Test", TestSchema);

export default TestModel;
