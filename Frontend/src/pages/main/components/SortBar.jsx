import { Select } from '../../../components';
import styles from '../Main.module.css';

export default function SortBar({ sortOrder, setSortOrder, setCurrentPage }) {
	return (
		<Select
			className={styles.sortBar}
			value={sortOrder}
			onChange={(e) => {
				setSortOrder(e.target.value);
				setCurrentPage(1);
			}}
		>
			<option value="none">Без сортировки</option>
			<option value="asc">Сначала дешёвые</option>
			<option value="desc">Сначала дорогие</option>
		</Select>
	);
}
