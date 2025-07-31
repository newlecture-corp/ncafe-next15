import { create } from "zustand";
import { persist } from "zustand/middleware";

// BasketItem 데이터 타입 정의
export interface BasketItem {
	id: number;
	korName: string;
	engName: string;
	price: number;
	defaultImage?: string;
	quantity: number;
}

// 장바구니 상태 타입 정의
interface BasketState {
	items: BasketItem[]; // 장바구니에 담긴 아이템 배열
	addItem: (item: Omit<BasketItem, "quantity">) => void; // 아이템 추가
	removeItem: (id: number) => void; // 아이템 제거
	clearBasket: () => void; // 장바구니 초기화
	totalAmount: () => number;
	totalPrice: () => number;
}

export const useBasketStore = create<BasketState>()(
	persist(
		(set, get) => ({
			items: [], // 초기 상태: 빈 배열
			addItem: (item) => {
				console.log("🔄 Store addItem 호출됨:", item);
				const existingItems = get().items;
				// 중복된 id가 없을 경우 추가
				if (
					!existingItems.some((existingItem) => existingItem.id === item.id)
				) {
					console.log("🔄 Store addItem - 새 아이템 추가");
					set({ items: [...existingItems, { ...item, quantity: 1 }] });
				} else {
					// 중복된 id가 있을 경우 quantity 증가
					console.log("🔄 Store addItem - 기존 아이템 수량 증가");
					set({
						items: existingItems.map((existingItem) =>
							existingItem.id === item.id
								? { ...existingItem, quantity: existingItem.quantity + 1 }
								: existingItem
						),
					});
				}
			},
			removeItem: (id) => {
				console.log("🔄 Store removeItem 호출됨:", id);
				set({
					items: get().items.filter((item) => item.id !== id),
				});
			},
			clearBasket: () => {
				console.log("🔄 Store clearBasket 호출됨");
				set({ items: [] });
			},
			totalAmount: () => {
				const amount = get().items.reduce(
					(acc, item) => acc + item.quantity,
					0
				);
				console.log("🔄 Store totalAmount 호출됨:", amount);
				return amount;
			},
			totalPrice: () => {
				const price = get().items.reduce(
					(acc, item) => acc + item.price * item.quantity,
					0
				);
				console.log("🔄 Store totalPrice 호출됨:", price);
				return price;
			},
		}),
		{
			name: "basket-storage", // localStorage에 저장될 키 이름
			// 선택적: 특정 필드만 저장하고 싶다면
			// partialize: (state) => ({ items: state.items }),
		}
	)
);
