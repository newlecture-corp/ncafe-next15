"use client";

import styles from "./Basket.module.scss";
import { useBasket } from "@/app/(anon)/hooks/useBasket";

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
	const { basket: basketData, clearBasket } = useBasket();

	return (
		<div className={basketBox}>
			<section className={basket}>
				<h1>장바구니</h1>
				<div className={total}>
					<div>금액 : {basketData.totalPrice.toLocaleString()} 원</div>
					<div className={amountBox}>
						<span className="price d:none">수량</span>
						<span className={amount}>{basketData.totalAmount}</span>
					</div>
					<div className={buttonBox}>
						<form>
							<button
								type="button"
								className={`${clearButton} n-icon n-icon:delete n-icon-color:main-1`}
								onClick={clearBasket}
							>
								장바구니 비우기
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Basket;
