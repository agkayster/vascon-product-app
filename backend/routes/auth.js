import express from 'express';
import { login, register } from '../controllers/auth.js';

const router = express.Router();

router.route('/login').post(login);

export default router;
