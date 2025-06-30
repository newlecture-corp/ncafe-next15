"use client";
import React from "react";

export default function Loading() {
	// 2개 더미 row
	const skeletonRows = Array.from({ length: 2 });

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<div className="skeleton skeleton-title" style={{ width: 220, height: 28, marginBottom: 8 }} />
					<div className="ml:3 d:flex">
						<div className="skeleton" style={{ width: 40, height: 40, borderRadius: 20 }} />
					</div>
				</header>

				<div className="skeleton" style={{ width: 300, height: 36, margin: "16px 0" }} />

				<section className="n-frame:1">
					<header>
						<div className="skeleton" style={{ width: 120, height: 20, marginBottom: 8 }} />
						<div className="skeleton" style={{ width: 60, height: 18 }} />
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
								{skeletonRows.map((_, i) => (
									<tr className="vertical-align:middle" key={i}>
										<td>
											<div className="skeleton" style={{ width: 20, height: 18 }} />
										</td>
										<td>
											<div className="skeleton" style={{ width: 50, height: 50, borderRadius: 8 }} />
										</td>
										<td>
											<div className="skeleton" style={{ width: 80, height: 18 }} />
										</td>
										<td>
											<div className="skeleton" style={{ width: 80, height: 18 }} />
										</td>
										<td>
											<div style={{ display: 'flex', gap: 8 }}>
												<div className="skeleton" style={{ width: 60, height: 24, borderRadius: 6 }} />
												<div className="skeleton" style={{ width: 40, height: 24, borderRadius: 6 }} />
												<div className="skeleton" style={{ width: 40, height: 24, borderRadius: 6 }} />
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</section>
			<style jsx global>{`
				.skeleton {
					background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
					background-size: 200% 100%;
					animation: skeleton-loading 1.2s infinite linear;
				}
				@keyframes skeleton-loading {
					0% { background-position: 200% 0; }
					100% { background-position: -200% 0; }
				}
			`}</style>
		</main>
	);
}
