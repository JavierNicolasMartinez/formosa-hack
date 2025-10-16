import { Schema, model } from "mongoose";

const StudentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    studyMethod: {
      type: Schema.Types.ObjectId,
      ref: "StudyMethod",
      default: null,
    },
    interests: {
      type: [String],
      default: [],
    },
    // Opciones de disponibilidad (puede ajustarse a formato más estructurado)
    daysAvailable: {
      type: [String], // Ej: ["Mon","Wed","Fri"]
      default: [],
    },
    schedulesAvailable: {
      type: [String], // Ej: ["18:00-19:00","20:00-21:00"]
      default: [],
    },
    // Estadísticas y progreso resumido (se pueden calcular/actualizar con jobs)
    stats: {
      daysActive: { type: Number, default: 0 },
      contentsCompleted: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 },
    },
    metadata: {
      onboardingCompleted: { type: Boolean, default: false },
      lastActiveAt: { type: Date, default: null },
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Ignore soft-deleted students on find
StudentSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const StudentModel = model("Student", StudentSchema);

export default StudentModel;
