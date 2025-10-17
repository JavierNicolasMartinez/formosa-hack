import express from "express";
import {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest
} from "../controllers/test.controller.js";

const router = express.Router();

router.get("/", getAllTests);        // GET /api/tests
router.get("/:id", getTestById);     // GET /api/tests/:id
router.post("/", createTest);       // POST /api/tests
router.put("/:id", updateTest);     // PUT /api/tests/:id
router.delete("/:id", deleteTest);  // DELETE /api/tests/:id

export default router;
