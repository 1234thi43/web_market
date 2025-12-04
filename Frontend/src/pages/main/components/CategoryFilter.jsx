import { CATEGORIES } from '../../../constants/categories';
import { Label } from '../../../components';
import styles from '../Main.module.css';

export default function CategoryFilter({ selected, toggleCategory }) {
	return (
		<div className={styles.categories}>
			<strong>Категории</strong>

			{CATEGORIES.map((cat) => (
				<Label key={cat.value} direction="row" className={styles.categoryLabel}>
					<input
						type="checkbox"
						checked={selected.includes(cat.value)}
						onChange={() => toggleCategory(cat.value)}
					/>
					{cat.label}
				</Label>
			))}
		</div>
	);
}
