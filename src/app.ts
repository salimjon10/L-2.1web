import express from "express";
import userRouter from "./routes/UserRoute";
import courseRoute from "./routes/CourseRoute";
import tagsRoute from "./routes/TagsRoute";
import lessonRoute from "./routes/LessonRoute";
import commentRoute from "./routes/CommentRoute";
import { errorHandler } from "./middlewares/errorMiddleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/courses", courseRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/lessons", lessonRoute);
app.use("/api/comments", commentRoute);
app.use(errorHandler);

export default app;
