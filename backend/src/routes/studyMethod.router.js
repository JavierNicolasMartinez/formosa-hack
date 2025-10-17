import express from "express";
import {
  getAllStudyMethods,
  getStudyMethodById,
  createStudyMethod,
  updateStudyMethod,
  deleteStudyMethod,
} from "../controllers/StudyMethod.controller.js";

const router = express.Router();

router.get("/", getAllStudyMethods);
router.get("/:id", getStudyMethodById);
router.post("/", createStudyMethod);
router.put("/:id", updateStudyMethod);
router.delete("/:id", deleteStudyMethod);

export default router;
