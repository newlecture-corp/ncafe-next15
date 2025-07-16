"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface RowDetailsProps {
	id: number;
}

interface MenuDetails {
	id: number;
	korName: string;
	engName: string;
	price: number;
	createdAt?: string;
	menuImages?: { name: string }[];
	// 필요시 추가 필드
}

const RowDetails: React.FC<RowDetailsProps> = ({ id }) => {
	const [details, setDetails] = useState<MenuDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		const fetchDetails = async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/admin/product/menus/${id}/details`, {
					cache: "no-store",
				});
				if (!res.ok) throw new Error("상세 정보를 불러오지 못했습니다.");
				const data = await res.json();
				setDetails(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "알 수 없는 오류");
			} finally {
				setLoading(false);
			}
		};
		fetchDetails();
	}, [id]);

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
									{details.menuImages && details.menuImages.length > 0 ? (
										details.menuImages.map((img, idx) => (
											<li key={img.name + idx} className="active:border">
												<Image
													className="w:4 h:auto"
													src={`https://stoadsxczvhniitglenu.supabase.co/storage/v1/object/public/image/product/${img.name}`}
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
};

export default RowDetails;
