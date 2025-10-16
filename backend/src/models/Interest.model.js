import { Schema, model } from "mongoose";

const InterestSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

const InterestModel = model("Interest", InterestSchema);

export default InterestModel;
