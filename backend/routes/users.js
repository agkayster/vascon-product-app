import express from 'express';
import { getUsers, createUser } from '../controllers/users.js';

const router = express.Router();

router.route('/users').get(getUsers).post(createUser);

// router
// 	.route('/users/:userID')
// 	.put(updateSinglePerson)
// 	.delete(deleteSinglePerson);

export default router;
