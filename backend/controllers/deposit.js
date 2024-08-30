import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';
import User from '../models/User.js';

const deposit = async (req, res) => {
	let vendingMachine = [];

	const {
		user: { userId },
		body: { depositAmt },
	} = req;

	let getDepositUser = await User.findOne({ _id: userId, role: 'buyer' });

	if (!getDepositUser) throw new NotFoundError(`No user with id ${userId}`);

	if (
		depositAmt === 5 ||
		depositAmt === 10 ||
		depositAmt === 20 ||
		depositAmt === 50 ||
		depositAmt === 100
	) {
		vendingMachine.push(depositAmt);
	} else {
		throw new NotFoundError('Invalid deposit');
	}

	const updateDepositUser = await User.findOneAndUpdate(
		{ _id: userId, role: 'buyer' },
		{ vendingMachine: vendingMachine },
		{ new: true, runValidators: true }
	);

	res.status(StatusCodes.CREATED).json({ updateDepositUser });
};

export { deposit };
