import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
	const shippingAddress = useSelector(state => state?.cart?.shippingAddress);

	const [address, setAddress] = useState(shippingAddress.address || '');
	const [country, setCountry] = useState(shippingAddress.country || '');
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
	const [city, setCity] = useState(shippingAddress.city || '');

	const dispatch = useDispatch();

	const submitHandler = e => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, country, postalCode, city }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="address">
					<FormLabel>Address</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter address"
						value={address}
						onChange={e => setAddress(e.target.value)}
					></FormControl>
				</FormGroup>
				<FormGroup controlId="country">
					<FormLabel>Country</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter Country"
						value={country}
						onChange={e => setCountry(e.target.value)}
					></FormControl>
				</FormGroup>
				<FormGroup controlId="postalcode">
					<FormLabel>Postal Code</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter Postal Code"
						value={postalCode}
						onChange={e => setPostalCode(e.target.value)}
					></FormControl>
				</FormGroup>
				<FormGroup controlId="city">
					<FormLabel>City</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter City"
						value={city}
						onChange={e => setCity(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
