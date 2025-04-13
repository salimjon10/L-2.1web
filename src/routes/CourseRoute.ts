import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/CourseController";
import { uploadImage, saveImage } from "../middlewares/uploadMiddleware";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const courseRoute = express.Router();

courseRoute.post("/", authenticateToken, uploadImage, saveImage, createCourse);
courseRoute.get("/", getCourses);

courseRoute.get("/:id", getCourseById);
courseRoute.put("/:id", authenticateToken, uploadImage, saveImage, updateCourse);
courseRoute.delete("/:id", authenticateToken, deleteCourse);

export default courseRoute;
