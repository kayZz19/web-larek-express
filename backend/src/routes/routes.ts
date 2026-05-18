import { Router } from 'express';
import { validateOrderBody, validateProductBody } from '../middlewares/validations';
import createOrder from '../controllers/order';
import { createProduct, getProducts } from '../controllers/product';

const router = Router();

router.get('/product', getProducts);

router.post('/product', validateProductBody, createProduct);

router.post('/order', validateOrderBody, createOrder);

export default router;
