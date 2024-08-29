// helps to dynamically write our error messages
export class CustomAPIError extends Error {
	constructor(message) {
		super(message);
	}
}
