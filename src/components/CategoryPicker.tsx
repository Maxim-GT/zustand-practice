import { useShallow } from 'zustand/shallow';
import { useProductStore, getCategories, setParams } from '../model/productStore';
import { Menu } from 'antd';
import { useEffect } from 'react';
import { Capitalize } from '../helpers/capitalize';

type CategoryListProps = {
	onSelectCategory?: () => void;
}

export function CategoryList({ onSelectCategory }: CategoryListProps) {
	const [categoriesList, activeCategory] = useProductStore(useShallow(state => [state.categoriesList, state.params.category]));

	useEffect(() => {
		getCategories();
	}, [])

	return (
		<Menu
			className='categoryMenu'
			mode='vertical'
			selectedKeys={activeCategory ? [activeCategory] : []}
			items={categoriesList.map((category) => ({
				key: category,
				label: Capitalize(category),
				onClick: () => {
					setParams({ category, q: '' });
					onSelectCategory?.();
				}
			}))}
		>
		</Menu>
	)
}