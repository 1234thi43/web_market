import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import { request } from '../../utils/request';
import { FormWrapper, Label, Input, Button } from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './login.module.css';
import { useNotification } from '../../components/common/notification/useNotification';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { showNotification } = useNotification();

	const schema = yup.object({
		email: yup.string().email('Некорректный email').required('Введите email'),
		password: yup.string().min(4, 'Минимум 4 символов').required('Введите пароль'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const res = await request(
				'http://localhost:5000/api/auth/login',
				'POST',
				data,
			);

			if (res.success) {
				document.cookie = `token=${res.token}; path=/; max-age=${30 * 24 * 60 * 60}`;
				dispatch(setUser({ user: res.user, token: res.token }));
				reset();
				navigate('/');
			} else {
				throw new Error(res.error || 'Ошибка авторизации');
				// showNotification(res.error || 'Ошибка авторизации');
			}
		} catch (err) {
			// alert(err.message || 'Ошибка соединения с сервером');
			showNotification(err.message || 'Ошибка соединения с сервером', 'red');
		}
	};

	return (
		<main>
			<section>
				<FormWrapper as="div">
					<h2>Вход</h2>

					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Label>
							Email:
							<Input
								type="email"
								{...register('email')}
								placeholder="example@mail.com"
								aria-invalid={!!errors.email}
							/>
							{errors.email && (
								<p className={styles.errorText} role="alert">
									{errors.email.message}
								</p>
							)}
						</Label>

						<Label>
							Пароль:
							<Input
								type="password"
								{...register('password')}
								placeholder="••••••••"
								aria-invalid={!!errors.password}
							/>
							{errors.password && (
								<p className={styles.errorText} role="alert">
									{errors.password.message}
								</p>
							)}
						</Label>

						<Button type="submit" disabled={!isValid || isSubmitting}>
							{isSubmitting ? 'Отправка...' : 'Войти'}
						</Button>

						<p className={styles.toRegister}>
							Нет аккаунта?{' '}
							<Link to="/register" className={styles.registerLink}>
								Зарегистрироваться
							</Link>
						</p>
					</form>
				</FormWrapper>
			</section>
		</main>
	);
}
