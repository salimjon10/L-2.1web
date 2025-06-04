import express from "express";
import {
  createLesson,
  getLessons,
  getLessonById,
  deleteLesson,
  updateLesson,
} from "../controllers/LessonController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const lessonRoute = express.Router();

lessonRoute.post("/", authenticateToken, createLesson);
lessonRoute.get("/", getLessons);
lessonRoute.get("/:id", getLessonById);
lessonRoute.delete("/:id", authenticateToken, deleteLesson);
lessonRoute.put("/:id", authenticateToken, updateLesson);

export default lessonRoute;