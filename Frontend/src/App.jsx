import { Routes, Route } from 'react-router-dom';
import { AuthAutoLoader } from './utils/auth-auto-loader';

import { Layout } from './Layout';
import {
	Main,
	Register,
	Login,
	Users,
	ProductPage,
	ProductDetails,
	NotFound,
	CartPage,
} from './pages';

function App() {
	return (
		<>
			<AuthAutoLoader />

			<Routes>
				<Route>
					<Route path="/" element={<Layout />}>
						<Route index element={<Main />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="users" element={<Users />} />
						<Route path="product" element={<ProductPage />} />
						<Route path="product/:id" element={<ProductDetails />} />
						<Route path="cart" element={<CartPage />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
