"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";

const steps = [
	{
		title: "새로운 버전 다운로드 (git pull)",
		command: "git pull",
	},
	{
		title: "브랜치 변경하기",
		command: "git switch csr/ex2/add-menu-search-query",
	},
	// {
	// 	title: "라이브러리 설치",
	// 	command: "npm i",
	// },
	// {
	// 	title: "환경변수 파일을 프로젝트 루트에 복사",
	// 	command: ".env",
	// },
	{
		title: "어플리케이션 실행",
		command: "npm run dev",
	},
];

export default function Ex1Page() {
	const [isExpanded, setIsExpanded] = useState(false);

	const expectedResponse = {
		menus: [
			{
				id: 17,
				korName: "치즈 샌드위치",
				engName: "cheese sandwich",
				price: 6000,
				hasIce: false,
				createdAt: "2025-04-06T05:33:01.690Z",
				isPublic: true,
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 3,
				updatedAt: null,
				deletedAt: null,
				description: null,
				defaultImage: "americano.png",
			},
			{
				id: 15,
				korName: "햄 샌드위치",
				engName: "ham sandwich",
				price: 7000,
				hasIce: false,
				createdAt: "2025-04-06T05:21:59.682Z",
				isPublic: true,
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 3,
				updatedAt: null,
				deletedAt: null,
				description: null,
				defaultImage: "americano.png",
			},
			{
				id: 14,
				korName: "토마토 샌드위치",
				engName: "tomato sandwich",
				price: 3500,
				hasIce: false,
				createdAt: "2025-04-06T05:19:38.619Z",
				isPublic: true,
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 3,
				updatedAt: null,
				deletedAt: null,
				description: null,
				defaultImage: "americano.png",
			},
		],
		currentPage: 1,
		endPage: 1,
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>예제2 코드 실행방법</h1>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						margin: "16px 0",
					}}
				>
					<Link
						href="./ex1"
						style={{
							color: "#fff",
							background: "#6c63ff",
							padding: "8px 16px",
							borderRadius: "6px",
							textDecoration: "none",
							fontWeight: "bold",
						}}
					>
						← 이전 예제
					</Link>
				</div>
				<div className={styles.descBox}>
					<div className={styles.descTitle}>
						설명 : 검색 조건이 포함된 메뉴목록 조회
					</div>
					<div className={styles.descText}>
						예제2는 예제 1에서 작성한 코드에 검색 조건을 추가한 코드이다. 검색
						조건은 다음과 같다.
						<br />
						예시 ) /api/admin/menus?p=1&c=3&n=샌드위치&sf=korName&asc=true
						<br />
						<p className="n-panel:2 bg-color:base-6 color:base-1 fs:6">
							즉, 페이지는 1페이지, 카테고리는 3번 카테고리, 검색어는 샌드위치,
							정렬 필드는 한글명, 정렬 순서는 오름차순으로 검색된다. 즉,
							샌드위치 라는 검색어로 검색하면 3번 카테고리에 속한 샌드위치
							메뉴가 조회된다.
						</p>
						<br />
						페이지 : p = 1; <br />
						카테고리 : c = 3; <br />
						검색어 : n = 샌드위치; <br />
						정렬 필드 : sf = korName; <br />
						정렬 순서 : asc = true; <br />이 있다.
						<div>
							⚠️ 주의 : 아직 화면과 바인딩 되는 코드는 없으며 api코드만 작성한
							상태입니다. 🔨
						</div>
					</div>
				</div>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>1. 프로젝트 설정</h2>
					<div className={styles.steps}>
						{steps.map((step, idx) => (
							<div className={styles.step} key={idx}>
								<span className={styles.stepNumber}>{idx + 1}</span>
								<div className={styles.stepContent}>
									<span className={styles.stepTitle}>{step.title}</span>
									<code className={styles.code}>{step.command}</code>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>2. API 테스트</h2>
					<div className={styles.testInfo}>
						<p>
							Postman 또는 브라우저를 이용해서 다음 URL 요청 테스트:{" "}
							<span className="color:main-3">카테고리가 3</span>인 메뉴 목록
							조회
						</p>
						<div className={styles.urlBox}>
							<code className={styles.url}>
								http://localhost:3000/api/admin/menus
							</code>
							<span className="color:main-3 fw:bold fs:10">?c=3</span>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>3. 수행결과 확인</h2>
					<div className={styles.resultContainer}>
						<button
							className={styles.toggleButton}
							onClick={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? "결과 숨기기" : "결과 보기"}
						</button>

						{isExpanded && (
							<div className={styles.jsonResult}>
								<pre className={styles.jsonCode}>
									{JSON.stringify(expectedResponse, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>4. 결과 분석</h2>
					<div className={styles.analysis}>
						<ul className={styles.analysisList}>
							<li>
								총 <strong>{expectedResponse.menus.length}개</strong>의 메뉴
								데이터가 반환됩니다
							</li>
							<li>
								각 메뉴는 ID, 한글명, 영문명, 가격, 아이스 옵션 등의 정보를
								포함합니다
							</li>
							<li>카테고리 중에서 3번 카테고리만 조회됩니다.</li>
							<li>
								페이지네이션 정보가 포함되어 있습니다 (현재 페이지:{" "}
								{expectedResponse.currentPage}, 마지막 페이지:{" "}
								{expectedResponse.endPage})
							</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
	);
}
