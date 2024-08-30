import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
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

// rateLimit configuration, limits number of calls to API *security //
app.use(
	rateLimit({
		windowMs: 15 * 60 * 60 * 1000, // using 15 mins
		max: 100, // limit each IP to 100 requests per windowMs
	})
);

// gets the body of the all forms
app.use(express.json());

// cors for sorting pre-flight request *security
app.use(cors());
// helmet to secure express apps *security
app.use(helmet());

// "/" refers to localhost:5000
app.get('/', (req, res) => res.send('Home page'));

// add router, "/api/v1" is the base route
app.use('/api/v1/auth', authRouter);

// must be authenticated before viewing any product endpoints
app.use('/api/v1', authenticationMiddleware, productRouter);

// Error handlers
app.use(notFound);
app.use(errorHandlerMiddleware);

// connects to db first and then listen to server port
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
