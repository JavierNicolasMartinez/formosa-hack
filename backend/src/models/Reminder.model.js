import { Schema, model } from "mongoose";

const ReminderSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    content: { type: Schema.Types.ObjectId, ref: "Content", default: null },
    days: { type: [String], default: [] }, // Ej: ["Mon","Tue"]
    time: { type: String, default: "" }, // "18:00"
    message: { type: String, default: "Time to study" },
    active: { type: Boolean, default: true },
    timezone: { type: String, default: "America/Argentina/Cordoba" },
  },
  { timestamps: true }
);

const ReminderModel = model("Reminder", ReminderSchema);

export default ReminderModel;
