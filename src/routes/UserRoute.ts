import express from "express";
import {
  getUsers,
  deleteUser,
  getUserInfo,
  registerStudent,
  registerTeacher,
  login,
} from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);

router.get("/", authenticateToken, getUsers);
router.delete("/", authenticateToken, deleteUser);
router.get("/info", authenticateToken, getUserInfo);

export default router;
