import express from "express";
import {
  createLesson,
  getLessons,
  deleteLesson,
  updateLesson,
} from "../controllers/LessonController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const lessonRoute = express.Router();

lessonRoute.post("/", authenticateToken, createLesson);
lessonRoute.get("/", getLessons);
lessonRoute.delete("/:id", authenticateToken, deleteLesson);
lessonRoute.put("/:id", authenticateToken, updateLesson);

export default lessonRoute;