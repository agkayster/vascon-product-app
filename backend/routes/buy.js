import express from 'express';
import { buy } from '../controllers/buy.js';

const router = express.Router();

router.route('/buy').post(buy);

export default router;
