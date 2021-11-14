import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailsReducer } from './reducers/products.js';
import { cartReducer } from './reducers/cartReducers.js';

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const INITIAL_STATE = { cart: { cartItems: cartItemsFromStorage } };

const reducers = combineReducers({
	products: productsReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

const middlewares = [thunk];

const store = createStore(
	reducers,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
