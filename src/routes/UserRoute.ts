import express from "express";
import {
  getUsers,
  deleteUser,
  getUserInfo,
  registerStudent,
  registerTeacher,
  login,
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getUsers);
router.delete("/", deleteUser);
router.get("/info", getUserInfo);
router.post("/login", login);
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);

export default router;
