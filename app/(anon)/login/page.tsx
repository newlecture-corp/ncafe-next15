import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

const {
	["login-form-box"]: loginFormBox,
	["login-form"]: loginForm,
	["btn-google-login"]: btnGoogleLogin,
	["link-box"]: linkBox,
} = styles;

export default function LoginPage() {
	return (
		<main>
			<div className={loginFormBox}>
				<section className={loginForm}>
					<h1>Rland Login</h1>
					<form>
						<div className="input-box">
							<label>ID</label>
							<input type="text" name="username" placeholder="아이디" value="demo" readOnly />
						</div>
						<div className="input-box">
							<label>Password</label>
							<input type="password" name="password" placeholder="비밀번호" value="password" readOnly />
						</div>
						<div>
							<button type="button">Login</button>
						</div>
						<div>또는</div>
						<div>
							<Link href="/" className={`${btnGoogleLogin} n-icon n-icon:google_logo n-deco`}>
								구글로 로그인
							</Link>
						</div>
						<div className={linkBox}>
							<Link href="signup">회원가입</Link>
							<Link href="">비밀번호 찾기</Link>
						</div>
					</form>
				</section>
			</div>
		</main>
	);
}
