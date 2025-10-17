import express from "express";
import {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";

const router = express.Router();

router.get("/", getAllContents);
router.get("/:id", getContentById);
router.post("/", createContent);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

export default router;
