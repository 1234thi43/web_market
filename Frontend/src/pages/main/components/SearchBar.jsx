import { Input } from '../../../components';
import styles from '../Main.module.css';

export default function SearchBar({ search, setSearch, setCurrentPage }) {
	return (
		<Input
			type="text"
			className={styles.searchBar}
			placeholder="Поиск по названию..."
			value={search}
			width="1140px"
			margin="0 3px"
			onChange={(e) => {
				setSearch(e.target.value);
				setCurrentPage(1);
			}}
		/>
	);
}
