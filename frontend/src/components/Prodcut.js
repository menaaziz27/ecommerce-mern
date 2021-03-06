import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
const Prodcut = ({ product }) => {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/products/${product._id}`}>
				<Card.Img src={product.image} width="240" height="200" />
			</Link>

			<Card.Body>
				<Link to={`/products/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<Rating value={product?.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Prodcut;
