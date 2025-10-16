import { Schema, model } from "mongoose";

const ContentViewSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    content: { type: Schema.Types.ObjectId, ref: "Content", required: true },
    viewedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 }, // 0-100
  },
  { timestamps: true }
);

const ContentViewModel = model("ContentView", ContentViewSchema);

export default ContentViewModel;
