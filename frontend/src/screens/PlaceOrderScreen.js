import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/order';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);

	const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2);

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

	const { orderCreate } = useSelector(state => state);
	const { error, order, success } = orderCreate;

	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
								{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Metehod :</strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items:</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/products/${item.product}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Order Summary</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Items</Col>
							<Col>${cart.itemsPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Shipping</Col>
							<Col>${cart.shippingPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Tax</Col>
							<Col>${cart.taxPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Total</Col>
							<Col>${cart.totalPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							{error && <Message variant="danger">{error}</Message>}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="submit"
								className="btn-block"
								disabled={cart.cartItems.length === 0}
								onClick={placeOrderHandler}
							>
								Place Order
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
