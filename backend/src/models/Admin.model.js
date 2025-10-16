import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    roleDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

const AdminModel = model("Admin", AdminSchema);

export default AdminModel;
