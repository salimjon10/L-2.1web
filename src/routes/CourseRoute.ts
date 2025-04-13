import express from "express";
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from "../controllers/CourseController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const courseRoute = express.Router();

courseRoute.post("/", authenticateToken, createCourse)
courseRoute.get("/", getCourses)

courseRoute.get("/:id", getCourseById)
courseRoute.put("/:id", authenticateToken, updateCourse)
courseRoute.delete("/:id", authenticateToken, deleteCourse)

export default courseRoute;