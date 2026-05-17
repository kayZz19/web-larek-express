import Joi from "joi";

export type Product = {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description?: string;
  price?: number | null;
};

export const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required().messages({
    "string.min": "Название должно содержать минимум 2 символа",
    "string.max": "Название должно содержать максимум 30 символов",
    "any.required": 'Поле "title" обязательно',
  }),

  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  })
    .required()
    .messages({
      "any.required": 'Поле "image" обязательно',
    }),

  category: Joi.string().required().messages({
    "any.required": 'Поле "category" обязательно',
  }),

  description: Joi.string().optional(),

  price: Joi.number().min(0).allow(null).optional().messages({
    "number.min": "Цена не может быть отрицательной",
  }),
});

export const productCreateSchema = productSchema;

export type Order = {
  payment: "card" | "online";
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
};

export const orderSchema = Joi.object({
  payment: Joi.string().valid("card", "online").required().messages({
    "any.only": "payment должен быть card или online",
    "any.required": 'Поле "payment" обязательно',
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Неверный формат email",
    "any.required": 'Поле "email" обязательно',
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,12}$/)
    .required()
    .messages({
      "string.pattern.base": "Неверный формат телефона",
      "any.required": 'Поле "phone" обязательно',
    }),

  address: Joi.string().required().messages({
    "any.required": 'Поле "address" обязательно',
  }),

  total: Joi.number().required().messages({
    "any.required": 'Поле "total" обязательно',
  }),

  items: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "items должен содержать хотя бы один товар",
    "any.required": 'Поле "items" обязательно',
  }),
});

export const orderCreateSchema = orderSchema;
