import { Button, Input, Skeleton, message } from 'antd';
import { useCartStore, clearCart } from '../model/cartSlice';
import { useShallow } from 'zustand/shallow';
import { useState } from 'react';

export function Cart() {
	const [cart, hasHydrated] = useCartStore(useShallow(state => [state.cart, state.hasHydrated]));
	const total = cart?.products.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
	const products = cart?.products ?? [];
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState('');
	const hasProducts = products.length > 0;

	const validateAddress = (value: string) => {
		const normalized = value.trim();
		if (!normalized) {
			return 'Please enter delivery address';
		}
		if (normalized.length < 8) {
			return 'Address should be at least 8 characters long';
		}
		return '';
	};

	const handleOrder = () => {
		const error = validateAddress(address);
		setAddressError(error);
		if (error) {
			return;
		}

		message.success('Order has been placed successfully');
		setAddress('');
		setAddressError('');
		clearCart();
	};

	if (!hasHydrated) {
		return (
			<aside className="cart">
				<h1>Cart</h1>
				<div className="cartBody">
					<Skeleton active paragraph={{ rows: 6 }} />
				</div>
			</aside>
		);
	}

	return (
		<aside className="cart">
			<h1>Cart</h1>
			<div className="cartBody">
				{hasProducts ? (
					<>
						<div className="cartItems">
							{products.map((item) => (
								<div className="cartItem" key={item.id}>
									<span>{item.title}</span>
									<span>x{item.quantity}</span>
								</div>
							))}
						</div>
						<p className="cartTotal">Total: ${total}</p>
						<Input
							placeholder="Delivery address"
							value={address}
							status={addressError ? 'error' : ''}
							onChange={(e) => {
								setAddress(e.target.value);
								if (addressError) {
									setAddressError('');
								}
							}}
						/>
						{addressError ? <span className="cartError">{addressError}</span> : null}
						<Button type="primary" onClick={handleOrder}>
							Make an order
						</Button>
						<Button onClick={clearCart}>Clear the cart</Button>
					</>
				) : (
					<span className="cartEmpty">Add products</span>
				)}
			</div>
		</aside>
	);
};