import './App.css';
import { Cart } from './components/Cart';
import { SearchInput } from './components/SearchInput';
import { CardList } from './components/CardList';
import { CategoryList } from './components/CategoryPicker';
import { Button, Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';

function App() {
	const [isCategoriesOpen, setCategoriesOpen] = useState(false);
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const isMobile = !screens.md;

	return (
		<div className="wrapper">
			<SearchInput />
			{isMobile ? (
				<Button
					className='mobileFiltersButton'
					icon={<MenuOutlined />}
					onClick={() => setCategoriesOpen(true)}
				>
					Categories
				</Button>
			) : null}
			<div className="contentRow">
				{isMobile ? null : <CategoryList />}
				<CardList />
				<Cart />
			</div>
			<Drawer
				title="Categories"
				placement='left'
				open={isCategoriesOpen}
				onClose={() => setCategoriesOpen(false)}
				width={300}
			>
				<CategoryList onSelectCategory={() => setCategoriesOpen(false)} />
			</Drawer>
		</div>
	);
}

export default App;
