"use client";

import Link from "next/link";

export default function MenuEditPage() {
	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
					<div className="ml:3 d:flex ai:center">
						<Link
							href="../../"
							className="n-icon n-icon:arrow_back icon-bd:circle"
						>
							뒤로
						</Link>
					</div>
				</header>
				<section className="n-frame:1">
					<header>
						<h1>
							<span className="n-icon n-icon:edit_square n-deco">메뉴수정</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left">
						<div>
							<label>
								<span>카테고리</span>
								<select name="categoryId">
									<option value="1">카테고리A</option>
									<option value="2">카테고리B</option>
								</select>
							</label>
						</div>
						<div>
							<label>
								<span>대표 이미지</span>
								<input type="file" name="image" accept="image/*" />
							</label>
						</div>
						<div>
							<label>
								<span>한글명</span>
								<input type="text" name="korName" value="아메리카노" readOnly />
							</label>
						</div>
						<div>
							<label>
								<span>영문명</span>
								<input type="text" name="engName" value="Americano" readOnly />
							</label>
						</div>
						<div>
							<label>
								<span>가격</span>
								<input type="number" name="price" value="3000" readOnly />
							</label>
						</div>
						<div className="fl-dir:row jc:end">
							<button type="submit" className="n-btn n-btn-color:main">
								저장
							</button>
							<Link href="../../" className="n-btn">
								취소
							</Link>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
}
