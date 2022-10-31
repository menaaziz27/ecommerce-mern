import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails, updateUserProfile } from '../actions/user.js';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const userDetails = useSelector(state => state.userDetails);
	const { error, loading, user } = userDetails;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const userProfile = useSelector(state => state.userProfile);
	const { success } = userProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// console.log(user.name);
			if (!user?.name || user.email !== userInfo.email) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password don't match");
		} else {
			dispatch(updateUserProfile({ _id: user._id, name, email, password }));
			dispatch(getUserDetails('profile'));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1>Profile</h1>
				{error && <Message variant="danger">{error}</Message>}
				{message && <Message variant="danger">{message}</Message>}
				{success && <Message variant="success">Profile Updated!</Message>}
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

					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
