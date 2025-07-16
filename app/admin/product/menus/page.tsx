"use client"; // 이 컴포넌트는 클라이언트 사이드에서 렌더링됩니다.

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./components/SearchForm";
import RowDetails from "./components/RowDetails";
import { GetMenuListDto } from "@/backend/application/admin/product/menus/dtos/GetMenuListDto";

export default function MenuListPage() {
	const [menuData, setMenuData] = useState<GetMenuListDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// 메뉴 목록 데이터 가져오기
	const fetchMenuList = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/admin/product/menus");

			if (!response.ok) {
				throw new Error("메뉴 목록을 가져오는데 실패했습니다.");
			}

			const data: GetMenuListDto = await response.json();
			setMenuData(data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
			);
		} finally {
			setLoading(false);
		}
	};

	// 컴포넌트 마운트 시 데이터 가져오기
	useEffect(() => {
		fetchMenuList();
	}, []);

	// 로딩 상태
	if (loading) {
		return (
			<main>
				<section className="d:flex flex-direction:column gap:5">
					<header className="n-list">
						<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
						<div className="ml:3 d:flex">
							<Link
								href="menus/create"
								className="n-icon n-icon:add icon-bd:circle"
							>
								추가
							</Link>
						</div>
					</header>
					<div className="d:flex justify-content:center align-items:center p:5">
						<span>로딩 중...</span>
					</div>
				</section>
			</main>
		);
	}

	// 에러 상태
	if (error) {
		return (
			<main>
				<section className="d:flex flex-direction:column gap:5">
					<header className="n-list">
						<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
						<div className="ml:3 d:flex">
							<Link
								href="menus/create"
								className="n-icon n-icon:add icon-bd:circle"
							>
								추가
							</Link>
						</div>
					</header>
					<div className="d:flex justify-content:center align-items:center p:5">
						<span className="text-color:red">오류: {error}</span>
					</div>
				</section>
			</main>
		);
	}

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
					<div className="ml:3 d:flex">
						<Link
							href="menus/create"
							className="n-icon n-icon:add icon-bd:circle"
						>
							추가
						</Link>
					</div>
				</header>

				<SearchForm />

				<section className="n-frame:1">
					<header>
						<h1 className="d:none2">
							<span className="n-icon n-icon:view_list n-deco n-deco-gap:2">
								메뉴목록
							</span>
						</h1>
						<div>
							<span className="ml:1 n-heading:6">
								({menuData?.menus.length || 0})
							</span>
						</div>
					</header>
					<div>
						<table className="n-table n-table:expandable">
							<thead>
								<tr>
									<th className="w:1">번호</th>
									<th className="w:0 md:w:2 overflow:hidden">사진</th>
									<th>한글명</th>
									<th className="w:0 md:w:2 n-heading-truncate">영문명</th>
									<th className="w:3">비고</th>
								</tr>
							</thead>
							<tbody>
								{menuData?.menus.map((menu, index) => (
									<React.Fragment key={menu.id}>
										<tr className="vertical-align:middle">
											<td>{index + 1}</td>
											<td className="w:0 md:w:2 overflow:hidden">
												<Image
													src={
														menu.defaultImage
															? `https://stoadsxczvhniitglenu.supabase.co/storage/v1/object/public/image/product/${menu.defaultImage}`
															: "https://stoadsxczvhniitglenu.supabase.co/storage/v1/object/public/image/product/default.png"
													}
													alt={menu.korName}
													width={50}
													height={50}
													unoptimized
												/>
											</td>
											<td className="text-align:start n-heading-truncate">
												<Link href={`menus/${menu.id}`}>{menu.korName}</Link>
											</td>
											<td className="w:0 md:w:2 n-heading-truncate">
												{menu.engName}
											</td>
											<td>
												<span className="d:inline-flex align-items:center">
													<label className="n-icon n-icon:arrow_drop_down n-icon-size:2 n-btn mr:2">
														<input
															type="checkbox"
															className="d:none n-row-expander"
														/>
														<span>상세보기</span>
													</label>
													<Link
														className="n-icon n-icon:edit_square n-icon-color:base-6"
														href={`menus/${menu.id}/edit`}
													>
														수정
													</Link>
													<button className="n-icon n-icon:delete n-icon-color:base-6">
														삭제
													</button>
												</span>
											</td>
										</tr>
										<RowDetails id={menu.id} />
									</React.Fragment>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</section>
		</main>
	);
}
