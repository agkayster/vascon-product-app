import { CustomAPIError } from './custom-error.js';
import { StatusCodes } from 'http-status-codes';

// dynamically write our unauthenticated error messages while using http-status-codes for dynamic status codes
export class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}
