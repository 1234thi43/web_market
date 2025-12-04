import { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

export const DropdownMenu = ({ items = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleItemClick = (cb) => {
		if (typeof cb === 'function') cb();
		setIsOpen(false);
	};

	return (
		<div className={styles.wrapper} ref={wrapperRef}>
			<button
				className={styles.button}
				onClick={() => setIsOpen((prev) => !prev)}
				aria-haspopup="menu"
				aria-expanded={isOpen}
			>
				⋮
			</button>

			{isOpen && (
				<ul className={styles.menu} role="menu">
					{items.map((item, index) => (
						<li className={styles.item} key={index}>
							<button
								className={styles.itemButton}
								role="menuitem"
								onClick={() => handleItemClick(item.onClick)}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
