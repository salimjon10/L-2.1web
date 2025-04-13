import express, { Request, Response } from "express";
import userRouter from "./routes/UserRoute";
import courseRoute from "./routes/CourseRoute";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/users", userRouter);
app.use("/courses", courseRoute)
app.use(errorHandler);

export default app;
