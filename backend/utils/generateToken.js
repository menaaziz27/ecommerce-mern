import jwt from 'jsonwebtoken';

const generateToken = async id => {
	return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
