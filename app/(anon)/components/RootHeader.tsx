"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./RootHeader.module.scss";
import MobileSlideMenu from "./MobileSlideMenu";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	header,
	["top-mobile-menu"]: topMobileMenu,
	["top-menu"]: topMenu,
} = styles;

const RootHeader = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	console.log("=== header test session print===");
	console.log("RootHeader Session:", session);
	console.log("RootHeader Status:", status);
	console.log("=== header test session print===");

	const handleSignOut = async (e: React.MouseEvent) => {
		e.preventDefault();
		await signOut({ redirect: false });
		router.push("/");
		setIsMobileMenuOpen(false); // 메뉴 닫기
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<header className={`${header}`}>
				<h1>
					<Link href="/">NCafe</Link>
				</h1>
				<div className={topMobileMenu}>
					<button
						className="n-icon n-icon:menu n-icon-color:base-1 color:base-1"
						onClick={toggleMobileMenu}
						aria-label="메뉴 열기"
					>
						메뉴
					</button>
				</div>
				<div className={topMenu}>
					<nav>
						<h1 className="d:none">상단메뉴</h1>
						<ul>
							<li>
								<Link
									className="n-icon n-icon:home n-icon-color:base-1"
									href="/"
								>
									홈
								</Link>
							</li>
							<li>
								<Link
									className="n-icon n-icon:dashboard n-icon-color:base-1"
									href="/admin"
								>
									대시보드
								</Link>
							</li>
							<li>
								{session ? (
									<Link
										className="n-icon n-icon:logout n-icon-color:base-1"
										href="#"
										onClick={handleSignOut}
									>
										로그아웃
									</Link>
								) : (
									<Link
										className="n-icon n-icon:login n-icon-color:base-1"
										href="/login"
									>
										로그인
									</Link>
								)}
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* MobileSlideMenu 컴포넌트 사용 */}
			<MobileSlideMenu
				isOpen={isMobileMenuOpen}
				onClose={closeMobileMenu}
				title="메뉴"
				zIndex={1001}
			>
				<nav>
					<h1 className="d:none">모바일 메뉴</h1>
					<ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
						<li
							style={{
								margin: "16px 0",
								borderBottom: "1px solid var(--color-base-7)",
							}}
						>
							<Link
								href="/"
								onClick={closeMobileMenu}
								className="n-icon n-icon:home n-icon-color:base-1 n-deco"
								style={{
									color: "var(--color-base-1)",
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									gap: "12px",
									padding: "16px 0",
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								홈
							</Link>
						</li>
						<li
							style={{
								margin: "16px 0",
								borderBottom: "1px solid var(--color-base-7)",
							}}
						>
							<Link
								href="/admin"
								onClick={closeMobileMenu}
								className="n-icon n-icon:dashboard n-icon-color:base-1 n-deco"
								style={{
									color: "var(--color-base-1)",
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									gap: "12px",
									padding: "16px 0",
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								대시보드
							</Link>
						</li>
						<li style={{ margin: "16px 0" }}>
							{session ? (
								<Link
									href="#"
									onClick={handleSignOut}
									className="n-icon n-icon:logout n-icon-color:base-1 n-deco"
									style={{
										color: "var(--color-base-1)",
										textDecoration: "none",
										display: "flex",
										alignItems: "center",
										gap: "12px",
										padding: "16px 0",
										fontSize: "16px",
										fontWeight: "500",
									}}
								>
									로그아웃
								</Link>
							) : (
								<Link
									href="/login"
									onClick={closeMobileMenu}
									className="n-icon n-icon:login n-icon-color:base-1 n-deco"
									style={{
										color: "var(--color-base-1)",
										textDecoration: "none",
										display: "flex",
										alignItems: "center",
										gap: "12px",
										padding: "16px 0",
										fontSize: "16px",
										fontWeight: "500",
									}}
								>
									로그인
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</MobileSlideMenu>
		</>
	);
};

export default RootHeader;
