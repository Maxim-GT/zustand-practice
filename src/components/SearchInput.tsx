import { Input } from 'antd';
import { useProductStore, setParams } from '../model/productStore';
import { useShallow } from 'zustand/shallow';
import { useUrlStorage } from '../helpers/useUrlStorage';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';

export function SearchInput() {
	const [params] = useProductStore(useShallow(state => [state.params]));
	useUrlStorage(params, setParams);
	const [searchValue, setSearchValue] = useState(params.q ?? '');

	useEffect(() => {
		setSearchValue(params.q ?? '');
	}, [params.q]);

	const debouncedSearch = useDebouncedCallback((value: string) => {
		setParams({ q: value, category: '' });
	}, 400);

	return (
		<Input
			className='searchInput'
			placeholder="Search..."
			onChange={(e) => {
				const value = e.target.value;
				setSearchValue(value);
				debouncedSearch(value.trim());
			}
			}
			value={searchValue}
		/>
	);
};



