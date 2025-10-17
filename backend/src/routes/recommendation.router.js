import { Router } from "express";
import {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} from "../controllers/recommendation.controller.js";

const router = Router();

router.get("/", getAllRecommendations);
router.get("/:id", getRecommendationById);
router.post("/", createRecommendation);
router.put("/:id", updateRecommendation);
router.delete("/:id", deleteRecommendation);

export default router;
