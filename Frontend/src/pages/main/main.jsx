import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../components/common/loader/loader';

import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortBar from './components/SortBar';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

import styles from './Main.module.css';
import { Button } from '../../components';

export default function Main() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [sortOrder, setSortOrder] = useState('none');
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 5;

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await fetch('http://localhost:5000/api/products');
				const data = await res.json();
				if (data.success) setProducts(data.products);
			} catch (err) {
				console.error('Ошибка при загрузке товаров:', err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const toggleCategory = (cat) => {
		setSelectedCategories((prev) =>
			prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
		);
		setCurrentPage(1);
	};

	const filtered = useMemo(() => {
		let list = products;

		if (search.trim()) {
			list = list.filter((p) =>
				p.title.toLowerCase().includes(search.toLowerCase()),
			);
		}

		if (selectedCategories.length > 0) {
			list = list.filter((p) => selectedCategories.includes(p.category));
		}

		if (sortOrder === 'asc') list = [...list].sort((a, b) => a.price - b.price);
		if (sortOrder === 'desc') list = [...list].sort((a, b) => b.price - a.price);

		return list;
	}, [products, search, selectedCategories, sortOrder]);

	const totalPages = Math.ceil(filtered.length / itemsPerPage);
	const currentItems = filtered.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages) setCurrentPage(page);
	};

	const renderPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

		for (let i = start; i <= end; i++) {
			pages.push(
				<Button
					key={i}
					className={`${styles.pageButton} ${
						currentPage === i ? styles.pageButtonActive : ''
					}`}
					onClick={() => goToPage(i)}
				>
					{i}
				</Button>,
			);
		}
		return pages;
	};

	if (loading) return <Loader />;

	return (
		<main className={styles.container}>
			<header>
				<h1 className={styles.title}>Каталог товаров</h1>
				<SearchBar
					search={search}
					setSearch={setSearch}
					setCurrentPage={setCurrentPage}
				/>
			</header>
			<section className={styles.content}>
				<nav aria-label="Фильтрация по категориям">
					<CategoryFilter
						selected={selectedCategories}
						toggleCategory={toggleCategory}
					/>
				</nav>
				<section className={styles.products}>
					<header>
						<SortBar
							sortOrder={sortOrder}
							setSortOrder={setSortOrder}
							setCurrentPage={setCurrentPage}
						/>
					</header>
					<ProductList items={currentItems} dispatch={dispatch} />
				</section>
			</section>
			{filtered.length > 0 && (
				<nav aria-label="Навигация по страницам">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						goToPage={goToPage}
						renderPageNumbers={renderPageNumbers}
					/>
				</nav>
			)}
		</main>
	);
}
