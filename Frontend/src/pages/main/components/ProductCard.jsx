import { Button } from '../../../components';
import { CATEGORIES } from '../../../constants/categories';
import styles from '../Main.module.css';
import { useNavigate } from 'react-router';

export default function ProductCard({ p, dispatch, addToCart }) {
	const navigate = useNavigate();

	return (
		<article
			className={styles.productCard}
			onClick={() => navigate(`/product/${p._id}`)}
		>
			<header className={styles.productInfo}>
				<figure className={styles.productImage}>
					{p.image ? (
						<img
							src={`http://localhost:5000${p.image}`}
							alt={p.title}
							className={styles.productImage}
						/>
					) : (
						<figcaption>Нет фото</figcaption>
					)}
				</figure>

				<div className={styles.productText}>
					<h3>{p.title}</h3>

					<p>
						Категория:{' '}
						{CATEGORIES.find((c) => c.value === p.category)?.label ||
							p.category}
					</p>

					<p>Цена: {p.price} ₽</p>

					<p>
						Статус:{' '}
						{p.isActive ? (
							<span style={{ color: 'green' }}>в продаже ✅</span>
						) : (
							<span style={{ color: 'gray' }}>нет в продаже ⛔</span>
						)}
					</p>
				</div>
			</header>

			<Button
				disabled={!p.isActive}
				onClick={(e) => {
					e.stopPropagation();
					if (p.isActive) dispatch(addToCart({ product: p, quantity: 1 }));
				}}
			>
				{p.isActive ? 'Добавить в корзину' : 'Товар закончился'}
			</Button>
		</article>
	);
}
