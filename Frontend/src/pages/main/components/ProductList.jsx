import ProductCard from './ProductCard';
import { addToCart } from '../../../slices/cartSlice';

export default function ProductList({ items, dispatch }) {
	if (items.length === 0) {
		return (
			<p style={{ textAlign: 'center', color: '#777', marginTop: 20 }}>
				Ничего не найдено 😕
			</p>
		);
	}

	return (
		<>
			{items.map((p) => (
				<ProductCard
					key={p._id}
					p={p}
					dispatch={dispatch}
					addToCart={addToCart}
				/>
			))}
		</>
	);
}
