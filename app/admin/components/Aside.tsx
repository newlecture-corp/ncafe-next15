"use client";

import Link from "next/link";

export default function Aside() {
	return (
		<aside className="n-aside resizable1 border-right n-w:5">
			<header className={"n-active:1"}>
				<h1 className="d:none">
					<a href="">관리자 메뉴</a>
				</h1>
				<div className={`pl:3 n-section:aside-menu bd:none`}>
					<Link
						className="n-icon n-icon:dashboard n-deco"
						title="대시보드"
						href="/admin"
					>
						대시보드
					</Link>
				</div>
			</header>

			<nav className="n-section:aside-menu">
				<h1>재품관리</h1>
				<ul className="n-list:aside-menu">
					<li className="active">
						<Link
							className="n-icon n-icon:local_cafe n-deco"
							href="/admin/product/menus"
							title="메뉴관리"
						>
							메뉴관리
						</Link>
					</li>
					<li>
						<Link
							className="n-icon n-icon:garage_home n-deco"
							href="/admin/product/categories"
							title="카테고리관리"
						>
							카테고리관리
						</Link>
					</li>
				</ul>
			</nav>
			<nav className="n-section:aside-menu">
				<h1>고객관리</h1>
				<ul className="n-list:aside-menu">
					<li>
						<Link
							className="n-icon n-icon:notifications n-deco"
							href="/admin/notices"
						>
							공지관리
						</Link>
					</li>
					<li>
						<Link className="n-icon n-icon:group n-deco" href="/admin/members">
							회원관리
						</Link>
					</li>
				</ul>
			</nav>
			<nav className="n-section:aside-menu">
				<h1>통계관리</h1>
				<ul className="n-list:aside-menu">
					<li>
						<Link
							className="n-icon n-icon:cardio_load n-deco"
							href="/admin/likes"
						>
							좋아요
						</Link>
					</li>
					<li>
						<Link
							className="n-icon n-icon:bookmarks n-deco"
							href="/admin/bookmarks"
						>
							찜목록
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
