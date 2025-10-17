import express from "express";
import {
  getAllContentViews,
  getContentViewById,
  createContentView,
  updateContentView,
  deleteContentView,
} from "../controllers/contentView.controller.js";

const router = express.Router();

router.get("/", getAllContentViews);
router.get("/:id", getContentViewById);
router.post("/", createContentView);
router.put("/:id", updateContentView);
router.delete("/:id", deleteContentView);

export default router;
