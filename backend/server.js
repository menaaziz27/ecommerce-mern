import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import colors from 'colors';
import productsRoutes from './routers/products.js';
import userRoutes from './routers/users.js';
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Api running');
});

app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`app listening in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
});
