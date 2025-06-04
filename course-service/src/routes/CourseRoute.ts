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
import roleCheck from "../middlewares/roleCheck";

const courseRoute = express.Router();

courseRoute.post("/", authenticateToken, roleCheck("teacher"), uploadImage, saveImage, createCourse);
courseRoute.get("/", getCourses);

courseRoute.get("/:id", getCourseById);
courseRoute.put("/:id", authenticateToken, roleCheck("teacher"), uploadImage, saveImage, updateCourse);
courseRoute.delete("/:id", authenticateToken, roleCheck("teacher"), deleteCourse);

export default courseRoute;