"use client"; // 이 컴포넌트는 클라이언트 사이드에서 렌더링됩니다.

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./components/SearchForm";
import RowDetails from "./components/RowDetails";

export default function MenuListPage() {
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
							<span className="ml:1 n-heading:6">(2)</span>
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
								<tr className="vertical-align:middle">
									<td>1</td>
									<td className="w:0 md:w:2 overflow:hidden">
										<Image
											src="/image/product/americano.png"
											alt="아메리카노"
											width={50}
											height={50}
										/>
									</td>
									<td className="text-align:start n-heading-truncate">
										<Link href="menus/1">아메리카노</Link>
									</td>
									<td className="w:0 md:w:2 n-heading-truncate">Americano</td>
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
												href="menus/1/edit"
											>
												수정
											</Link>
											<button className="n-icon n-icon:delete n-icon-color:base-6">
												삭제
											</button>
										</span>
									</td>
								</tr>
								<RowDetails />
								<RowDetails />
								<tr className="vertical-align:middle">
									<td>2</td>
									<td className="w:0 md:w:2 overflow:hidden">
										<Image
											src="/image/product/cafe_latte.png"
											alt="카페라떼"
											width={50}
											height={50}
										/>
									</td>
									<td className="text-align:start n-heading-truncate">
										<Link href="menus/2">카페라떼</Link>
									</td>
									<td className="w:0 md:w:2 n-heading-truncate">Cafe Latte</td>
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
												href="menus/2/edit"
											>
												수정
											</Link>
											<button className="n-icon n-icon:delete n-icon-color:base-6">
												삭제
											</button>
										</span>
									</td>
								</tr>
								<RowDetails />
								<RowDetails />
							</tbody>
						</table>
					</div>
				</section>
			</section>
		</main>
	);
}
