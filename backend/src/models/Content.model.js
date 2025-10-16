import { Schema, model } from "mongoose";

const ContentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    type: {
      type: String,
      enum: ["PDF", "Audio", "Video"],
      required: true,
    },
    level: {
      type: String,
      enum: ["short", "medium", "long"],
      default: "short",
    },
    category: { type: String, default: "" }, // una sola categoría principal
    tags: { type: [String], default: [] },
    fileUrl: { type: String, default: "" }, // ubicación del archivo en storage
    uploadedAt: { type: Date, default: Date.now },
    tutor: { type: Schema.Types.ObjectId, ref: "Tutor", required: true },
    isActive: { type: Boolean, default: true },
    // metadata para IA / revisión
    generatedTestsCount: { type: Number, default: 0 },
    flaggedCount: { type: Number, default: 0 }, // para denuncias
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ContentSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const ContentModel = model("Content", ContentSchema);

export default ContentModel;
