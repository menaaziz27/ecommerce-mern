import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Row, Col, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { login } from '../actions/user';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { error, loading, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>sign in</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader variant="danger">{loading}</Loader>}
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="email">
					<FormLabel>Email Address</FormLabel>
					<FormControl
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="password">
					<FormLabel>Password</FormLabel>
					<FormControl
						type="password"
						placeholder="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button type="submit" variant="primary" className="my-3">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer ? <Link to={redirect ? `register?redirect=${redirect}` : '/register'}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
