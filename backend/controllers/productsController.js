import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc     fetch all products
 * @route    GET /api/products
 * @access   public
 */
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

/**
 * @desc     fetch single product
 * @route    GET /api/product
 * @access   public
 */
export const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404).json({ message: 'Product not found!' });
	}

	res.json(product);
});
