import { Card, Button, Tag, Rate } from 'antd'
import CardMeta from 'antd/es/card/CardMeta'
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { ProductType } from '../types/productTypes';
import { useMutateCart } from '../helpers/useMuntateCart';

export function ProductCard({ product }: { product: ProductType }) {
	const { mutate, isPending } = useMutateCart();

	return (
		<Card
			key={product.id}
			cover={<img src={product.thumbnail} alt={product.title} />}
			actions={[
				<Button
					icon={<ShoppingCartOutlined />}
					loading={isPending}
					onClick={() =>
						mutate({
							userId: 1,
							products: [{ id: product.id, quantity: 1 }],
						})
					}
				>
					{product.price}
				</Button>,
			]}
		>
			<CardMeta title={product.title} description={product.description} />
			<Tag color="purple" style={{ marginTop: 12 }}>
				{product.category}
			</Tag>
			<Rate defaultValue={product.rating} disabled allowHalf />
		</Card>
	)
};