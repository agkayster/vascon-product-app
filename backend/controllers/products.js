import Product from '../models/Product.js';

const createProduct = async (req, res) => {
	res.json(req.user);
};

export { createProduct };
