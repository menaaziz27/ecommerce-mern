import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">copyright &copy; proshop</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
