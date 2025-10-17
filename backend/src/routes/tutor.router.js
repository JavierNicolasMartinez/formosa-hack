import express from "express";
import {
  getAllTutors,
  getTutorById,
  createTutor,
  updateTutor,
  softDeleteTutor,
} from "../controllers/tutor.controller.js";

const router = express.Router();

router.get("/", getAllTutors);
router.get("/:id", getTutorById);
router.post("/", createTutor);
router.put("/:id", updateTutor);
router.delete("/:id", softDeleteTutor);

export default router;
