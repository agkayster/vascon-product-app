import express from 'express';
import {
	createProduct,
	getProducts,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
} from '../controllers/products.js';

const router = express.Router();

router.route('/products').get(getProducts).post(createProduct);

router
	.route('/products/:productID')
	.get(getSingleProduct)
	.put(updateSingleProduct)
	.delete(deleteSingleProduct);

export default router;
