import express from 'express';
import { getAllUsers } from '../controllers/users.js';

const router = express.Router();

// route all the product endpoints
router.route('/users').get(getAllUsers);

export default router;
