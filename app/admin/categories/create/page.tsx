import React from "react";
import Link from "next/link";

export default function CategoryCreatePage() {
	return (
		<main>
			<section>
				<header className="n-bar">
					<h1 className="n-heading:5">제품관리 / 카테고리관리</h1>
					<div className="ml:3 d:flex ai:center">
						<Link
							href="../categories"
							className="n-icon n-icon:arrow_back n-btn n-btn:rounded n-btn-size:small"
						>
							추가
						</Link>
					</div>
				</header>

				<section className="n-frame:rounded-shadow">
					<header>
						<h1>
							<span className="n-icon n-icon:post_add n-deco">
								카테고리등록
							</span>
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
								<span className="fs:7">공개</span>
								<input
									type="checkbox"
									name="is-public"
									className="n-toggle flex-grow:0"
								/>
							</label>
						</div>

						<div className="fl-dir:row jc:end">
							<button type="submit" className="n-btn n-btn-color:main">
								등록
							</button>
							<Link href="../categories" className="n-btn">
								취소
							</Link>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
}
