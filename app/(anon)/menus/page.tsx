import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import FilterForm from "./components/FilterForm";
import { GetMenuListDto } from "@/backend/application/menus/dtos/GetMenuListDto";
import Pager from "../components/Pager";
import AddToBasketButton from "./components/AddToBasketButton";
import MenuLikeButton from "./components/MenuLikeButton";
import { cookies } from "next/headers";

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

export default async function MenuListPage({
	searchParams,
}: {
	searchParams: Promise<{ c?: string; q?: string; p?: string }>;
}) {
	const params = await searchParams;
	const currentPage = Number(params.p) || 1;

	// 쿠키에서 NextAuth.js JWT 토큰 읽기
	const cookieStore = await cookies();
	const nextAuthToken = cookieStore.get("next-auth.session-token")?.value;

	// API 호출 (서버 컴포넌트에서는 쿠키를 명시적으로 전달해야 함)
	const url = new URL(process.env.NEXTAUTH_URL + "/api/menus");
	if (params.c) url.searchParams.set("c", params.c);
	if (params.q) url.searchParams.set("q", params.q);
	url.searchParams.set("p", currentPage.toString());

	const res = await fetch(url.toString(), {
		headers: {
			Cookie: `next-auth.session-token=${nextAuthToken || ""}`,
		},
		cache: "no-store", // 또는 'force-cache' 등 캐시 정책 설정
	});
	const data: GetMenuListDto = await res.json();

	// 쿼리 파라미터 구성
	const queryParams: Record<string, string> = {};
	if (params.c) queryParams.c = params.c;
	if (params.q) queryParams.q = params.q;
	queryParams.p = currentPage.toString();

	console.log(data.menus);
	return (
		<main>
			<FilterForm />

			<div className={menusBox}>
				<section className={menus}>
					<h1 className="d:none">메뉴 목록</h1>
					<div className={list}>
						{data.menus.map((menu) => (
							<section key={menu.id} className={menuCard}>
								<div className={imgBox}>
									<Image
										src={
											menu.defaultImage
												? `/image/product/${menu.defaultImage}`
												: "/image/product/default.png"
										}
										alt={menu.korName || ""}
										width={200}
										height={200}
									/>
								</div>
								<div className={menuInfo}>
									<h1>
										<Link href={`/menus/${menu.id}`}>{menu.korName}</Link>
									</h1>
									<h2>{menu.engName}</h2>
									<div className={price}>{menu.price?.toLocaleString()}원</div>
									<div className={like}>
										<MenuLikeButton
											menuId={menu.id!}
											initialLikeCount={menu.likeCount || 0}
											initialIsLiked={menu.isLikedByMe || false}
										/>
									</div>
									<div className={pay}>
										<AddToBasketButton
											menu={{
												id: menu.id!,
												korName: menu.korName!,
												engName: menu.engName!,
												price: menu.price!,
												defaultImage: menu.defaultImage,
											}}
										/>
										<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
											주문하기
										</button>
									</div>
								</div>
							</section>
						))}
					</div>
					<Pager
						endPage={data.endPage}
						baseUrl="/menus"
						queryParams={queryParams}
					/>
				</section>
			</div>
		</main>
	);
}
