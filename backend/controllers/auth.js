import { BadRequest } from '../errors/bad-request.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
	// req.body because of login form
	const { username, password } = req.body;

	if (!username || !password) {
		throw new BadRequest('Please provide a username and password', 400);
	}

	const id = new Date().getDate();
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({ msg: 'user created', userToken: token });
};

export { login };
