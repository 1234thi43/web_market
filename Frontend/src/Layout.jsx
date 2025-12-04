import { Outlet } from 'react-router-dom';
import { Header, Footer, AppColumn } from './components/layout';

export const Layout = () => {
	return (
		<AppColumn>
			<Header />

			<Outlet />

			<Footer>© 2025 WebMarket</Footer>
		</AppColumn>
	);
};
