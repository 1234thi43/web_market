import styles from './Modal.module.css';

export function Modal({ isOpen, text, onConfirm, onCancel }) {
	if (!isOpen) return null;

	return (
		<dialog className={styles.modal} open>
			<div className={styles.overlay} onClick={onCancel}></div>

			<section className={styles.box} role="alertdialog" aria-modal="true">
				<header>
					<h3>{text}</h3>
				</header>

				<footer className={styles.buttons}>
					<button onClick={onConfirm}>Да</button>
					<button onClick={onCancel}>Отмена</button>
				</footer>
			</section>
		</dialog>
	);
}
