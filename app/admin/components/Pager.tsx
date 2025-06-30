"use client";

import React from "react";

export default function Pager() {
	return (
		<section className="d:flex jc:center ai:center gap:2 h:100p">
			<h1 className="d:none">페이저</h1>
			<div className="n-btn disabled">이전</div>
			<ul className="n-list gap:2">
				<li>
					<button className="n-btn n-active" type="button">1</button>
				</li>
				<li>
					<button className="n-btn" type="button">2</button>
				</li>
				<li>
					<button className="n-btn" type="button">3</button>
				</li>
			</ul>
			<div className="n-btn disabled">다음</div>
		</section>
	);
}
