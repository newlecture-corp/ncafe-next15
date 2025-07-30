"use client";

import { useBasket } from "@/app/(anon)/hooks/useBasket";

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
	const { addToBasket } = useBasket();

	const handleAddToBasket = () => {
		addToBasket({
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
