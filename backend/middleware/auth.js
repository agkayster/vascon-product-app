import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/unauthenticated.js';

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	// check if we actually have req.headers.authorization or if our req.headers.authorization starts with a Bearer string //
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authorization Invalid');
	}

	// split the Bearer and token string with a space into an array via authHeader.split(" ") and pick the second element which is the token string via [1] the second index //
	const token = authHeader.split(' ')[1];

	// verify token to make sure it is valid //
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// attach the user info from the payload to the product routes //
		req.user = { userId: payload.userId, username: payload.username };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorised to access this route');
	}
};

export { authenticationMiddleware };
