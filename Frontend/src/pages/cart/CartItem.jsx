import { Button, Input } from '../../components';
import styles from './CartPage.module.css';

export default function CartItem({ product, onQuantityChange, onRemove }) {
	return (
		<article className={styles.row}>
			<div className={styles.productBlock}>
				<img
					className={styles.productImage}
					src={product.image ? `http://localhost:5000${product.image}` : ''}
					alt={product.title}
				/>
				<div>
					<h3>{product.title}</h3>
					<p>Цена: {product.price} ₽</p>
				</div>
			</div>

			<div className={styles.controls}>
				<Input
					className={styles.inputQuantity}
					type="number"
					min="1"
					value={product.quantity || 1}
					onChange={(e) => onQuantityChange(product._id, e.target.value)}
				/>
				<Button onClick={() => onRemove(product._id)}>
					Удалить
				</Button>
			</div>
		</article>
	);
}
