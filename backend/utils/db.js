import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB connected on ${conn.connection.host}`.cyan.underline);
	} catch (e) {
		console.log(`Error: ${e.message}`.red.underline.bold);
	}
};

export default connectDB;
