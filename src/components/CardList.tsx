import { useShallow } from 'zustand/shallow';
import { useProductStore } from '../model/productStore';
import { ProductCard } from './ProductCard';
import { useCustomQuery } from '../helpers/useCustomQuery';
import { Empty, Skeleton } from 'antd';

export function CardList() {
	const [productList, params] = useProductStore(useShallow(state => [state.productList, state.params]));
	const { isPending, isFetching } = useCustomQuery(params);

	if (isFetching || isPending ) {
		return (
			<div className="cardsContainer">
				{Array.from({ length: 8 }).map((_, index) => (
					<div className="productCardSkeleton" key={index}>
						<Skeleton.Image active style={{ width: '100%', height: 180 }} />
						<Skeleton active title={{ width: '80%' }} paragraph={{ rows: 3 }} />
					</div>
				))}
			</div>
		)
	};

	if (!productList?.length) {
		return (
			<div className="cardsContainer">
				<div className="emptyState">
					<Empty
						description="Nothing found. Try another search or category."
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="cardsContainer">
		{productList?.map((product) => (
			<ProductCard product={product} key={product.id} />
		))}
	</div>
	)
}

