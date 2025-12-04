import styles from './TextArea.module.css';

export const TextArea = ({
	value,
	onChange,
	$error,
	width,
	maxLength = 600,
	...rest
}) => {
	const remaining = maxLength - (value?.length || 0);

	const handleChange = (e) => {
		if (e.target.value.length <= maxLength) {
			onChange(e);
		}
	};

	return (
		<div className={styles.textAreaWrapper} style={{ width: width || '100%' }}>
			<textarea
				className={`${styles.textArea} ${$error ? styles.textAreaError : ''}`}
				value={value}
				onChange={handleChange}
				{...rest}
			/>
			<div
				className={`${styles.counter} ${remaining < 0 ? styles.counterExceed : ''}`}
			>
				{remaining} символ{remaining === 1 ? '' : 'ов'} осталось
			</div>
		</div>
	);
};
