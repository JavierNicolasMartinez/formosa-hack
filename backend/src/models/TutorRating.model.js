import { Schema, model } from "mongoose";

const TutorRatingSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    tutor: { type: Schema.Types.ObjectId, ref: "Tutor", required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TutorRatingModel = model("TutorRating", TutorRatingSchema);

export default TutorRatingModel;
