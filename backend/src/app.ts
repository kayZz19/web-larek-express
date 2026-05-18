import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import productRoutes from "./routes/product";
import NotFoundError from "./errors/not-found-error";

import { errorHandler } from "./middlewares/error-handler";
import { requestLogger, errorLogger } from "./middlewares/logger";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", productRoutes);

app.use("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});

app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/weblarek")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB error", err);
  });
