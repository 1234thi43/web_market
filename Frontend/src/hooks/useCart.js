import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart as add,
	removeFromCart as remove,
	setQuantity as setQ,
	clearCart as clear,
	selectCart,
} from '../slices/cartSlice';

export function useCart() {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);

	const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

	const addToCart = (product, quantity = 1) => {
		dispatch(add({ product, quantity }));
	};

	const removeFromCart = (id) => {
		dispatch(remove(id));
	};

	const setQuantity = (id, quantity) => {
		dispatch(setQ({ id, quantity }));
	};

	const clearCart = () => {
		dispatch(clear());
	};

	return {
		cart,
		totalCount,
		addToCart,
		removeFromCart,
		setQuantity,
		clearCart,
	};
}
