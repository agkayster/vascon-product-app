import express from 'express';
import {
	createProduct,
	getProducts,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
} from '../controllers/products.js';
import { authenticationMiddleware } from '../middleware/auth.js';

const router = express.Router();

router
	.route('/products')
	.get(authenticationMiddleware, getProducts)
	.post(authenticationMiddleware, createProduct);

router
	.route('/products/:productID')
	.get(authenticationMiddleware, getSingleProduct)
	.put(authenticationMiddleware, updateSingleProduct)
	.delete(authenticationMiddleware, deleteSingleProduct);

export default router;
