import { Schema, model } from "mongoose";

const RecommendationSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    content: { type: Schema.Types.ObjectId, ref: "Content", required: true },
    assignedAt: { type: Date, default: Date.now },
    reason: { type: String, default: "" }, // ej: "matches study method"
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const RecommendationModel = model("Recommendation", RecommendationSchema);

export default RecommendationModel;
