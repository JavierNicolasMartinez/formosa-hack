import { Router } from "express";
import {
  getAllReminders,
  getReminderById,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../controllers/Reminder.controller.js";

const router = Router();

router.get("/", getAllReminders);
router.get("/:id", getReminderById);
router.post("/", createReminder);
router.put("/:id", updateReminder);
router.delete("/:id", deleteReminder);

export default router;
