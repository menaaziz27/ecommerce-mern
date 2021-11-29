import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const isAuth = asyncHandler(async (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = await jwt.verify(token, process.env.JWT_SECRET);

			let user = await User.findById(decoded.id);
			req.user = user;

			next();
		} catch (e) {
			console.log(e.message);
			res.status(401);
			throw new Error('Not authorized, invald token');
		}
	} else {
		res.status(401);
		throw new Error('Not authorized');
	}
});
