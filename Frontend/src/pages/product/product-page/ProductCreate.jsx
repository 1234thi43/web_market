import { FormWrapper, Select, TextArea } from '../../../components';
import { Button } from '../../../components';
import { Label } from '../../../components';
import { Input } from '../../../components';
import { CATEGORIES } from '../../../constants/categories';

export default function ProductCreate({ form, editingId, onChange, onSubmit, onCancel }) {
	return (
		<FormWrapper onSubmit={onSubmit}>
			<h3>{editingId ? 'Редактировать товар' : 'Добавить товар'}</h3>

			<Label>
				Название товара:
				<Input
					type="text"
					name="title"
					value={form.title}
					onChange={onChange}
					required
				/>
			</Label>

			<Label>
				Категория товара:
				<Select
					name="category"
					value={form.category}
					onChange={onChange}
					required
				>
					<option value="">Выберите категорию</option>
					{CATEGORIES.map((cat) => (
						<option key={cat.value} value={cat.value}>
							{cat.label}
						</option>
					))}
				</Select>
			</Label>

			<Label>
				Цена товара:
				<Input
					type="number"
					name="price"
					value={form.price}
					onChange={onChange}
					required
				/>
			</Label>

			<Label>
				Описание товара:
				<TextArea
					name="description"
					value={form.description}
					onChange={onChange}
					required
					style={{
						padding: 10,
						borderRadius: 6,
						border: '1px solid #ccc',
					}}
				/>
			</Label>

			<Label>
				Фото товара:
				<Input type="file" name="image" onChange={onChange} />
			</Label>

			<Button type="submit">{editingId ? 'Сохранить' : 'Добавить'}</Button>

			{editingId && (
				<Button type="button" onClick={onCancel}>
					Отмена
				</Button>
			)}
		</FormWrapper>
	);
}
