import { useEffect, useState } from 'react';
import { ROLE } from '../../constants/role';
import { useSelector } from 'react-redux';
import { selectRole } from '../../slices/authSlice';
import { request } from '../../utils/request';
import { useModal } from '../../components/common/modal/modal-context';
import { useNotification } from '../../components/common/notification/useNotification';
import Loader from '../../components/common/loader/loader';
import { UserActionMenu } from './components/UserActionsMenu';
import { Select, Button } from '../../components';

import styles from './users.module.css';

export const Users = () => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(true);

	const userRole = useSelector(selectRole);
	const { openModal } = useModal();
	const { showNotification } = useNotification(); 

	useEffect(() => {
		if (userRole !== ROLE.ADMIN) return;

		setLoading(true);
		Promise.all([
			request('http://localhost:5000/api/users', 'GET'),
			request('http://localhost:5000/api/users/roles', 'GET'),
		])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data.map((u) => ({ ...u, selectedRole: u.role })));
				setRoles(rolesRes.data);
			})
			.catch((err) => setErrorMessage(err.message))
			.finally(() => setLoading(false));
	}, [userRole]);

	const updateUserRoleOnServer = async (id, newRole) => {
		setLoading(true);
		try {
			const res = await request(`http://localhost:5000/api/users/${id}`, 'PATCH', {
				role: newRole,
			});
			if (res.error) {
				showNotification('❌ Ошибка при изменении роли: ' + res.error, 'red');
				return;
			}
			setUsers((prev) =>
				prev.map((u) =>
					u._id === id ? { ...u, role: newRole, selectedRole: newRole } : u,
				),
			);
			showNotification('✅ Роль обновлена', 'green');
		} catch {
			showNotification('❌ Сеть недоступна', 'red');
		} finally {
			setLoading(false);
		}
	};

	const handleRoleChange = (id, value) => {
		setUsers((prev) =>
			prev.map((u) => (u._id === id ? { ...u, selectedRole: Number(value) } : u)),
		);
	};

	const handleDeleteUser = (id) => {
		openModal({
			text: 'Удалить пользователя?',
			onConfirm: async () => {
				setLoading(true);
				try {
					const res = await request(
						`http://localhost:5000/api/users/${id}`,
						'DELETE',
					);
					if (res.error) {
						showNotification('❌ Ошибка при удалении: ' + res.error, 'red');
						return;
					}
					setUsers((prev) => prev.filter((u) => u._id !== id));
					showNotification('✅ Пользователь удалён', 'green');
				} catch {
					showNotification('❌ Сеть недоступна', 'red');
				} finally {
					setLoading(false);
				}
			},
		});
	};

	if (userRole !== ROLE.ADMIN) return <p role="alert">⛔ Доступ запрещён</p>;

	if (loading) return <Loader />;

	return (
		<main>
			<section className={styles.wrapper}>
				<h2 className={styles.title}>Пользователи</h2>

				{errorMessage && (
					<p role="alert" style={{ color: 'red' }}>
						{errorMessage}
					</p>
				)}

				<table className={styles.table}>
					<thead>
						<tr>
							<th scope="col">Имя</th>
							<th scope="col">Email</th>
							<th scope="col">Дата регистрации</th>
							<th scope="col">Роль</th>
							<th scope="col">Действия</th>
						</tr>
					</thead>

					<tbody>
						{users.map((user) => {
							const isChanged = user.selectedRole !== user.role;
							return (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>
										{new Date(user.createdAt).toLocaleDateString()}
									</td>

									<td>
										<Select
											value={user.selectedRole}
											onChange={(e) =>
												handleRoleChange(user._id, e.target.value)
											}
											className={styles.select}
											aria-label="Изменить роль"
										>
											{roles
												.filter((r) => r.id !== ROLE.GUEST)
												.map((r) => (
													<option key={r.id} value={r.id}>
														{r.name}
													</option>
												))}
										</Select>

										<Button
											onClick={() =>
												updateUserRoleOnServer(
													user._id,
													user.selectedRole,
												)
											}
											disabled={!isChanged}
											className={styles.button}
											aria-label="Сохранить роль"
										>
											💾
										</Button>
									</td>

									<td>
										<UserActionMenu
											onDelete={() => handleDeleteUser(user._id)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</main>
	);
};
