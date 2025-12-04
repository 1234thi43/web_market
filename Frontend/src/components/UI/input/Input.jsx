import styles from './Input.module.css';

export const Input = ({ value, onChange, $error = false, width, margin, ...rest }) => {
	const inputStyle = {
		width: width || '100%',
		margin: margin || '0 auto',
	};

	return (
		<input
			className={`${styles.input} ${$error ? styles.inputError : ''}`}
			value={value}
			onChange={onChange}
			style={inputStyle}
			{...rest}
		/>
	);
};
