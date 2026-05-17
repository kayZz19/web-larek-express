import { Router } from "express";
import { createOrder } from "../controllers/orders";
import { getProducts, createProduct } from "../controllers/products";
import Joi from "joi";

const productCreateSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().min(0).allow(null).optional(),
});

const orderCreateSchema = Joi.object({
  payment: Joi.string().valid("card", "online").required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,12}$/)
    .required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string()).min(1).required(),
});

const validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

const router = Router();

router.get("/product", getProducts);
router.post("/product", validate(productCreateSchema), createProduct);
router.post("/order", validate(orderCreateSchema), createOrder);

export default router;
