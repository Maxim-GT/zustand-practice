import { useQuery } from '@tanstack/react-query'
import { getProducts, setData } from '../model/productStore';
import { useEffect } from 'react';
import type { GetProductListReqParams } from '../types/productTypes';

export const useCustomQuery = (params: GetProductListReqParams) => {
	const { data, status, isPending, isFetching, isError } = useQuery({
		queryKey: ['coffeeList', params],
		queryFn: ({ signal }) => getProducts(params, signal), // Передаем params и signal из React Query
	});

	useEffect(() => {
		if (data) { // Проверка на undefined, чтобы не очищать список
			setData(data);
		}
	}, [data, status])

	return { data, status, isPending, isFetching, isError };
}