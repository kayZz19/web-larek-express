import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/product";
import path from "path";
import NotFoundError from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { errorLogger, requestLogger } from "./middlewares/logger";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/", productRoutes);
app.use(express.static(path.join(__dirname, "../public")));

app.use("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});
app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/weblarek")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    );
  })
  .catch(() => console.log("MongoDB error"));
