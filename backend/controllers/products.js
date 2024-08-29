import Product from '../models/Product.js';

// GET endpoint
const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log('get products error =>', error);
		res.status(500).json({ msg: error });
	}
};

//POST endpoint
const createProduct = async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		res.status(200).json({ newProduct });
	} catch (error) {
		console.log('get create product error =>', error);
		res.status(500).json({ msg: error });
	}
};

//GET single product endpoint
const getSingleProduct = async (req, res) => {
	const { productID } = req.params;
	try {
		const singleProduct = await Product.findById({ _id: productID });

		if (!singleProduct) {
			res.status(404).json({ msg: `no product with id of ${productID}` });
		}

		res.status(200).json({ singleProduct });
	} catch (error) {
		console.log('get single product error=>', error);
		res.status(500).json({ msg: error });
	}
};

// PUT update single product endpoint
const updateSingleProduct = async (req, res) => {
	const { productID } = req.params;
	try {
		const singleProduct = await Product.findByIdAndUpdate(
			{ _id: productID },
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);

		if (!singleProduct) {
			res.status(404).json({ msg: `no product with id of ${productID}` });
		}

		res.status(200).json({ singleProduct });
	} catch (error) {
		console.log('get single product error=>', error);
		res.status(500).json({ msg: error });
	}
};

// DELETE delete single product endpoint
const deleteSingleProduct = async (req, res) => {
	const { productID } = req.params;
	try {
		const singleProduct = await Product.findByIdAndDelete({
			_id: productID,
		});

		if (!singleProduct) {
			res.status(404).json({ msg: `no product with id of ${productID}` });
		}

		res.status(200).json({
			msg: `product with id ${productID} has been deleted`,
		});
	} catch (error) {
		console.log('get single product error=>', error);
		res.status(500).json({ msg: error });
	}
};

export {
	createProduct,
	getProducts,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
};
