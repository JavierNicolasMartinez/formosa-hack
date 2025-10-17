import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/form.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const formRouter = Router();

formRouter.post("/", authenticate, authorizeRoles("admin", "tutor"), createForm);
formRouter.get("/", authenticate, getForms);
formRouter.get("/:id", authenticate, getFormById);
formRouter.put("/:id", authenticate, authorizeRoles("admin", "tutor"), updateForm);
formRouter.delete("/:id", authenticate, authorizeRoles("admin", "tutor"), deleteForm);

export default formRouter;
