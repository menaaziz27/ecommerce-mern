import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/" component={HomeScreen} />
					<Route path="/products/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/order/:id" component={OrderScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
