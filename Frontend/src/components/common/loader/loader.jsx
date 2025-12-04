
import styles from './Loader.module.css';

export default function Loader({ size = '40px', padding = '60px' }) {
	return (
		<div className={styles.wrapper} style={{ padding }}>
			<div className={styles.spinner} style={{ width: size, height: size }} />
		</div>
	);
}
