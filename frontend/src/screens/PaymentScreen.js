import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
	const shippingAddress = useSelector(state => state?.cart?.shippingAddress);

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check>

						<Form.Check
							type="radio"
							label="Sripe"
							id="Sripe"
							name="paymentMethod"
							value="Sripe"
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
