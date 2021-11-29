import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * @desc     authenticate a user
 * @route    POST /api/users/login
 * @access   public
 */
export const postLogin = asyncHandler(async (req, res) => {
	console.log(req.body);

	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		return res.json({
			_id: user._id,
			name: user.email,
			email: user.email,
			isAdmin: user.isAdmin,
			token: await generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('invalid email or password');
	}
});

/**
 * @desc     get user's profile
 * @route    GET /api/users/profile
 * @access   public
 */
export const getUserProfile = asyncHandler(async (req, res) => {
	const currentUser = await User.findById(req.user._id);

	if (currentUser) {
		res.json({
			_id: currentUser._id,
			name: currentUser.email,
			email: currentUser.email,
			isAdmin: currentUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('user not found');
	}
});

/**
 * @desc     create new user
 * @route    GET /api/users/register
 * @access   public
 */
export const createUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('user already exists');
	}

	const user = await User.create({ name, email, password });
	res.json({
		_id: user._id,
		email: user.email,
		name: user.name,
		isAdmin: user.isAdmin,
	});
});
