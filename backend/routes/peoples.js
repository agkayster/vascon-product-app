import express from 'express';
import {
	getPeople,
	postPerson,
	updateSinglePerson,
	deleteSinglePerson,
} from '../controllers/peoples.js';

const router = express.Router();

router.route('/').get(getPeople).post(postPerson);

router.route('/:personID').put(updateSinglePerson).delete(deleteSinglePerson);
// // "/api/people" refers to localhost:5000/api/people and it is our "base route"
// router.get('/', getPeople);

// // add this here before testing in POSTMAN app
// router.post('/', postPerson);

// // personID inside req.params must match ":personID" in endpoint url
// router.put('/:personID', updateSinglePerson);

// router.delete('/:personID', deleteSinglePerson);

export default router;
