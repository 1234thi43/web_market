import { Button } from '../../components';
import styles from './CartPage.module.css';

export default function CartSummary({ total, onClear, onPay }) {
	return (
		<footer className={styles.summary}>
			<p>
				<strong>Итого:</strong> {total} ₽
			</p>
			<div className={styles.summaryButtons}>
				<Button onClick={onClear}>
					Очистить
				</Button>
				<Button onClick={onPay}>
					Оплатить
				</Button>
			</div>
		</footer>
	);
}
