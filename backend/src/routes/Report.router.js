import express from "express";
import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/Report.controller.js";

const router = express.Router();

// Rutas CRUD
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
