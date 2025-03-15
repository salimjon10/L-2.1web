import express from "express";
import {
  getUsers,
  deleteUser,
  getUserInfo,
  registerStudent,
  registerTeacher,
  login,
} from "../controllers/UserController";
import { authenticateToken } from "../services/authenticateMiddleware";

const router = express.Router();

router.get("/", getUsers);
router.delete("/", authenticateToken, deleteUser);
router.get("/info", authenticateToken, getUserInfo);
router.post("/login", login);
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);

export default router;
