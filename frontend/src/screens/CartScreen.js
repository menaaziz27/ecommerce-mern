import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Image, ListGroup } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cart';
const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const dispatch = useDispatch();

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, qty, productId]);

	return <div>Cart</div>;
};

export default CartScreen;
