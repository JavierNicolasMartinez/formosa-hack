import express from "express";
import {
  getAllStudentResults,
  getStudentResultById,
  createStudentResult,
  updateStudentResult,
  deleteStudentResult,
} from "../controllers/studentResult.controller.js";

const router = express.Router();

router.get("/", getAllStudentResults);
router.get("/:id", getStudentResultById);
router.post("/", createStudentResult);
router.put("/:id", updateStudentResult);
router.delete("/:id", deleteStudentResult);

export default router;
