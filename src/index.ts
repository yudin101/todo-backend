import express from "express";
import routes from "./routes/index";
import { loggingMiddleware } from "./utils/middlewares";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggingMiddleware);
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening on: localhost:${PORT}`);
});
