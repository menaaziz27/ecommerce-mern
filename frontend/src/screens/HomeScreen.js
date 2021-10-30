import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Prodcut';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/products.js';
const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector(state => state.products);
	const { loading, products, error } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<h2>loading ...</h2>
			) : error ? (
				<h3>{error}</h3>
			) : (
				<Row>
					{products.map(product => (
						<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
