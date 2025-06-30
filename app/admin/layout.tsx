"use client";

import { usePathname, useRouter } from "next/navigation";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useLayoutEffect, useState } from "react";

// 레이아웃 스크립트 초기화
import { initLayout } from "newtil-css";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	useLayoutEffect(() => {
		initLayout(); // Initialize layout styles
		console.log(initLayout); // 확인용 로그
	}, []);

	return (
		<div className="n-layout layout-color:base-1">
			<Header />

			<Aside />
			{children}

			<Footer />
		</div>
	);
}
