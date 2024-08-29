import mongoose from 'mongoose';

const connectDB = async (url) => {
	return await mongoose
		.connect(url)
		.then(() => console.log('connected to db'))
		.catch((err) => console.log(err));
};

export { connectDB };
