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

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/register/student", registerStudent);
userRoute.post("/register/teacher", registerTeacher);

userRoute.get("/", authenticateToken, getUsers);
userRoute.delete("/", authenticateToken, deleteUser);
userRoute.get("/info", authenticateToken, getUserInfo);

export default userRoute;
