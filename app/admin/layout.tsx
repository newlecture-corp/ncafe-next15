"use client";

import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="n-layout layout-color:base-1">
			<Header />

			<Aside />
			{children}

			<Footer />
		</div>
	);
}
