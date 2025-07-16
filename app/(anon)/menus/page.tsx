import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import FilterForm from "./components/FilterForm";

const {
	["menus-box"]: menusBox,
	menus,
	list,
	["menu-card"]: menuCard,
	["img-box"]: imgBox,
	["menu-info"]: menuInfo,
	price,
	like,
	pay,
} = styles;

export default function MenuListPage() {
	return (
		<main>
			<FilterForm />

			<div className={menusBox}>
				<section className={menus}>
					<h1 className="d:none">메뉴 목록</h1>
					<div className={list}>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/americano.png"
									alt="아메리카노"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/1">아메리카노</Link>
								</h1>
								<h2>Americano</h2>
								<div className={price}>3,000원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
						<section className={menuCard}>
							<div className={imgBox}>
								<Image
									src="/image/product/cafe_latte.png"
									alt="카페라떼"
									width={200}
									height={200}
								/>
							</div>
							<div className={menuInfo}>
								<h1>
									<Link href="/menus/2">카페라떼</Link>
								</h1>
								<h2>Cafe Latte</h2>
								<div className={price}>3,500원</div>
								<div className={like}>
									<label className="n-icon n-icon:favorite">
										좋아요
										<input
											className="d:none"
											type="checkbox"
											defaultValue={1}
										/>
									</label>
									<span>2</span>
								</div>
								<div className={pay}>
									<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
										장바구니에 담기
									</button>
									<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
										주문하기
									</button>
								</div>
							</div>
						</section>
					</div>
				</section>
			</div>
		</main>
	);
}
