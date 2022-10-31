import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

export const addOrder = asyncHandler(async (req, res, next) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items.');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

export const getOrder = asyncHandler(async (req, res, next) => {
	const orderId = req.params.id;

	const order = await Order.findById(orderId).populate('user', 'name email');

	if (!order) {
		res.status(404);
		throw new Error('Order not found!');
	}

	res.status(200).json(order);
});

export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		let updatedOrder = await order.save();
		return res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found!');
	}
});
