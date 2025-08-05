"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";
import Link from "next/link";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	["reg-form-box"]: regFormBox,
	["reg-form"]: regForm,
	["link-box"]: linkBox,
} = styles;

export default function SignupPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(event.currentTarget);

		try {
			console.log("📝 회원가입 요청 시작");

			const response = await fetch("/api/members", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "회원가입에 실패했습니다.");
			}

			console.log("✅ 회원가입 성공:", result);
			alert("회원가입이 완료되었습니다!");

			// 로그인 페이지로 이동
			router.push("/login");
		} catch (error) {
			console.error("❌ 회원가입 오류:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "알 수 없는 오류가 발생했습니다.";
			setError(errorMessage);
			alert(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main>
			<div className={regFormBox}>
				<section className={regForm}>
					<h1>NCafe 회원가입</h1>
					{error && (
						<div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
					)}
					<form onSubmit={handleSignup}>
						<div className="input-box">
							<label>이름</label>
							<input type="text" name="name" placeholder="이름" required />
						</div>
						<div className="input-box">
							<label>아이디</label>
							<input
								type="text"
								name="username"
								placeholder="아이디"
								required
							/>
						</div>
						<div className="input-box">
							<label>이메일</label>
							<input type="email" name="email" placeholder="이메일" required />
						</div>
						<div className="input-box">
							<label>전화번호</label>
							<input
								type="tel"
								name="phone"
								placeholder="전화번호 (선택사항)"
							/>
						</div>
						<div className="input-box">
							<label>비밀번호</label>
							<input
								type="password"
								name="password"
								placeholder="비밀번호"
								required
							/>
						</div>
						<div className="input-box">
							<label>비밀번호 확인</label>
							<input
								type="password"
								name="password1"
								placeholder="비밀번호 확인"
								required
							/>
						</div>
						<div className="input-box">
							<label className="d:inline-flex bd p:2">
								<input
									className="d:none"
									type="file"
									name="image"
									accept="image/*"
								/>
								<span className="file-label">프로필 사진선택</span>
							</label>
						</div>
						<div>
							<button type="submit" disabled={isLoading}>
								{isLoading ? "가입 중..." : "가입하기"}
							</button>
						</div>
						<div className={linkBox}>
							<Link href="/login">로그인하기</Link>
						</div>
					</form>
				</section>
			</div>
		</main>
	);
}
