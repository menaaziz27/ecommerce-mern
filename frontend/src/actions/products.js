import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../actionTypes';
import axios from 'axios';
export const listProducts = () => async dispatch => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get('/api/products');

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (e) {
		console.log(e);
		dispatch({ type: PRODUCT_LIST_FAIL, payload: e.response && e.response.data.message ? e.response.data.message : e.message });
	}
};
