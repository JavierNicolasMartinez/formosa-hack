import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    contentRef: { type: Schema.Types.ObjectId, ref: "Content", default: null }, // opcional
    sentAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

MessageSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const MessageModel = model("Message", MessageSchema);

export default MessageModel;
