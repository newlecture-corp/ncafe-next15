"use client";

import React, { useState } from "react";
import Link from "next/link";
import MobileSlideMenu from "./MobileSlideMenu";

// MobileSlideMenu 사용 예시 컴포넌트
const MobileSlideMenuExample: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = () => setIsMenuOpen(true);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<div>
			{/* 메뉴 열기 버튼 */}
			<button
				onClick={openMenu}
				className="n-icon n-icon:menu n-icon-color:base-1"
			>
				메뉴 열기
			</button>

			{/* MobileSlideMenu 컴포넌트 사용 */}
			<MobileSlideMenu
				isOpen={isMenuOpen}
				onClose={closeMenu}
				title="메뉴"
				zIndex={1001}
			>
				<nav>
					<ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
						<li
							style={{
								margin: "16px 0",
								borderBottom: "1px solid var(--color-base-7)",
							}}
						>
							<Link
								href="/"
								onClick={closeMenu}
								className="n-icon n-icon:home n-icon-color:base-1"
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
								onClick={closeMenu}
								className="n-icon n-icon:dashboard n-icon-color:base-1"
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
							<Link
								href="/login"
								onClick={closeMenu}
								className="n-icon n-icon:login n-icon-color:base-1"
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
						</li>
					</ul>
				</nav>
			</MobileSlideMenu>
		</div>
	);
};

export default MobileSlideMenuExample;
