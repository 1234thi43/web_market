
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../slices/authSlice';
import { ROLE_LABELS, ROLE } from '../../../constants/role';
import { selectCart } from '../../../slices/cartSlice';
import { Button } from '../../UI/button/Button';

import styles from './Header.module.css';

export const Header = ({ className }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const role = user?.role ?? ROLE.GUEST;
	const cart = useSelector(selectCart);

	const totalCount = cart.reduce((s, it) => s + (it.quantity || 1), 0);

	return (
		<div className={`${styles.header} ${className || ''}`}>
			<div>
				<Link to="/">Главная</Link>

				{role === ROLE.ADMIN && <Link to="/users">Пользователи</Link>}

				{[ROLE.ADMIN, ROLE.SELLER].includes(role) && (
					<Link to="/product">Товар</Link>
				)}

				<Link to="/cart" className={styles.cartWrapper}>
					Корзина
					{totalCount > 0 && (
						<span className={styles.cartBadge}>{totalCount}</span>
					)}
				</Link>
			</div>

			<div>
				{user ? (
					<>
						<span className={styles.userName}>
							{user.name} ({ROLE_LABELS[role]})
						</span>
						<Button onClick={() => dispatch(logout())}>Выйти</Button>
					</>
				) : (
					<>
						<span>Гость</span>
						<Link to="/login">Вход</Link>
						<Link to="/register">Регистрация</Link>
					</>
				)}
			</div>
		</div>
	);
};
