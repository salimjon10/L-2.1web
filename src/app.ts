import express, { Request, Response } from "express";
import userRouter from "./routes/UserRoute";
import courseRoute from "./routes/CourseRoute";
import { errorHandler } from "./middlewares/errorMiddleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/api/users", userRouter);
app.use("/api/courses", courseRoute);
app.use(errorHandler);

export default app;
