import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  bio: { type: String, required: true, maxLength: 256 },
  methodology: { type: String, default: null },
  interests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Interest",
    },
  ],
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

const ProfileModel = model("Profile", ProfileSchema);

export default ProfileModel;
