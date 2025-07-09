"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MenuCreatePage() {
	const router = useRouter();
	const [form, setForm] = useState({
		category: "",
		korName: "",
		engName: "",
		price: "",
		description: "",
		defaultImage: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: API 연동
		// await fetch("/api/admin/product/menus", { method: "POST", body: JSON.stringify(form) });

		alert("등록되었습니다!");
		router.push("/admin/product/menus/list");
	};

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
					<div className="ml:3 d:flex">
						<Link
							href="/admin/product/menus"
							className="n-icon n-icon:arrow_back n-btn n-btn:rounded n-btn-size:small"
						></Link>
					</div>
				</header>

				<section className="n-frame:1">
					<header>
						<h1>
							<span className="n-icon n-icon:post_add n-deco">메뉴등록</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left" onSubmit={handleSubmit}>
						<div>
							<label>
								<span>카테고리</span>
								<select
									name="category"
									value={form.category}
									onChange={handleChange}
								>
									<option value="">선택</option>
									<option value="1">커피</option>
									<option value="2">수제청</option>
									<option value="3">샌드위치</option>
									<option value="4">쿠키</option>
								</select>
							</label>
						</div>
						<div>
							<label>
								<span>기본 이미지</span>
								<input
									type="file"
									name="defaultImage"
									value={form.defaultImage}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>한글명</span>
								<input
									type="text"
									name="korName"
									value={form.korName}
									onChange={handleChange}
								/>
							</label>
						</div>

						<div>
							<label>
								<span>영문명</span>
								<input
									type="text"
									name="engName"
									value={form.engName}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>가격</span>
								<input
									type="text"
									name="price"
									value={form.price}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>설명</span>
								<textarea
									name="description"
									value={form.description}
									onChange={handleChange}
								></textarea>
							</label>
						</div>

						<div className="fl-dir:row jc:end">
							<button type="submit" className="n-btn n-btn-color:main">
								등록
							</button>
							<Link href="/admin/product/menus" className="n-btn">
								취소
							</Link>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
}
