"use client";

import styles from "./FilterForm.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetCategoryDto } from "@/backend/application/menus/dtos/GetCategoryDto";
import { useRouter, useSearchParams } from "next/navigation";

const {
	["menu-filter-box"]: menuFilterBox,
	["search-form"]: searchForm,
	["category-menu"]: categoryMenu,
	["category-list"]: categoryList,
	active,
} = styles;

const FilterForm = () => {
	const [categories, setCategories] = useState<GetCategoryDto[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentCategoryId = searchParams.get("c");

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/categories");
				const data = await response.json();
				setCategories(data.categories || []);
			} catch (error) {
				console.error("카테고리 로딩 실패:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	// 카테고리가 선택되면 검색어 지우기
	useEffect(() => {
		if (currentCategoryId) {
			setSearchValue("");
		}
	}, [currentCategoryId]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchValue.trim()) {
			router.push(`/menus?q=${encodeURIComponent(searchValue.trim())}`);
		} else {
			// 검색어가 비어있으면 검색 쿼리 파라미터 제거
			router.push("/menus");
		}
	};

	return (
		<div className={menuFilterBox}>
			<section className={searchForm}>
				<h1 className="d:none">Menu Filter Panel</h1>
				<h2>NCafe Menu</h2>
				<form onSubmit={handleSearch}>
					<input
						type="text"
						name="q"
						placeholder="메뉴 검색"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<button type="submit" className="n-icon n-icon:search">
						검색
					</button>
				</form>
			</section>
			<section className={categoryMenu}>
				<h1>카테고리 메뉴</h1>
				<ul className={categoryList}>
					<li className={!currentCategoryId ? active : ""}>
						<Link href="/menus">전체</Link>
					</li>
					{loading ? (
						<li>로딩 중...</li>
					) : (
						categories.map((category) => (
							<li
								key={category.id}
								className={
									currentCategoryId === category.id.toString() ? active : ""
								}
							>
								<Link href={`/menus?c=${category.id}`}>{category.name}</Link>
							</li>
						))
					)}
				</ul>
			</section>
		</div>
	);
};

export default FilterForm;
