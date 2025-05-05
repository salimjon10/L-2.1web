import express from "express";
import {
  createComment,
  getComments,
  updateComments,
  deleteComment,
} from "../controllers/CommentsController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";

const commentRoute = express.Router();

commentRoute.get("/", getComments);
commentRoute.post("/", authenticateToken, createComment);
commentRoute.delete("/:id", authenticateToken, deleteComment);
commentRoute.put("/:id", authenticateToken, updateComments);

export default commentRoute;
