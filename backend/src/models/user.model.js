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
    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Soft delete: siempre ignorar usuarios eliminados
UserSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const UserModel = model("User", UserSchema);

export default UserModel;
