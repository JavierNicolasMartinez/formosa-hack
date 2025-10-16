import { Schema, model } from "mongoose";

const FormSchema = new Schema(
  {
    title: { type: String, default: "" },
    content: { type: Schema.Types.ObjectId, ref: "Content", required: true },
    // ajustes del formulario
    questionCount: { type: Number, default: 0 },
    difficulty: {
      type: String,
      enum: ["basic", "intermediate", "advanced"],
      default: "basic",
    },
    generatedByAI: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

FormSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const FormModel = model("Form", FormSchema);

export default FormModel;
