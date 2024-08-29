import { CustomAPIError } from './custom-error.js';
import { StatusCodes } from 'http-status-codes';

// dynamically write our bad request error messages while using http-status-codes for dynamic status codes
export class BadRequest extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}
