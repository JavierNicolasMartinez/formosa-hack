import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import { createProfile, getProfile } from "../controllers/auth.controller.js";
import { updateUserValidation } from "../middleware/validations/user.validation.js";
import { createProfileValidation } from "../middleware/validations/profile.validation.js"; // 👈 si existe este archivo
import { validator, mongoIdValidator } from "../middleware/validations/validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorizeRoles(["admin"]), getAllUsers);
userRouter.get("/:id", authenticate, authorizeRoles(["admin"]), mongoIdValidator, validator, getUserById);
userRouter.put("/:id", authenticate, authorizeRoles(["admin"]), updateUserValidation, validator, updateUser);
userRouter.delete("/:id", authenticate, authorizeRoles(["admin"]), mongoIdValidator, validator, deleteUser);

userRouter.post(
  "/complete-profile",
  authenticate,
  createProfileValidation,
  validator,
  createProfile
);

userRouter.get("/me", authenticate, getProfile);

export default userRouter;
