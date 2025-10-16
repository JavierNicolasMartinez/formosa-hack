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
    first_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 100,
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
    // Referencias opcionales para perfiles específicos
    studentProfile: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    tutorProfile: {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
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
