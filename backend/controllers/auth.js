import { BadRequest } from '../errors/bad-request.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
	res.send('Register User');
};

const login = async (req, res) => {
	res.send('Login User');
};

export { register, login };
