"use client";

"use client";

import React from "react";
import Image from "next/image";
import Image from "next/image";

const RowDetails: React.FC = () => {
	return (
		<tr className="bg-color:base-4a">
			<td colSpan={5}>
				<section>
					<h1 className="d:none">상세내용</h1>
					<dl className="n-list:definition-list-ruled">
						<div>
							<dt>영문명</dt>
							<dd className="ml:1">Americano</dd>
						</div>
						<div>
							<dt>사진</dt>
							<dd className="ml:1">
								<ul className="n-bar flex-wrap:wrap">
									<li className="active:border">
										<Image
											className="w:4 h:auto"
											src="/image/product/americano.png"
											alt="Americano"
											width={100}
											height={100}
										/>
									</li>
								</ul>
							</dd>
						</div>
						<div>
							<dt>가격</dt>
							<dd className="ml:1">3,000원</dd>
						</div>
						<div>
							<dt>등록일자</dt>
							<dd className="ml:1">2024-06-01 12:00:00</dd>
						</div>
					</dl>
				</section>
			</td>
		</tr>
	);
};

export default RowDetails;
