import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request-error";
import NotFoundError from "../errors/not-found-error";
import ConflictError from "../errors/conflict-error";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Ошибка валидации данных",
    });
  }

  if (err.code === 11000 || err.message?.includes("duplicate")) {
    return res.status(409).json({
      message: "Товар с таким названием уже существует",
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Произошла ошибка на сервере",
  });
};
