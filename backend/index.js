import express from 'express';
// import from routes
import people from './routes/people.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// added router "people" to our base route
app.use('/api/people', people);

// "/" refers to localhost:5000
app.get('/', (req, res) => res.send('Home page'));

// normal routes
// app.get('/api/people', (req, res) => {
// 	const newPeople = people.map(({ name, age, id }) => {
// 		return { name, age, id };
// 	});
// 	res.json(newPeople);
// });

// app.get('/api/people/:peopleId', (req, res) => {
// 	console.log('get id', req.params);
// 	const { peopleId } = req.params;

// 	// we are fetching a single person based on the "id" from "req.params"
// 	const person = people.filter(({ id }) => id === Number(peopleId));

// 	if (!person) {
// 		return res.status(404).send('Person does not exist');
// 	}
// 	return res.json(person);
// });

// app.get('/api/v1/query', (req, res) => {
// 	const { search, limit } = req.query;

// 	let sortedPeople = [...people];

// 	sortedPeople.length < 1 &&
// 		res.status(200).json({ success: true, data: [] });

// 	if (search) {
// 		sortedPeople = sortedPeople.filter(({ name }) =>
// 			name.toLowerCase().startsWith(search)
// 		);
// 	}

// 	if (limit) {
// 		sortedPeople = sortedPeople.slice(0, Number(limit));
// 	}

// 	return res.status(200).json(sortedPeople);
// });

app.get('/about', (req, res) => res.send('About page'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
