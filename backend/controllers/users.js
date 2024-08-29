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

// GET single user endpoint
const getSingleUser = async (req, res) => {
	const { userID } = req.params;

	const singleUser = await User.findById({ _id: userID });

	if (!singleUser) {
		return res.status(404).json({ msg: `No user with id of ${userID}` });
	}

	res.status(200).json({ singleUser });
};

// PUT single user endpoint
const updateSingleUser = async (req, res) => {
	// get user based on id
	const { userID } = req.params;

	// find and update user based on filling the form
	const updatedUser = await User.findByIdAndUpdate(
		{ _id: userID },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	// if user does not exist
	if (!updatedUser) {
		res.status(404).json({ msg: `no user with id ${userID}` });
	}

	// if user exist
	res.status(201).json({ updatedUser });
};

// DELETE single user endpoint
const deleteSingleUser = async (req, res) => {
	// get user based on id
	const { userID } = req.params;

	// find and update user based on filling the form
	const updatedUser = await User.findByIdAndDelete({ _id: userID });

	// if user does not exist
	if (!updatedUser) {
		res.status(404).json({ msg: `no user with id ${userID}` });
	}

	// if user exist
	res.status(200).json({ msg: `user with id ${userID} deleted` });
};

export {
	getUsers,
	createUser,
	getSingleUser,
	updateSingleUser,
	deleteSingleUser,
};
