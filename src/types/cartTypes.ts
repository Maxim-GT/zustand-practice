export type CartProduct = {
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountPercentage: number
	discountedPrice: number
	thumbnail: string
}

export type CartResponse = {
	id: number
	userId: number
	products: CartProduct[]
	total: number
	discountedTotal: number
	totalProducts: number
	totalQuantity: number
}

export type AddToCartPayload = {
	userId: number
	products: {
		id: number
		quantity: number
	}[]
}
