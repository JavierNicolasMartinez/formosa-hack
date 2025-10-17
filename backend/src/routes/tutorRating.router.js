import express from "express";
import {
  getAllTutorRatings,
  getTutorRatingById,
  createTutorRating,
  updateTutorRating,
  deleteTutorRating,
} from "../controllers/tutorRating.controller.js";

const router = express.Router();

router.get("/", getAllTutorRatings);
router.get("/:id", getTutorRatingById);
router.post("/", createTutorRating);
router.put("/:id", updateTutorRating);
router.delete("/:id", deleteTutorRating);

export default router;
