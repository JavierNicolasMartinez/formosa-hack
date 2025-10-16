import { Schema, model } from "mongoose";

const TutorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    description: { type: String, default: "" },
    areasExpertise: { type: [String], default: [] },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

TutorSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const TutorModel = model("Tutor", TutorSchema);

export default TutorModel;
