import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlStorage = <T extends Record<string, string>>(
	params: T,
	setParams: (params: Partial<T>) => void
) => {
	const [queryParams, setQueryParams] = useSearchParams();
	const [isReady, setIsReady] = useState(false);

	// читаем URL
	useEffect(() => {
		const paramsFromUrl: Partial<T> = {};

		Object.keys(params).forEach((key) => {
			const value = queryParams.get(key);
			if (value !== null) {
				(paramsFromUrl as Record<string, string>)[key] = value;
			}
		});

		if (Object.keys(paramsFromUrl).length > 0) {
			setParams(paramsFromUrl);
		}

		setIsReady(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// записываем в URL
	useEffect(() => {
		if (!isReady) return;

		const newQueryParams = new URLSearchParams();
		Object.keys(params).forEach((key) => {
			if (params[key]) {
				newQueryParams.set(key, params[key]);
			}
		});

		setQueryParams(newQueryParams);
	}, [params, isReady, setQueryParams]);

	return isReady;
};
