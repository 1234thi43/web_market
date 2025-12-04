
import styles from './Error.module.css';

export function Error({ error }) {
	if (!error) return null;

	return (
		<article className={styles.wrapper} role="alert">
			<h2>Ошибка</h2>
			<p>{error}</p>
		</article>
	);
}
