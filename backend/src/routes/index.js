import express from "express";
import ReportRouter from "./Report.router.js";
import StudentRouter from "./student.router.js";
import StudentResultRouter from "./studentResult.router.js";
import StudyMethodRouter from "./studyMethod.router.js";
import TutorRouter from "./tutor.router.js";
import TutorRatingRouter from "./tutorRating.router.js";
import AdminRouter from "./admin.router.js";
import ContentRouter from "./content.router.js";
import ContentViewRouter from "./contentView.router.js";
import FeedbackRouter from "./feedback.router.js";
import formRouter from "./form.router.js";
import MessageRouter from "./message.router.js";
import QuestionRouter from "./question.router.js";
import RecommendationRouter from "./recommendation.router.js";
import ReminderRouter from "./reminder.router.js";

const router = express.Router();

router.use("/reports", ReportRouter);
router.use("/students", StudentRouter);
router.use("/student-results", StudentResultRouter);
router.use("/study-methods", StudyMethodRouter);
router.use("/tutors", TutorRouter);
router.use("/tutor-ratings", TutorRatingRouter);
router.use("/admins", AdminRouter);
router.use("/contents", ContentRouter);
router.use("/content-views", ContentViewRouter);
router.use("/feedbacks", FeedbackRouter);
router.use("/form", formRouter);
router.use("/messages", MessageRouter);
router.use("/questions", QuestionRouter);
router.use("/recommendations", RecommendationRouter);
router.use("/reminders", ReminderRouter);



export default router;
