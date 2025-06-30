import styles from "./page.module.scss";
import formStyles from "./components/FilterForm.module.scss";
import Image from "next/image";

const {
	["menus-box"]: menusBox,
	menus,
	list,
	["menu-card"]: menuCard,
	["img-box"]: imgBox,
	["menu-info"]: menuInfo,
	price,
	like,
	pay
} = styles;

const {
	["menu-filter-box"]: menuFilterBox,
	["search-form"]: searchForm,
	["category-menu"]: categoryMenu,
	["category-list"]: categoryList
} = formStyles;

export default function Loading() {
	const menuList = [
		{
			id: 1,
			korName: "로딩 중...",
		},
		{
			id: 2,
			korName: "로딩 중...",
		},
		{
			id: 3,
			korName: "로딩 중...",
		},
	];

	return (
		<main>
			<div className={menuFilterBox}>
				<section className={searchForm}>
					<h1 className="d:none">Menu Filter Panel</h1>
					<h2>NCafe Menu</h2>
					<form action="/menus" method="get">
						<input type="text" placeholder="검색어를 입력하세요" name="s" />
						<button type="submit" className="n-icon n-icon:search">
							검색
						</button>
					</form>
				</section>
				<section className={categoryMenu}>
					<h1>카테고리 메뉴</h1>
					<ul className={categoryList}>
						<li>
							<span>전체</span>
						</li>
						<li>
							<span>로딩 중...</span>
						</li>
					</ul>
				</section>
			</div>
			<div className={menusBox}>
				<section className={menus}>
					<h1 className="d:none">메뉴 목록</h1>
					<div className={list}>
						{menuList.map((m) => (
							<section key={m.id} className={menuCard}>
								<div className={imgBox}>
									<Image
										src="/image/product/loading.gif"
										alt="이미지"
										width={200}
										height={200}
									/>
								</div>
								<div className={menuInfo}>
									<h1>
										<a href={`menus/${m.id}`}>{m.korName}</a>
									</h1>
									<h2>loading...</h2>
									<div className={price}> loading... 원</div>
									<div className={like}>
										<label className="n-icon n-icon:favorite">
											좋아요
											<input
												className="d:none"
												type="checkbox"
												defaultValue={1}
											/>
										</label>
										<span>loading... </span>
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
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
