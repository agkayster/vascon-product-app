import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const getAllUsers = async (req, res) => {
	const users = await User.find();

	if (!users) {
		throw new NotFoundError('Users not found');
	}
	res.status(StatusCodes.OK).json({ success: true, data: users });
};
export { getAllUsers };
