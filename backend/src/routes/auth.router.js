import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
  verify,
  createProfile,
} from "../controllers/auth.controller.js";
import { createUserValidation } from "../middleware/validations/user.validation.js";
import { validator } from "../middleware/validations/validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { loginValidation } from "../middleware/validations/auth.validation.js";
import { createProfileValidation } from "../middleware/validations/profile.validation.js";
const authRouter = Router();

authRouter.post("/register", createUserValidation, validator, register);
authRouter.post("/login", loginValidation, validator, login);
authRouter.get("/profile", authenticate, getProfile);
authRouter.put("/profile", authenticate, updateProfile);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/verify", authenticate, verify);
authRouter.post("/profile", authenticate, createProfileValidation, validator, createProfile);
authRouter.post(
  "/complete-profile",
  authenticate,                
  createProfileValidation,     
  validator,                   
  createProfile                 
);

export default authRouter;
