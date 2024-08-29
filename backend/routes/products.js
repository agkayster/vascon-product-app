import express from 'express';
import { createProduct } from '../controllers/products.js';

const router = express.Router();

// route all the product endpoints
router.route('/products').post(createProduct);

// router
// 	.route('/products/:productID')
// 	.get(getSingleProduct)
// 	.put(updateSingleProduct)
// 	.delete(deleteSingleProduct);

export default router;
