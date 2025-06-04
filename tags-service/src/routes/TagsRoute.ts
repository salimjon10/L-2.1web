import express from "express";
import { getTags, createTag, deleteTag } from "../controllers/TagController";
import { authenticateToken } from "../middlewares/authenticateMiddleware";
import roleCheck from "../middlewares/roleCheck";

const tagsRoute = express.Router();

tagsRoute.post("/", roleCheck("teacher"), authenticateToken, createTag);
tagsRoute.delete("/:id", roleCheck("teacher"), authenticateToken, deleteTag);
tagsRoute.get("/", getTags);

export default tagsRoute;