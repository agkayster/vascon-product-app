import express from 'express';
import dotenv from 'dotenv';

/* we do not need try/catch block repeated and asyncWrappers */
import 'express-async-errors';

import productRouter from './routes/products.js';
import { connectDB } from './db/connect.js';
import { port } from './config/environment.js';
import { notFound } from './middleware/not-found.js';
import authRouter from './routes/auth.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { authenticationMiddleware } from './middleware/auth.js';

dotenv.config();

// invoke express app
const app = express();

app.use(express.urlencoded({ extended: false }));
// gets the body of the all forms
app.use(express.json());

// add router, "/api/v1" is the base route
app.use('/api/v1/auth', authRouter);

// must be authenticated before viewing any product endpoints
app.use('/api/v1', authenticationMiddleware, productRouter);

// Error handlers
app.use(notFound);
app.use(errorHandlerMiddleware);

// "/" refers to localhost:5000
app.get('/', (req, res) => res.send('Home page'));

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}`)
		);
	} catch (error) {
		console.log(error);
	}
};
start();
