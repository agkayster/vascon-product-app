import Product from '../models/Product.js';

// GET endpoint
const getProducts = async (req, res) => {
	const products = await Product.find();
	res.status(200).json({ success: true, data: products });
};

//POST endpoint
const createProduct = async (req, res) => {
	const newProduct = await Product.create(req.body);
	res.status(200).json({ newProduct });
};

export { createProduct, getProducts };
