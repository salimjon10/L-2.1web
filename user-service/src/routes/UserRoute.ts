import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  getUserInfo,
  registerStudent,
  registerTeacher,
  login,
  updateUser
} from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/register/student", registerStudent);
userRoute.post("/register/teacher", registerTeacher);

userRoute.get("/", authenticateToken, getUsers);
userRoute.get("/:id", getUserById);
userRoute.delete("/", authenticateToken, deleteUser);
userRoute.get("/info", authenticateToken, getUserInfo);
userRoute.put("", authenticateToken, updateUser)

export default userRoute;
