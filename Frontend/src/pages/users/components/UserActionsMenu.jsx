import { DropdownMenu } from '../../../components/UI/dropdown-menu/DropdownMenu';

export const UserActionMenu = ({ onDelete }) => {
	return <DropdownMenu items={[{ label: 'Удалить', onClick: onDelete }]} />;
};
