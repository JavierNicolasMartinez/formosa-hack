import { Schema, model } from "mongoose";

const StudyMethodSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g. Visual, Auditory...
    description: { type: String, default: "" },
    // Opcional: reglas/pesos para filtrar contenido
    weights: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const StudyMethodModel = model("StudyMethod", StudyMethodSchema);

export default StudyMethodModel;
