import styles from './AppColumn.module.css';

export const AppColumn = ({ children, className = '' }) => {
	return <div className={`${styles.column} ${className}`}>{children}</div>;
};
