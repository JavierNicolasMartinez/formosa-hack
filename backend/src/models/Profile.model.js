import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100,required: false  },
  last_name: { type: String, required: true, maxLength: 100,required: false  },
  bio: { type: String, required: true, maxLength: 256,required: false  },
  methodology: { type: String, default: null },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

const ProfileModel = model("Profile", ProfileSchema);

export default ProfileModel;
