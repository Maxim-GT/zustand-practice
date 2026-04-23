export type ProductType = {
	id: number
	title: string
	description: string
	category: string
	price: number
	rating: number
	thumbnail: string
}

export type ApiProductsResponse = {
	products: ProductType[]
	total: number
	skip: number
	limit: number
}

export type GetProductListReqParams = {
	q?: string;
	category?: string;
}


export type ApiCategoriesResponse = string[];



