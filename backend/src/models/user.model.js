import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });

  next();
});

const UserModel = model("User", UserSchema);

export default UserModel;
