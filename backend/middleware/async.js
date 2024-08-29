// use asyncWrapper so as not to use try/catch everywhere
const asyncWrapper = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export { asyncWrapper };
