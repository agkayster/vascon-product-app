import { people } from '../data.js';

// Read
const getPeople = (req, res) =>
	res.status(200).json({ success: true, data: people });

// Create
const postPerson = (req, res) => {
	const { name, age, id } = req.body;
	if (!name || !age || !id) {
		return res.status(404).json({
			success: false,
			msg: 'Please provide the proper user details',
		});
	}
	res.status(201).json({
		success: true,
		data: [...people, { name, age, id }],
	});
};

// Update
const updateSinglePerson = (req, res) => {
	const { personID } = req.params;
	const { name } = req.body;

	const person = people.find(({ id }) => id === Number(personID));

	if (!person) {
		return res.status(404).json({
			success: false,
			message: `No person with id of ${personID}`,
		});
	} else {
		// use ".map" to make transformational changes to items in an array
		const newPeople = people.map((person) => {
			if (person.id === Number(personID)) {
				person.name = name;
			}
			return person;
		});
		return res.status(200).json({ success: true, data: newPeople });
	}
};

// Delete
const deleteSinglePerson = (req, res) => {
	const { personID } = req.params;

	const person = people.find(({ id }) => id === +personID);

	!person &&
		res.status(404).json({
			success: false,
			message: `No person with id of ${personID}`,
		});

	const newPeople = people.filter((person) => person.id !== +personID);
	return res.status(200).json({ success: true, data: newPeople });
};

// CRUD
export { getPeople, postPerson, updateSinglePerson, deleteSinglePerson };
