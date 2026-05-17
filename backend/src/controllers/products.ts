import { Request, Response, NextFunction } from "express";
import product from "../models/product";
import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return product
    .find({})
    .then((products) =>
      res.status(200).json({ items: products, total: products.length }),
    )
    .catch((err) => next(err));
};

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, image, category, description, price } = req.body;

  return product
    .create({ title, image, category, description, price })
    .then((newProduct) => res.status(201).send({ data: newProduct }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Ошибка валидации данных при создании товара"),
        );
      }
      if (err.code === 11000) {
        return next(
          new ConflictError("Товар с таким названием уже существует"),
        );
      }
      return next(err);
    });
};
