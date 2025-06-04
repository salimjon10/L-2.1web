import express from "express";
import { createEnrollment, completeLesson, uncompleteLesson, enrollmentProgress, enrollmentUsers } from "../controllers/EnrollmentController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const enrollmentRoute = express.Router();

enrollmentRoute.post("/", authenticateToken, createEnrollment);
enrollmentRoute.post("/complete/:enrollementId/:lessonId", authenticateToken, completeLesson);
enrollmentRoute.post("/uncomplete/:enrollementId/:lessonId", authenticateToken, uncompleteLesson);
enrollmentRoute.get("/:enrollementId", enrollmentProgress);
enrollmentRoute.get("/users/:courseId", enrollmentUsers)

export default enrollmentRoute;