"use client";

import React from "react";

const SearchForm: React.FC = () => {
	return (
		<section className="n-frame n-expandable">
			<header>
				<h1>
					<span className="n-icon n-icon:search n-deco">검색</span>
				</h1>
				<div className="ml:auto">
					<label className="n-icon n-icon:arrow_drop_down cursor:pointer">
						<span>확장버튼</span>
						<input className="d:none n-btn:expander" type="checkbox" />
					</label>
				</div>
			</header>
			<form className="n-form n-label-pos:left">
				<div>
					<label>
						<span>한글명</span>
						<input type="text" name="sw" defaultValue="" />
					</label>
					<label>
						<span>카테고리</span>
						<select name="category" defaultValue="">
							<option value="">전체</option>
							<option value="1">카테고리A</option>
							<option value="2">카테고리B</option>
						</select>
					</label>
					<div className="d:flex justify-content:end">
						<button className="n-btn n-btn-color:main" type="button">검색</button>
						<button className="n-btn ml:1" type="button">취소</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;
