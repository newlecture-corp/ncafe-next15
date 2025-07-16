"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface MenuDetail {
	id: number;
	korName: string;
	engName: string;
	price: number;
	categoryId: number;
	description?: string | null;
	createdAt?: string;
	// 필요시 추가 필드
}

export default function MenuDetailPage() {
	const params = useParams();
	const id = params?.id;
	const [menu, setMenu] = useState<MenuDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		const fetchMenu = async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/admin/product/menus/${id}`);
				if (!res.ok) throw new Error("메뉴 정보를 불러오지 못했습니다.");
				const data = await res.json();
				setMenu(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "알 수 없는 오류");
			} finally {
				setLoading(false);
			}
		};
		fetchMenu();
	}, [id]);

	if (loading)
		return (
			<main>
				<section className="n-frame:1">
					<h1>메뉴 상세</h1>
					<div>로딩 중...</div>
				</section>
			</main>
		);
	if (error)
		return (
			<main>
				<section className="n-frame:1">
					<h1>메뉴 상세</h1>
					<div style={{ color: "red" }}>오류: {error}</div>
				</section>
			</main>
		);
	if (!menu)
		return (
			<main>
				<section className="n-frame:1">
					<h1>메뉴 상세</h1>
					<div>데이터가 없습니다.</div>
				</section>
			</main>
		);

	return (
		<main>
			<section className="n-frame:1">
				<h1>메뉴 상세</h1>
				<div>
					<p>메뉴명: {menu.korName}</p>
					<p>영문명: {menu.engName}</p>
					<p>가격: {menu.price}원</p>
					<p>카테고리ID: {menu.categoryId}</p>
					{menu.description && <p>설명: {menu.description}</p>}
				</div>
			</section>
		</main>
	);
}
