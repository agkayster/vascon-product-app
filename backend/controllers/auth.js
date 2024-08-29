import { BadRequestError } from '../errors/bad-request.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { UnauthenticatedError } from '../errors/unauthenticated.js';

const register = async (req, res) => {
	// create our user using mongoDB
	const user = await User.create({ ...req.body });

	// create our token using OOP function from User Models
	const token = user.createJWT();

	// pass response to json
	res.status(StatusCodes.CREATED).json({
		msg: 'User created',
		username: { name: user.username },
		token,
	});
};

const login = async (req, res) => {
	// destructure username and password from login form
	const { username, password } = req.body;

	// check if user entered username and password in the login form
	if (!username || !password)
		throw new BadRequestError('Please provide username and password');

	// find the user in the db using the username
	const user = await User.findOne({ username });

	// if no user, throw error
	if (!user) throw new UnauthenticatedError('Invalid credentials');

	// else if user, create JWT using OOP method from User Model
	const token = user.createJWT();

	res.status(StatusCodes.OK).json({
		msg: `Welcome ${user.username}`,
		user: { name: user.username },
		token,
	});
};

export { register, login };
