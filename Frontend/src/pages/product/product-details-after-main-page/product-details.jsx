import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../slices/cartSlice';
import { CATEGORIES } from '../../../constants/categories';
import Loader from '../../../components/common/loader/loader';
import { FormWrapper, Input } from '../../../components';
import { Button } from '../../../components';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`http://localhost:5000/api/products/${id}`);
				const data = await res.json();
				if (data.success) setProduct(data.product);
			} catch (err) {
				console.error('Ошибка при загрузке товара:', err);
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	if (loading) return <Loader />;
	if (!product) return <p>❌ Товар не найден</p>;

	const handleAddToCart = () => {
		dispatch(addToCart({ product, quantity: Number(quantity) }));
	};

	const isUnavailable = !product.isActive || product.quantity <= 0;

	return (
		<main>
			<FormWrapper>
				<header>
					<h1>{product.title}</h1>
				</header>

				<article>
					<img
						className={styles.image}
						src={product.image ? `http://localhost:5000${product.image}` : ''}
						alt={product.title}
					/>

					<p>
						<strong>Категория:</strong>{' '}
						{CATEGORIES.find((c) => c.value === product.category)?.label ||
							product.category}
					</p>

					<p>
						<strong>Описание:</strong> {product.description}
					</p>

					<section className={styles.productActions}>
						<p>
							<strong>Цена:</strong> {product.price} ₽
						</p>

						<div className={styles.row}>
							<Input
								type="number"
								min="1"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								disabled={isUnavailable}
								width={'60px'}
							/>

							<Button
								type="button"
								onClick={handleAddToCart}
								disabled={isUnavailable}
							>
								{isUnavailable
									? 'Товар недоступен'
									: 'Добавить в корзину'}
							</Button>
						</div>
					</section>
				</article>
			</FormWrapper>
		</main>
	);
}
