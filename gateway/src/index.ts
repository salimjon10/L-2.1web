import express from "express";
import statusRoute from "./routes/statusRoute";
import userRoute from './routes/userRoute';
import config from "./utils/config";

const app = express();
const port = config.port;

app.use(express.json());

app.use(`/api`, statusRoute);
app.use(`/api`, userRoute);

app.listen(port, () => {
  console.log(`[x] API Gateway прослушивает порт: ${port}`);
});
