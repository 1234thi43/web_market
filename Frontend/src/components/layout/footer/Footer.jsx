import styles from './Footer.module.css';

export const Footer = ({ children, className = '', ...props }) => {
	return (
		<footer className={`${styles.footer} ${className}`} {...props}>
			{children}
		</footer>
	);
};
