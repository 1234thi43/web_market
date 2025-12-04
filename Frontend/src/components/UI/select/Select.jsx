import styles from './Select.module.css';

export const Select = ({ value, onChange, $error, children, className, ...rest }) => {
	return (
		<select
			className={`${styles.select} ${$error ? styles.selectError : ''} ${className || ''}`}
			value={value}
			onChange={onChange}
			{...rest}
		>
			{children}
		</select>
	);
};
