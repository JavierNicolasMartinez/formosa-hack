import { Schema, model } from "mongoose";

const StudentResultSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    form: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    answers: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        answer: Schema.Types.Mixed,
        correct: { type: Boolean, default: false },
        score: { type: Number, default: 0 },
      },
    ],
    totalScore: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const StudentResultModel = model("StudentResult", StudentResultSchema);

export default StudentResultModel;
