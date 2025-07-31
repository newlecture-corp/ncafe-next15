"use client";

import { useBasketStore } from "@/stores/basketStore";

interface AddToBasketButtonProps {
	menu: {
		id: number;
		korName: string;
		engName: string;
		price: number;
		defaultImage?: string;
	};
}

const AddToBasketButton = ({ menu }: AddToBasketButtonProps) => {
	const addItem = useBasketStore((state) => state.addItem);

	const handleAddToBasket = () => {
		addItem({
			id: menu.id,
			korName: menu.korName,
			engName: menu.engName,
			price: menu.price,
			defaultImage: menu.defaultImage,
		});
	};

	return (
		<button
			className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main"
			onClick={handleAddToBasket}
		>
			장바구니에 담기
		</button>
	);
};

export default AddToBasketButton;
