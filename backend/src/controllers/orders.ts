import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import product from "../models/product";
import BadRequestError from "../errors/bad-request-error";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new BadRequestError("items должен быть непустым массивом");
    }

    const products = await product.find({ _id: { $in: items } });
    if (products.length !== items.length) {
      throw new BadRequestError("Один или несколько товаров не найдены");
    }

    for (const productItem of products) {
      if (productItem.price === null || productItem.price === undefined) {
        throw new BadRequestError("Товар не продается, отсутствует цена");
      }
    }

    if (total === undefined || typeof total !== "number") {
      throw new BadRequestError("total обязателен и должен быть числом");
    }

    let calculatedTotal = 0;
    for (const product of products) {
      calculatedTotal += product.price!;
    }
    if (total !== calculatedTotal) {
      throw new BadRequestError("total не совпадает с суммой товаров");
    }

    if (!payment || (payment !== "card" && payment !== "online")) {
      throw new BadRequestError("payment должен быть card или online");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new BadRequestError("Неверный формат email");
    }

    if (!phone || typeof phone !== "string") {
      throw new BadRequestError("phone обязателен");
    }

    if (!address || typeof address !== "string") {
      throw new BadRequestError("address обязателен");
    }

    const orderId = faker.string.uuid();

    res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (err) {
    next(err);
  }
};
