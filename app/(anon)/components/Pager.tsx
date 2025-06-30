"use client";

// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./Pager.module.scss";

const { pager, ["page-list-box"]: pageListBox, disabled, active } = styles;

export default function Pager() {
	return (
		<section className={pager}>
			<h1>페이지</h1>
			<div className={pageListBox}>
				<div>
					<span className={disabled}>이전</span>
				</div>
				<ul>
					<li className={active}>
						<Link href="#">1</Link>
					</li>
					<li>
						<Link href="#">2</Link>
					</li>
					<li>
						<Link href="#">3</Link>
					</li>
				</ul>
				<div>
					<span className={disabled}>다음</span>
				</div>
			</div>
		</section>
	);
}
