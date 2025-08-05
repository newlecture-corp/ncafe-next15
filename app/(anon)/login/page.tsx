"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.scss";

const {
	["login-form-box"]: loginFormBox,
	["login-form"]: loginForm,
	["btn-google-login"]: btnGoogleLogin,
	["link-box"]: linkBox,
} = styles;

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		const formData = new FormData(e.currentTarget);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			const result = await signIn("credentials", {
				username,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("아이디 또는 비밀번호가 올바르지 않습니다.");
			} else {
				router.push(callbackUrl);
			}
		} catch {
			setError("로그인 중 오류가 발생했습니다.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main>
			<div className={loginFormBox}>
				<section className={loginForm}>
					<h1>NCafe Login</h1>
					{error && (
						<div
							style={{
								color: "red",
								marginBottom: "1rem",
								textAlign: "center",
								padding: "0.5rem",
								backgroundColor: "#fee",
								border: "1px solid #fcc",
								borderRadius: "4px",
							}}
						>
							{error}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="input-box">
							<label>ID</label>
							<input
								type="text"
								name="username"
								placeholder="아이디"
								required
							/>
						</div>
						<div className="input-box">
							<label>Password</label>
							<input
								type="password"
								name="password"
								placeholder="비밀번호"
								required
							/>
						</div>
						<div>
							<button type="submit" disabled={isLoading}>
								{isLoading ? "로그인 중..." : "Login"}
							</button>
						</div>
					</form>
					<div>또는</div>
					<div>
						<button
							onClick={() => signIn("google", { callbackUrl })}
							className={`${btnGoogleLogin} n-icon n-icon:google_logo n-deco`}
							style={{
								background: "none",
								border: "none",
								cursor: "pointer",
								width: "100%",
								padding: "10px",
								fontSize: "16px",
							}}
						>
							구글로 로그인
						</button>
					</div>
					<div className={linkBox}>
						<Link href="signup">회원가입</Link>
						<Link href="">비밀번호 찾기</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
