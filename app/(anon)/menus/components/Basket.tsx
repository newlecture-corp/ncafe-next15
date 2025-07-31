"use client";

import styles from "./Basket.module.scss";
import { useBasketStore } from "@/stores/basketStore";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	["basket-box"]: basketBox,
	basket,
	total,
	["amount-box"]: amountBox,
	amount,
	["button-box"]: buttonBox,
	["clear-button"]: clearButton,
} = styles;

function Basket() {
	// Zustand store를 selector로 각각 접근
	const items = useBasketStore((state) => state.items);
	const clearBasket = useBasketStore((state) => state.clearBasket);

	// 컴포넌트 내에서 직접 계산
	const totalPrice = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	const totalAmount = items.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<div className={basketBox}>
			<section className={basket}>
				<h1>장바구니</h1>
				<div className={total}>
					<div>금액 : {totalPrice.toLocaleString()} 원</div>
					<div className={amountBox}>
						<span className="price d:none">수량</span>
						<span className={amount}>{totalAmount}</span>
					</div>
					<div className={buttonBox}>
						<button
							type="button"
							className={`${clearButton} n-icon n-icon:delete n-icon-color:main-1 color:base-1`}
							onClick={clearBasket}
						>
							장바구니 비우기
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Basket;
