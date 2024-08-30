import express from 'express';
import { deposit } from '../controllers/deposit.js';

const router = express.Router();

router.route('/deposit').post(deposit);

export default router;
