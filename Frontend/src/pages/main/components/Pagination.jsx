import { Button } from '../../../components';
import styles from '../Main.module.css';

export default function Pagination({
	currentPage,
	totalPages,
	goToPage,
	renderPageNumbers,
}) {
	return (
		<div className={styles.pagination}>
			<Button onClick={() => goToPage(1)} disabled={currentPage === 1}>
				«
			</Button>

			<Button
				onClick={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				‹
			</Button>

			{renderPageNumbers()}

			<Button
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				›
			</Button>

			<Button
				onClick={() => goToPage(totalPages)}
				disabled={currentPage === totalPages}
			>
				»
			</Button>
		</div>
	);
}
