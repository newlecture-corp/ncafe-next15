import React from "react";
import styles from "./page.module.scss";
import FilterForm from "./components/FilterForm";
import MenuList from "./components/MenuList";

const { ["menus-box"]: menusBox, menus } = styles;

export default async function MenuListPage({
	searchParams,
}: {
	searchParams: Promise<{ c?: string; q?: string; p?: string }>;
}) {
	const params = await searchParams;
	const currentPage = Number(params.p) || 1;

	// 쿼리 파라미터 구성
	const queryParams: Record<string, string> = {};
	if (params.c) queryParams.c = params.c;
	if (params.q) queryParams.q = params.q;
	queryParams.p = currentPage.toString();

	return (
		<main>
			<FilterForm />

			<div className={menusBox}>
				<section className={menus}>
					<h1 className="d:none">메뉴 목록</h1>
					<MenuList
						currentPage={currentPage}
						categoryId={params.c}
						query={params.q}
					/>
				</section>
			</div>
		</main>
	);
}
