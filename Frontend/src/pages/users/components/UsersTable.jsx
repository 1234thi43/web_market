import { Select } from '../../../components/UI/select/Select';
import { Button } from '../../../components/UI/button/Button';
import { UserActionMenu } from './UserActionsMenu';
import styles from '../users.module.css';

export const UsersTable = ({ users, roles, onRoleChange, onSaveRole, onDelete }) => {
	return (
		<table className={styles.table}>
			<caption className={styles.caption}>Список пользователей</caption>

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
							<td>{new Date(user.createdAt).toLocaleDateString()}</td>

							<td>
								<Select
									value={user.selectedRole}
									onChange={(e) =>
										onRoleChange(user._id, e.target.value)
									}
									className={styles.select}
									aria-label="Изменить роль"
								>
									{roles.map((role) => (
										<option key={role.id} value={role.id}>
											{role.name}
										</option>
									))}
								</Select>

								<Button
									className={styles.button}
									disabled={!isChanged}
									onClick={() =>
										onSaveRole(user._id, user.selectedRole)
									}
									aria-label="Сохранить роль"
								>
									💾
								</Button>
							</td>

							<td>
								<UserActionMenu onDelete={() => onDelete(user._id)} />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
