import { Schema, model } from "mongoose";

const QuestionSchema = new Schema(
  {
    form: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    statement: { type: String, required: true },
    type: {
      type: String,
      enum: ["multiple_choice", "short_answer", "true_false"],
      required: true,
    },
    options: [
      {
        text: String,
        correct: { type: Boolean, default: false },
      },
    ],
    score: { type: Number, default: 1 },
    reference: { type: String, default: "" }, // sección del contenido / nota
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

QuestionSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const QuestionModel = model("Question", QuestionSchema);

export default QuestionModel;
