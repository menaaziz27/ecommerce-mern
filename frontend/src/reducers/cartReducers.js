import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actionTypes/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM: {
			const item = action.payload;

			const isItemExist = state.cartItems?.find(x => x?.product === item.product);
			console.log(isItemExist);

			if (isItemExist) {
				return {
					...state,
					cartItems: state.cartItems.map(x => (x.product === isItemExist.product ? item : x)),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		}
		case CART_REMOVE_ITEM: {
			return { ...state, cartItems: state.cartItems.filter(item => item.product !== action.payload) };
		}
		default:
			return state;
	}
};
