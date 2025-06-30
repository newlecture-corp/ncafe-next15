"use client";

import Link from "next/link";

export default function CategoryListPage() {
	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 카테고리관리</h1>
					<div className="ml:3 d:flex">
						<Link
							href="categories/create"
							className="n-icon n-icon:add icon-bd:circle"
						>
							추가
						</Link>
					</div>
				</header>
				<section className="n-frame">
					<header>
						<h1 className="d:none2">
							<span className="n-icon n-icon:view_list n-deco n-deco-gap:2">
								카테고리목록
							</span>
						</h1>
						<div>
							<span className="ml:1 n-heading:6">(2)</span>
						</div>
					</header>
					<div className="d:flex ai:center justify-content:end mb:2">
						<label>
							<input
								type="checkbox"
								name="isPublic"
								className="n-toggle flex-grow:0"
								readOnly
							/>
							<span className="fs:7">비공개포함</span>
						</label>
					</div>
					<table className="n-table">
						<thead>
							<tr>
								<th className="w:1">번호</th>
								<th className="w:0 md:w:2 overflow:hidden">순번</th>
								<th>이름</th>
								<th className="w:0 md:w:2 overflow:hidden">메뉴개수</th>
								<th className="w:3">공개</th>
								<th className="w:3">비고</th>
							</tr>
						</thead>
						<tbody>
							<tr className="vertical-align:middle">
								<td>1</td>
								<td className="w:0 md:w:2 overflow:hidden">1</td>
								<td className="text-align:start n-heading-truncate">
									카테고리A
								</td>
								<td className="w:0 md:w:2 overflow:hidden">3</td>
								<td>
									<span className="d:inline-flex align-items:center">
										<label>
											<span className="fs:7 d:none">공개</span>
											<input
												type="checkbox"
												name="isPublic"
												className="n-toggle flex-grow:0"
												checked
												readOnly
											/>
										</label>
									</span>
								</td>
								<td>
									<Link
										href="#"
										className="n-icon n-icon:edit_square n-icon-color:base-6"
									>
										수정
									</Link>
									<button className="n-icon n-icon:delete n-icon-color:base-6">
										삭제
									</button>
								</td>
							</tr>
							<tr className="vertical-align:middle">
								<td>2</td>
								<td className="w:0 md:w:2 overflow:hidden">2</td>
								<td className="text-align:start n-heading-truncate">
									카테고리B
								</td>
								<td className="w:0 md:w:2 overflow:hidden">1</td>
								<td>
									<span className="d:inline-flex align-items:center">
										<label>
											<span className="fs:7 d:none">공개</span>
											<input
												type="checkbox"
												name="isPublic"
												className="n-toggle flex-grow:0"
											/>
										</label>
									</span>
								</td>
								<td>
									<Link
										href="#"
										className="n-icon n-icon:edit_square n-icon-color:base-6"
									>
										수정
									</Link>
									<button className="n-icon n-icon:delete n-icon-color:base-6">
										삭제
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			</section>
		</main>
	);
}
