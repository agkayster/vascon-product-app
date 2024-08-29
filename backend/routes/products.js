import express from 'express';
import { createProduct, getProducts } from '../controllers/products.js';

const router = express.Router();

router.route('/products').get(getProducts).post(createProduct);

// router
// 	.route('/users/:userID')
// 	.put(updateSinglePerson)
// 	.delete(deleteSinglePerson);

export default router;
