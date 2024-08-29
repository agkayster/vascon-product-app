import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from '../errors/unauthenticated.js';

const authenticationMiddleware = async (req, res, next) => {
	console.log(req.headers);
	const authHeader = req.headers.authorization;

	// here we check if we actually have req.headers.authorization or if our req.headers.authorization starts with a Bearer string //
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('No token provided');
	}

	// here we split the Bearer and token string with a space into an array via authHeader.split(" ") and pick the second element which is the token string via [1] the second index //
	const token = authHeader.split(' ')[1];
	// console.log('get token =>', token);

	// Here we verify our token to make sure it is valid //
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// const decoded = jwt.decode(token); this can also be used if we don't want to use verify()'
		// console.log('get decoded =>', decoded);
		const { id, username } = decoded;
		req.user = { id, username };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorised to access this route');
	}
};

export { authenticationMiddleware };
