import express from "express";
import statusRoute from "./routes/statusRoute";
import userRoute from './routes/userRoute';
import coursesRoute from "./routes/courseRoutes";
import tagsRoute from "./routes/tagsRoutes";
import lessonsRoute from "./routes/lessonRoutes";
import commentsRoute from "./routes/commentsRoutes";
import enrollmentRoute from "./routes/enrollmentRoutes";
import config from "./utils/config";

const app = express();
const port = config.port;

app.use(express.json());

app.use(`/api`, statusRoute);
app.use(`/api`, userRoute);
app.use(`/api`, coursesRoute);
app.use(`/api`, tagsRoute);
app.use(`/api`, lessonsRoute);
app.use(`/api`, commentsRoute);
app.use(`/api`, enrollmentRoute);

app.listen(port, () => {
  console.log(`[x] API Gateway прослушивает порт: ${port}`);
});
