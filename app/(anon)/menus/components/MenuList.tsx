"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.scss";
import { GetMenuListDto } from "@/backend/application/menus/dtos/GetMenuListDto";
import Pager from "../../components/Pager";
import AddToBasketButton from "./AddToBasketButton";
import MenuLikeButton from "./MenuLikeButton";

const {
	list,
	["menu-card"]: menuCard,
	["img-box"]: imgBox,
	["menu-info"]: menuInfo,
	price,
	like,
	pay,
} = styles;

interface MenuListProps {
	currentPage: number;
	categoryId?: string;
	query?: string;
}

export default function MenuList({
	currentPage,
	categoryId,
	query,
}: MenuListProps) {
	const [data, setData] = useState<GetMenuListDto | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMenus = async () => {
			setLoading(true);
			try {
				const url = new URL("http://localhost:3000/api/menus");
				if (categoryId) url.searchParams.set("cid", categoryId);
				if (query) url.searchParams.set("q", query);
				url.searchParams.set("p", currentPage.toString());

				const res = await fetch(url.toString());
				const menuData: GetMenuListDto = await res.json();
				setData(menuData);
				console.log(menuData.menus);
			} catch (error) {
				console.error("메뉴 로딩 실패:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMenus();
	}, [currentPage, categoryId, query]);

	if (loading) {
		return <div>로딩 중...</div>;
	}

	if (!data) {
		return <div>메뉴를 불러올 수 없습니다.</div>;
	}

	// 쿼리 파라미터 구성
	const queryParams: Record<string, string> = {};
	if (categoryId) queryParams.c = categoryId;
	if (query) queryParams.q = query;
	queryParams.p = currentPage.toString();

	return (
		<>
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
								<Link href={`/menus/${menu.id}`}>
									{menu.korName} {menu.isLikedByMe}
								</Link>
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
		</>
	);
}
