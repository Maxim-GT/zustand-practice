import { create, type StateCreator } from 'zustand';
import type { ApiProductsResponse, GetProductListReqParams, ProductType } from '../types/productTypes';
import { devtools } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';

const BASE_URL = "https://dummyjson.com/products";

type ProductState = {
	productList: ProductType[];
	categoriesList: string[];
	isCategoriesLoading: boolean;
	params: GetProductListReqParams;
};

type ProductActions = {
	setParams: (params: Partial<GetProductListReqParams>) => void;
	getProducts: (requestParams?: GetProductListReqParams, signal?: AbortSignal) => Promise<ProductType[]>;
	getCategories: () => Promise<void>;
};

const productSlice: StateCreator<ProductActions & ProductState, [['zustand/devtools', never]]> = (set, get) => ({
	productList: [],
	categoriesList: [],
	isCategoriesLoading: false,
	params: {
		q: '',
		category: undefined,
	},

	// Изменение фильтров
	setParams: (newParams) => {
		set(state => ({
			params: { ...state.params, ...newParams }
		}));
	},

	// Универсальный метод загрузки продуктов с учетом фильтров
	getProducts: async (requestParams?: GetProductListReqParams, signal?: AbortSignal) => {
		// Используем переданные params или берем из store (для обратной совместимости)
		const params = requestParams || get().params;

		let url = BASE_URL;
		let queryParams: Record<string, string> = {};

		if (params.category) {
			// Загрузка по категории
			url = `${BASE_URL}/category/${params.category}`;
		} else if (params.q?.trim()) {
			// Поиск по q
			url = `${BASE_URL}/search`;
			queryParams = { q: params.q };
		}

		const { data } = await axios.get<ApiProductsResponse>(url, {
			params: queryParams,
			signal: signal, // Используем signal из React Query
		});

		set({ productList: data.products });
		return data.products;

	},

	// Загрузка категорий
	getCategories: async () => {
		try {
			set({ isCategoriesLoading: true });
			const { data } = await axios.get<string[]>('https://dummyjson.com/products/category-list');
			set({ categoriesList: data, isCategoriesLoading: false });
		} catch (e) {
			set({ isCategoriesLoading: false });
			if (e instanceof AxiosError) console.error(e);
		}
	},
});

export const useProductStore = create<ProductActions & ProductState>()(devtools(productSlice));

// Утилиты для вызова из компонентов без useStore
export const setParams = (params: GetProductListReqParams) =>
	useProductStore.getState().setParams(params);

export const getProducts = (requestParams?: GetProductListReqParams, signal?: AbortSignal) =>
	useProductStore.getState().getProducts(requestParams, signal);

export const getCategories = () =>
	useProductStore.getState().getCategories();

export const setData = (data?: ProductType[]) => useProductStore.setState({ productList: data })