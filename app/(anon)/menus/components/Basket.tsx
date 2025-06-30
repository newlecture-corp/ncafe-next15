// import { cookies } from "next/headers";
import styles from "./Basket.module.scss";
// import { clearBasket } from "../actions/clearBasket";

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

// 서버에서 장바구니 데이터를 가져오는 함수
// const getBasketData = async () => {
// 	const cookieStore = await cookies();
// 	const basketCookie = cookieStore.get("basket");
// 	const basket = basketCookie
// 		? JSON.parse(basketCookie.value)
// 		: { items: [], totalAmount: 0, totalPrice: 0 };
// 	return basket;
// };

function Basket() {
	return (
		<div className={basketBox}>
			<section className={basket}>
				<h1>장바구니</h1>
				<div className={total}>
					<div>금액 : 13,000 원</div>
					<div className={amountBox}>
						<span className="price d:none">수량</span>
						<span className={amount}>2</span>
					</div>
					<div className={buttonBox}>
						<form>
							<button
								type="button"
								className={`${clearButton} n-icon n-icon:delete n-icon-color:main-1`}
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
