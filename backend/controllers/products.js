import Product from '../models/Product.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// POST create a product
const createProduct = async (req, res) => {
	// assign user id from authMiddleWare to req.body.createdBy variable in the object
	req.body.sellerID = req.user.userId;

	// product is created in the db using all details plus the id of the user who created the product
	const product = await Product.create(req.body);

	// get status code response and product in json format
	res.status(StatusCodes.CREATED).json({ product });
};

// GET fetch all products
const getProducts = async (req, res) => {
	const products = await Product.find().sort('createdAt');

	if (!products) throw new notFound('No products available');

	res.status(200).json({ products });
};

// GET fetch a single product
const getSingleProduct = async (req, res) => {
	// req.params = {productID: "6666FFF"} object
	// req.user is used with authentication
	const {
		user: { userId },
		params: { productID },
	} = req;

	const singleProduct = await Product.findOne({
		_id: productID,
		sellerID: userId,
	});

	if (!singleProduct)
		throw new NotFoundError(
			`No product with id ${productID} for the user with id ${userId}`
		);

	res.status(StatusCodes.OK).json({ success: true, data: singleProduct });
};

// PUT update single product
const updateSingleProduct = async (req, res) => {
	// destructure amountAvailable, cost and productName in product model from req.body (form)
	// destructure userId from req.user (userId is from authentication)
	// desctructure productID from req.params

	const {
		user: { userId },
		params: { productID },
		body: { amountAvailable, cost, productName },
	} = req;

	// check if amountAvailable, cost,productName have been filled in the req.body form
	if (!amountAvailable || !cost || !productName)
		throw new BadRequestError(
			'amountAvailable, cost, productName must be filled'
		);

	// if filled above, we find product by product id and seller id and update using req.body form
	const updatedProduct = await Product.findByIdAndUpdate(
		{ _id: productID, sellerID: userId },
		req.body,
		{ new: true, runValidators: true }
	);

	// check if updatedProduct exists
	if (!updatedProduct)
		throw new NotFoundError(
			`No product with id ${productID} for the user with id ${userId} exists`
		);

	// if updated Product exists
	res.status(StatusCodes.CREATED).json({
		success: true,
		data: updatedProduct,
	});
};

// DELETE Delete single product
const deleteSingleProduct = async (req, res) => {
	// destructure userId from req.user (userId is from authentication)
	// desctructure productID from req.params

	const {
		user: { userId },
		params: { productID },
	} = req;

	// find product by id and seller id/user id, who created the product
	const deletedProduct = await Product.findByIdAndDelete({
		_id: productID,
		sellerID: userId,
	});

	// if product does not exists
	if (!deletedProduct)
		throw new NotFoundError(
			`No product with id ${productID} for the user with id ${userId} exists`
		);

	// else delete
	res.status(StatusCodes.OK).send('product deleted successfully');
};

export {
	createProduct,
	getProducts,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
};
