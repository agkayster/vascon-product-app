import express from 'express';
import {
	getUsers,
	createUser,
	getSingleUser,
	updateSingleUser,
	deleteSingleUser,
} from '../controllers/users.js';

const router = express.Router();

router.route('/users').get(getUsers).post(createUser);

router
	.route('/users/:userID')
	.get(getSingleUser)
	.put(updateSingleUser)
	.delete(deleteSingleUser);

export default router;
