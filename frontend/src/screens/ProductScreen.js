import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/products';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const productDetails = useSelector(state => state?.productDetails);
	const { error, product, loading } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link to="/" className="btn bg-light py-3">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} />
							</ListGroup.Item>
							<ListGroup.Item>price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>description: ${product.description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>price: </Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>status: </Col>
										<Col>
											<strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={e => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map(x => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										type="button"
										className="btn-block"
										disabled={product.countInStock === 0}
									>
										ADD TO CART
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
