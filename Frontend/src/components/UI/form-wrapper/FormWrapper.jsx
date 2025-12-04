import styles from './FormWrapper.module.css';

// as - мой проп который позволяет динамически менять тег по мере нужды (тут он используется либо как div либо как form)
export function FormWrapper({
	as = 'form',
	children,
	onSubmit,
	className = '',
	style,
	...rest
}) {
	const Component = as;

	return (
		<Component
			className={`${styles.formWrapper} ${className}`}
			onSubmit={as === 'form' ? onSubmit : undefined}
			style={style}
			{...rest}
		>
			{children}
		</Component>
	);
}
