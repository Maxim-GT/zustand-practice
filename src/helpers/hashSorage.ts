import type { StateStorage } from 'zustand/middleware'

export const hashStorage: StateStorage = {
	getItem: (key): string => {
		const searchParams = new URLSearchParams(location.hash.slice(1))
		const storedValue = searchParams.get(key) ?? ''
		return JSON.parse(storedValue)
		// const value = sessionStorage.getItem(key);
		// return JSON.parse(String(value));
	},
	setItem: (key, newValue): void => {
		const searchParams = new URLSearchParams(location.hash.slice(1))
		searchParams.set(key, JSON.stringify(newValue))
		location.hash = searchParams.toString()
		// sessionStorage.setItem(key, JSON.stringify(newValue));
	},
	removeItem: (key): void => {
		const searchParams = new URLSearchParams(location.hash.slice(1))
		searchParams.delete(key)
		location.hash = searchParams.toString()
		// sessionStorage.removeItem(key);
	},
}