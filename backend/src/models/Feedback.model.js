import { Schema, model } from "mongoose";

const FeedbackSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    content: { type: Schema.Types.ObjectId, ref: "Content", required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

FeedbackSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const FeedbackModel = model("Feedback", FeedbackSchema);

export default FeedbackModel;
