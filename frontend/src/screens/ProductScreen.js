import React from 'react';
import { Row, Col, LinkContainer, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from '../products';
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {
	const product = products.find(product => match.params.id === product._id);
	return (
		<>
			<Link to="/" className="btn bg-light py-3">
				Go Back
			</Link>
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
							<ListGroup.Item>
								<Button type="button" className="btn-block" disabled={product.countInStock === 0}>
									ADD TO CART
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;