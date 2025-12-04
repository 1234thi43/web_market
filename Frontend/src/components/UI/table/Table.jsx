import styles from './Table.module.css';

export const Table = ({ children, className, ...rest }) => {
	return (
		<table className={`${styles.table} ${className || ''}`} {...rest}>
			{children}
		</table>
	);
};
