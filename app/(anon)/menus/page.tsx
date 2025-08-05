// app/menus/page.tsx
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import FilterForm from "./components/FilterForm";
import { GetMenuListDto } from "@/backend/application/menus/dtos/GetMenuListDto";
import Pager from "../components/Pager";
import AddToBasketButton from "./components/AddToBasketButton";
import MenuLikeButton from "./components/MenuLikeButton";
import { cookies } from "next/headers";
import Loading from "./query-loading";

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

// 새로운 컴포넌트: 실제 메뉴 목록을 가져와 렌더링하는 서버 컴포넌트
// 이 컴포넌트만 비동기 로직을 처리하고, Suspense로 감싸져 로딩 상태를 제어합니다.
async function MenuListWithData({
	searchParams,
}: {
	searchParams: Promise<{ c?: string; q?: string; p?: string }>;
}) {
	const params = await searchParams;
	const currentPage = Number(params.p) || 1;

	// 쿠키에서 NextAuth.js JWT 토큰 읽기
	const cookieStore = await cookies();
	const nextAuthToken = cookieStore.get("next-auth.session-token")?.value;

	// API 호출
	const url = new URL(`${process.env.NEXTAUTH_URL}/api/menus`);
	if (params.c) url.searchParams.set("c", params.c);
	if (params.q) url.searchParams.set("q", params.q);
	url.searchParams.set("p", currentPage.toString());

	// 데이터를 가져오기 위한 API 호출
	// 쿠키는 서버에서 직접 전달해야 합니다.
	const res = await fetch(url.toString(), {
		headers: {
			Cookie: `next-auth.session-token=${nextAuthToken || ""}`,
		},
		cache: "no-store", // 또는 'force-cache' 등 캐시 정책 설정
	});

	// 에러 핸들링 추가
	if (!res.ok) {
		throw new Error("Failed to fetch menu list");
	}

	const data: GetMenuListDto = await res.json();
	console.log(data.menus);

	const queryParams: Record<string, string> = {};
	if (params.c) queryParams.c = params.c;
	if (params.q) queryParams.q = params.q;
	queryParams.p = currentPage.toString();

	return (
		<section className={menus}>
			<h1 className="d:none">메뉴 목록</h1>
			<div className={list}>
				{data.menus.map((menu) => (
					<section key={menu.id} className={menuCard}>
						{/* 기존 메뉴 카드 렌더링 로직 */}
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
	);
}

// `page.tsx` 컴포넌트
export default async function MenuListPage({
	searchParams,
}: {
	searchParams: Promise<{ c?: string; q?: string; p?: string }>;
}) {
	// 쿼리스트링 변경에 따라 key가 변경되어 Suspense가 리셋되도록 함
	const params = await searchParams;
	const queryKey = JSON.stringify(params);

	return (
		<main>
			<FilterForm />
			<div className={menusBox}>
				<Suspense key={queryKey} fallback={<Loading />}>
					{/* 데이터 로딩이 필요한 컴포넌트를 Suspense로 감쌉니다. */}
					{/* searchParams를 props로 전달하여 하위 컴포넌트에서 사용합니다. */}
					<MenuListWithData searchParams={searchParams} />
				</Suspense>
			</div>
		</main>
	);
}
