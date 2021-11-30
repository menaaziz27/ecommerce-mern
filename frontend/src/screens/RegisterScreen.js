import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Row, Col, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { register } from '../actions/user';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();

	const userRegister = useSelector(state => state.userRegister);
	const { error, loading, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password don't match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>sign Up</h1>
			{error && <Message variant="danger">{error}</Message>}
			{message && <Message variant="danger">{message}</Message>}
			{loading && <Loader variant="danger">{loading}</Loader>}
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="name">
					<FormLabel>Name</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter Name"
						value={name}
						onChange={e => setName(e.target.value)}
					></FormControl>
				</FormGroup>

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

				<FormGroup controlId="confrimPassword">
					<FormLabel>Confirm Password</FormLabel>
					<FormControl
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button type="submit" variant="primary" className="my-3">
					Sign Up
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have An Account ? <Link to={redirect ? `login?redirect=${redirect}` : '/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
