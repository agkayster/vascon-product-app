import User from '../models/User.js';

// GET endpoint
const getUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json({ success: true, data: users });
};

// POST endpoint
const createUser = async (req, res) => {
	const user = await User.create(req.body);
	res.status(200).json({ user });
};

export { getUsers, createUser };
