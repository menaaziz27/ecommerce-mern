import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cart';
const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const dispatch = useDispatch();

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	console.log(cartItems);

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, qty, productId]);

	const removeFromCartHandler = id => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<div>
			<Row>
				<Col md={8}>
					<h1>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty <Link to="/">Back</Link>
						</Message>
					) : (
						<ListGroup>
							{cartItems.map(item => (
								<ListGroupItem key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/products/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>{item.price}</Col>
										<Col md={2}>
											<Form.Control
												as="select"
												value={item.qty}
												onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
											>
												{[...Array(item.countInStock).keys()].map(x => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button type="button" variant="light" onClick={e => removeFromCartHandler(item.product)}>
												<i className="fa fa-trash" />
											</Button>
										</Col>
									</Row>
								</ListGroupItem>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroupItem>
								<h2>Subtotal {cartItems.reduce((acc, item) => item.qty + acc, 0)} items </h2>$
								{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
							</ListGroupItem>
							<ListGroupItem>
								<Button
									type="button"
									className="btn btn-block"
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									Proceed To Checkout
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default CartScreen;
