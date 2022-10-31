import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/order';
import { ORDER_PAY_RESET } from '../actionTypes/orderConstant.js';
import axios from 'axios';

const OrderScreen = ({ match }) => {
	const [sdkReady, setSdkReady] = useState(false);
	const orderId = match.params.id;
	const dispatch = useDispatch();

	const orderDetails = useSelector(state => state.orderDetails);
	const { error, loading, order } = orderDetails;

	const orderPay = useSelector(state => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	if (!loading) {
		const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2);

		order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	}

	const onPaymentSuccessHandler = paypalResult => {
		console.log({ paypalResult });
		dispatch(payOrder(orderId, paypalResult));
	};

	useEffect(() => {
		console.log({ order });
		console.log({ successPay });
		console.log(window.paypal);
		console.log('test');
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			console.log(clientId);
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				// if paypal script is not there
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, orderId, successPay, order]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>Name: {order.user.name}</p>
							<p>
								Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">Pain on {order.deliveredAt}</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Metehod :</strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Pain on {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items:</h2>
							{order.orderItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
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
							<Col>${order.itemsPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Shipping</Col>
							<Col>${order.shippingPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Tax</Col>
							<Col>${order.taxPrice}</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>Total</Col>
							<Col>${order.totalPrice}</Col>
						</ListGroup.Item>
						{!order.isPaid && (
							<ListGroup.Item>
								{loadingPay && <Loader />}
								{!sdkReady ? (
									<Loader />
								) : (
									<PayPalButton amount={order.totalPrice} onSuccess={onPaymentSuccessHandler} />
								)}
							</ListGroup.Item>
						)}
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
