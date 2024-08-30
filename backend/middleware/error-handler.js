import { CustomAPIError } from '../errors/custom-error.js';
import { StatusCodes } from 'http-status-codes';

// dynamically implements error handler middleware for internal server error
const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.send('Something went wrong, try again later.');
};

export { errorHandlerMiddleware };
