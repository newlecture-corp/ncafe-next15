"use client";

import React from "react";
import Link from "next/link";

const EditCategoryPage = () => {
	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 카테고리관리</h1>
					<div className="ml:3 d:flex ai:center">
						<Link href="../../" className="n-icon n-icon:arrow_back icon-bd:circle">추가</Link>
					</div>
				</header>

				<section className="n-frame:rounded-shadow">
					<header>
						<h1>
							<span className="n-icon n-icon:edit_square n-deco">카테고리수정</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left">
						<div>
							<label>
								<span>이름</span>
								<input type="text" name="name" value="카테고리A" readOnly />
							</label>
						</div>
						<div>
							<label>
								<span>공개유무</span>
								<input type="checkbox" name="isPublic" className="n-toggle flex-grow:0" />
							</label>
						</div>
						<div>
							<label>
								<span>순서</span>
								<input type="text" name="order" value="1" readOnly />
							</label>
						</div>

						<div className="fl-dir:row jc:end">
							<button type="submit" className="n-btn n-btn-color:main">저장</button>
							<Link href="../../" className="n-btn">취소</Link>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
};

export default EditCategoryPage;
