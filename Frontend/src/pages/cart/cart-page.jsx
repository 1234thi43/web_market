import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCart,
	removeFromCart,
	setQuantity,
	clearCart,
} from '../../slices/cartSlice';
import { useModal } from '../../components/common/modal/modal-context';
import { ROLE } from '../../constants/role';
import { useNotification } from '../../components/common/notification/useNotification';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import styles from './CartPage.module.css';

export default function CartPage() {
	const cart = useSelector(selectCart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { openModal } = useModal();
	const { showNotification } = useNotification();
	const user = useSelector((state) => state.auth.user);
	const role = user?.role ?? ROLE.GUEST;

	const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

	const totalCount = cart.reduce((s, it) => s + (it.quantity || 1), 0);

	const handlePay = () => {
		if (role === ROLE.GUEST) {
			openModal({
				text: 'Чтобы оплатить заказ, пожалуйста, зарегистрируйтесь или войдите в систему.',
				onConfirm: () => navigate('/register'),
			});
			return;
		}

		openModal({
			text: `Оплатить ${total} ₽ за ${totalCount} товар(ов)?`,
			onConfirm: () => {
				dispatch(clearCart());
				showNotification('✅ Оплата прошла успешно!', 'green');
				navigate('/');
			},
		});
	};

	const handleQuantityChange = (id, quantity) => {
		dispatch(setQuantity({ id, quantity }));
	};

	const handleRemove = (id) => {
		dispatch(removeFromCart(id));
	};

	const handleClear = () => {
		openModal({
			text: 'Очистить корзину?',
			onConfirm: () => dispatch(clearCart()),
		});
	};

	return (
		<section className={styles.container}>
			<header>
				<h2>Корзина</h2>
			</header>

			{cart.length === 0 ? (
				<p>Пока в корзине ничего нет.</p>
			) : (
				<>
					{cart.map((p) => (
						<CartItem
							key={p._id}
							product={p}
							onQuantityChange={handleQuantityChange}
							onRemove={handleRemove}
						/>
					))}
					<CartSummary total={total} onClear={handleClear} onPay={handlePay} />
				</>
			)}
		</section>
	);
}
