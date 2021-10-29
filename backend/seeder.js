import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import products from './data/products.js';
import users from './data/users.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import connectDB from './utils/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map(product => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log(`Data imported!!`.green.inverse);
		process.exit();
	} catch (e) {
		console.log(`${e}`.red.bold);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		console.log(`Data destroyed!!`.red.bold);
		process.exit();
	} catch (e) {
		console.log(`${e}`.red.bold);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
