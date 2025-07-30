"use client";

import { useState, useEffect } from "react";

export interface BasketItem {
	id: number;
	korName: string;
	engName: string;
	price: number;
	defaultImage?: string;
	quantity: number;
}

export interface Basket {
	items: BasketItem[];
	totalAmount: number;
	totalPrice: number;
}

const BASKET_STORAGE_KEY = "ncafe-basket";

export const useBasket = () => {
	const [basket, setBasket] = useState<Basket>({
		items: [],
		totalAmount: 0,
		totalPrice: 0,
	});

	// 로컬 스토리지에서 장바구니 데이터 로드
	useEffect(() => {
		const savedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
		if (savedBasket) {
			try {
				setBasket(JSON.parse(savedBasket));
			} catch (error) {
				console.error("장바구니 데이터 로드 실패:", error);
			}
		}
	}, []);

	// 장바구니 데이터를 로컬 스토리지에 저장
	const saveBasket = (newBasket: Basket) => {
		localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(newBasket));
		setBasket(newBasket);
	};

	// 장바구니에 아이템 추가
	const addToBasket = (item: Omit<BasketItem, "quantity">) => {
		setBasket((prevBasket) => {
			const existingItem = prevBasket.items.find(
				(basketItem) => basketItem.id === item.id
			);

			let newItems: BasketItem[];
			if (existingItem) {
				// 기존 아이템이 있으면 수량 증가
				newItems = prevBasket.items.map((basketItem) =>
					basketItem.id === item.id
						? { ...basketItem, quantity: basketItem.quantity + 1 }
						: basketItem
				);
			} else {
				// 새 아이템 추가
				newItems = [...prevBasket.items, { ...item, quantity: 1 }];
			}

			const newBasket = {
				items: newItems,
				totalAmount: newItems.reduce((sum, item) => sum + item.quantity, 0),
				totalPrice: newItems.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				),
			};

			saveBasket(newBasket);
			return newBasket;
		});
	};

	// 장바구니에서 아이템 제거
	const removeFromBasket = (itemId: number) => {
		setBasket((prevBasket) => {
			const newItems = prevBasket.items.filter((item) => item.id !== itemId);
			const newBasket = {
				items: newItems,
				totalAmount: newItems.reduce((sum, item) => sum + item.quantity, 0),
				totalPrice: newItems.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				),
			};

			saveBasket(newBasket);
			return newBasket;
		});
	};

	// 장바구니 비우기
	const clearBasket = () => {
		const emptyBasket = {
			items: [],
			totalAmount: 0,
			totalPrice: 0,
		};
		saveBasket(emptyBasket);
	};

	// 아이템 수량 변경
	const updateItemQuantity = (itemId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromBasket(itemId);
			return;
		}

		setBasket((prevBasket) => {
			const newItems = prevBasket.items.map((item) =>
				item.id === itemId ? { ...item, quantity } : item
			);
			const newBasket = {
				items: newItems,
				totalAmount: newItems.reduce((sum, item) => sum + item.quantity, 0),
				totalPrice: newItems.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				),
			};

			saveBasket(newBasket);
			return newBasket;
		});
	};

	return {
		basket,
		addToBasket,
		removeFromBasket,
		clearBasket,
		updateItemQuantity,
	};
};
