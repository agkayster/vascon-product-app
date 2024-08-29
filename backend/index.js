import express from 'express';
import dotenv from 'dotenv';
// import from routes
import people from './routes/people.js';
import { connectDB } from './db/connect.js';
import { port } from './config/environment.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// added router "people" to our base route
app.use('/api/people', people);

// "/" refers to localhost:5000
app.get('/', (req, res) => res.send('Home page'));

app.get('/about', (req, res) => res.send('About page'));

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
