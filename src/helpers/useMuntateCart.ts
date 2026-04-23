import axios from "axios";
import type { AddToCartPayload, CartResponse } from "../types/cartTypes";
import { useMutation } from "@tanstack/react-query";
import { CART_URL } from "../api/api";
import { useCartStore } from "../model/cartSlice";
import { message } from "antd";
import {produce} from "immer";

export const useMutateCart = () => {
    const cart = useCartStore((state) => state.cart);
	return useMutation({
		mutationFn: (payload: AddToCartPayload): Promise<CartResponse> => {
            const newProduct = payload.products[0];
            
            if (cart) {
                // Преобразуем в формат API для работы с immer
                const productsForApi: { id: number; quantity: number }[] = 
                    cart.products.map(p => ({ id: p.id, quantity: p.quantity }));
                
                const updatedProducts = produce(productsForApi, (draft) => {
                    const existingProduct = draft.find(p => p.id === newProduct.id);
                    if (existingProduct) {
                        existingProduct.quantity += newProduct.quantity;
                    } else {
                        draft.push({ id: newProduct.id, quantity: newProduct.quantity });
                    }
                });
                
                // if (existingProduct) {
                //     // Обновляем quantity существующего товара
                //     updatedProducts = cart.products.map(product => 
                //         product.id === newProduct.id
                //             ? { id: product.id, quantity: product.quantity + newProduct.quantity }
                //             : { id: product.id, quantity: product.quantity }
                //     );
                // } else {
                //     // Добавляем новый товар
                //     updatedProducts = [
                //         ...cart.products.map(p => ({ id: p.id, quantity: p.quantity })),
                //         newProduct
                //     ];
                // }
                
                // Всегда используем POST /carts/add, так как DummyJSON не сохраняет корзины
                // и PUT на несуществующую корзину вернет 404
                return axios.post<CartResponse>(CART_URL, {
                    userId: payload.userId,
                    products: updatedProducts
                }).then(res => res.data);
            } else {
                return axios.post<CartResponse>(CART_URL, payload).then(res => res.data);
            }
        },
		onSuccess: (data) => {
			useCartStore.getState().setCart(data);
			message.success('The product has been added to the cart');
		},
		onError: (error) => {
			console.error(error);
			message.error('Failed to add product to cart');
		}
	});
};