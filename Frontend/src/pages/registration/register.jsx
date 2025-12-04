import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import { request } from '../../utils/request';
import { FormWrapper, Label, Input, Button } from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './register.module.css';
import { useNotification } from '../../components/common/notification/useNotification';

const schema = yup.object({
	name: yup
		.string()
		.required('Введите имя')
		.min(2, 'Имя должно содержать минимум 2 символа'),
	email: yup.string().email('Некорректный email').required('Введите email'),
	password: yup.string().required('Введите пароль').min(8, 'Минимум 8 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Повторите пароль'),
});

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { showNotification } = useNotification();

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
			const res = await request('http://localhost:5000/api/auth/register', 'POST', {
				name: data.name,
				email: data.email,
				password: data.password,
			});

			if (res.success) {
				dispatch(setUser({ user: res.user, token: res.token }));
				document.cookie = `token=${res.token}; path=/; max-age=${30 * 24 * 60 * 60}`;
				reset();
				navigate('/');
				showNotification('✅ Пользователь успешно зарегистрирован', 'green');
			} else {
				throw new Error(res.error || 'Ошибка регистрации');
				// showNotification(res.error || 'Ошибка регистрации');
			}
		} catch (err) {
			showNotification(err.message || 'Ошибка соединения с сервером', 'red');
		}
	};

	return (
		<main>
			<section>
				<FormWrapper as="div">
					<h2>Регистрация</h2>

					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Label>
							Имя:
							<Input
								type="text"
								{...register('name')}
								placeholder="Введите имя"
								aria-invalid={!!errors.name}
							/>
							{errors.name && (
								<p className={styles.errorText} role="alert">
									{errors.name.message}
								</p>
							)}
						</Label>

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
								placeholder="Минимум 8 символов"
								aria-invalid={!!errors.password}
							/>
							{errors.password && (
								<p className={styles.errorText} role="alert">
									{errors.password.message}
								</p>
							)}
						</Label>

						<Label>
							Повторите пароль:
							<Input
								type="password"
								{...register('confirmPassword')}
								placeholder="••••••••"
								aria-invalid={!!errors.confirmPassword}
							/>
							{errors.confirmPassword && (
								<p className={styles.errorText} role="alert">
									{errors.confirmPassword.message}
								</p>
							)}
						</Label>

						<Button
							type="submit"
							disabled={!isValid || isSubmitting}
							aria-busy={isSubmitting}
						>
							{isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
						</Button>

						<p className={styles.loginSuggestion}>
							Уже есть аккаунт?{' '}
							<Link to="/login" className={styles.loginLink}>
								Войти
							</Link>
						</p>
					</form>
				</FormWrapper>
			</section>
		</main>
	);
}
