"use client";

import React, { useEffect, useState, memo } from "react";
import Image from "next/image";

interface RowDetailsProps {
	id: number;
	isVisible: boolean; // 상세보기가 보이는지 여부
}

interface MenuDetails {
	id: number;
	korName: string;
	engName: string;
	price: number;
	createdAt?: string;
	images?: { name: string; isDefault: boolean }[];
	// 필요시 추가 필드
}

// 메뉴 상세 데이터를 캐시하기 위한 Map
const menuDetailsCache = new Map<number, MenuDetails>();

const RowDetails: React.FC<RowDetailsProps> = memo(({ id, isVisible }) => {
	const [details, setDetails] = useState<MenuDetails | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// 상세보기가 보이고, 아직 데이터가 없다면 데이터 로드
		if (isVisible && !details && !loading) {
			// 캐시에서 먼저 확인
			if (menuDetailsCache.has(id)) {
				console.log(`캐시에서 메뉴 ${id} 데이터 로드`);
				setDetails(menuDetailsCache.get(id)!);
				return;
			}

			const fetchDetails = async () => {
				try {
					setLoading(true);
					const res = await fetch(`/api/admin/product/menus/${id}/details`, {
						cache: "no-store",
					});
					if (!res.ok) throw new Error("상세 정보를 불러오지 못했습니다.");
					const data = await res.json();
					console.log("RowDetails API 응답:", data);
					console.log("images:", data.images);

					// 캐시에 저장
					menuDetailsCache.set(id, data);
					setDetails(data);
				} catch (err) {
					setError(err instanceof Error ? err.message : "알 수 없는 오류");
				} finally {
					setLoading(false);
				}
			};
			fetchDetails();
		}
	}, [id, isVisible, details, loading]);

	// 상세보기가 보이지 않으면 아무것도 렌더링하지 않음
	if (!isVisible) return null;

	if (loading)
		return (
			<tr className="bg-color:base-4a">
				<td colSpan={5}>상세정보 로딩 중...</td>
			</tr>
		);
	if (error)
		return (
			<tr className="bg-color:base-4a">
				<td colSpan={5} style={{ color: "red" }}>
					상세정보 오류: {error}
				</td>
			</tr>
		);
	if (!details) return null;

	return (
		<tr className="bg-color:base-4a">
			<td colSpan={5}>
				<section>
					<h1 className="d:none">상세내용</h1>
					<dl className="n-list:definition-list-ruled">
						<div>
							<dt>영문명</dt>
							<dd className="ml:1">{details.engName}</dd>
						</div>
						<div>
							<dt>사진</dt>
							<dd className="ml:1">
								<ul className="n-bar flex-wrap:wrap">
									{details.images && details.images.length > 0 ? (
										details.images.map((img, idx) => (
											<li key={img.name + idx} className="active:border">
												<Image
													className="w:4 h:auto"
													src={`/image/product/${img.name}`}
													alt={img.name}
													width={100}
													height={100}
													unoptimized
												/>
											</li>
										))
									) : (
										<li>
											<span>이미지 없음</span>
										</li>
									)}
								</ul>
							</dd>
						</div>
						<div>
							<dt>가격</dt>
							<dd className="ml:1">{details.price.toLocaleString()}원</dd>
						</div>
						<div>
							<dt>등록일자</dt>
							<dd className="ml:1">
								{details.createdAt
									? new Date(details.createdAt).toLocaleString()
									: "-"}
							</dd>
						</div>
					</dl>
				</section>
			</td>
		</tr>
	);
});

RowDetails.displayName = "RowDetails";

export default RowDetails;
