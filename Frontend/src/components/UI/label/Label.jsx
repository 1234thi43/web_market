import styles from './Label.module.css';

export const Label = ({ direction = 'column', children, className = '', ...rest }) => {
	const directionClass = direction === 'row' ? styles.labelRow : '';

	return (
		<label className={`${styles.label} ${directionClass} ${className}`} {...rest}>
			{children}
		</label>
	);
};
