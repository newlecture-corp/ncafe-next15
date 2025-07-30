"use client";

import Link from "next/link";
import styles from "./Pager.module.scss";

const { pager, ["page-list-box"]: pageListBox, active } = styles;

interface PagerProps {
	endPage: number;
	baseUrl: string;
	queryParams: Record<string, string>;
}

const Pager = ({ endPage, baseUrl, queryParams }: PagerProps) => {
	const currentPage = Number(queryParams.p) || 1;

	const createPageUrl = (page: number) => {
		const params = new URLSearchParams({ ...queryParams, p: page.toString() });
		return `${baseUrl}?${params.toString()}`;
	};

	const renderPageNumbers = () => {
		const pages = [];
		const startPage = Math.max(1, currentPage - 2);
		const endPageNum = Math.min(endPage, currentPage + 2);

		for (let i = startPage; i <= endPageNum; i++) {
			pages.push(
				<li key={i} className={i === currentPage ? active : ""}>
					<Link href={createPageUrl(i)}>{i}</Link>
				</li>
			);
		}

		return pages;
	};

	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === endPage;

	// if (endPage <= 1) return null; // 임시로 주석 처리

	return (
		<section className={pager}>
			<h1>페이저</h1>
			<div className={pageListBox}>
				<div>
					{isFirstPage ? (
						<span className="disabled">이전</span>
					) : (
						<Link href={createPageUrl(currentPage - 1)}>이전</Link>
					)}
				</div>
				<ul>{renderPageNumbers()}</ul>
				<div>
					{isLastPage ? (
						<span className="disabled">다음</span>
					) : (
						<Link href={createPageUrl(currentPage + 1)}>다음</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default Pager;
