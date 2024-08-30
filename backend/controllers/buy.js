import User from '../models/User.js';
import Product from '../models/Product.js';
import { NotFoundError } from '../errors/index.js';

const buy = async (req, res) => {
	// destructure  userId
	// get particular user based on id via authentication and role

	const {
		user: { userId },
		params: { productID },
	} = req;

	const getBuyUser = await User.findOne({ _id: userId, role: 'buyer' });
	console.log('get buy user =>', getBuyUser);

	if (!getBuyUser) {
		throw new NotFoundError('User not found');
	}

	const getProductToBuy = await Product.findOne({
		cost: { $lt: 50 },
	});
	console.log('get product to buy =>', getProductToBuy);

	res.send('buy endpoint');
};
export { buy };
