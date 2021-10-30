import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer } from './reducers/products.js';

const INITIAL_STATE = {};

const reducers = combineReducers({
	products: productsReducer,
});

const middlewares = [thunk];

const store = createStore(reducers, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
