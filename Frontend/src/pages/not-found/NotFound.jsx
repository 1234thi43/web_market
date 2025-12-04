import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
	return (
		<main className={styles.container}>
			<section className={styles.card}>
				<h1 className={styles.title}>404</h1>
				<p className={styles.subtitle}>Страница не найдена</p>

				<p className={styles.text}>
					Кажется, вы попали на несуществующую страницу. Проверьте адрес или
					вернитесь на главную.
				</p>

				<Link to="/" className={styles.button}>
					На главную
				</Link>
			</section>
		</main>
	);
}
