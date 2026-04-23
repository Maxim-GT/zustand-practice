import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartResponse } from '../types/cartTypes';

type CartState = {
	cart: CartResponse | undefined;
	hasHydrated: boolean;
}

type CartActions = {
	setCart: (cart: CartResponse) => void;
	clearCart: () => void;
	setHasHydrated: (value: boolean) => void;
};

const cartSlice: StateCreator<CartState & CartActions,
	[['zustand/persist', unknown]]
> = (set) => ({
	cart: undefined,
	hasHydrated: false,
	setCart: (cart) => set({ cart }),
	clearCart: () => set({ cart: undefined }),
	setHasHydrated: (value) => set({ hasHydrated: value }),
});

export const useCartStore = create<CartState & CartActions>()(
	persist(cartSlice, {
		name: 'cartStore',
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
	})
);

export const clearCart = () => {
	useCartStore.getState().clearCart();
};