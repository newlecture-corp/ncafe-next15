"use client";

import { useState } from "react";
import styles from "./page.module.scss";

const steps = [
	{
		title: "프로젝트 클론",
		command: "git clone https://github.com/newlecture-corp/ncafe-next15.git",
	},
	{
		title: "브랜치 변경하기",
		command: "git switch csr/ex1/clean-architecture",
	},
	{
		title: "라이브러리 설치",
		command: "npm i",
	},
	{
		title: "환경변수 파일을 프로젝트 루트에 복사",
		command: ".env",
	},
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
				id: 8,
				korName: "나이트로 바닐라 크림",
				engName: "cafelatte",
				price: 4000,
				hasIce: false,
				createdAt: "2025-04-01T06:24:19.319Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 1,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 2,
				korName: "아메리카노",
				engName: "americano",
				price: 1500,
				hasIce: false,
				createdAt: "2025-03-31T15:48:58.440Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 1,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 11,
				korName: "하니딸기라떼",
				engName: "honeyStrawberryLatte",
				price: 19500,
				hasIce: false,
				createdAt: "2025-04-06T05:15:21.238Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 1,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 12,
				korName: "제주 비자림 콜드 브루",
				engName: "Jeju Forest Cold Brew",
				price: 6800,
				hasIce: false,
				createdAt: "2025-04-06T05:16:18.006Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 1,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 13,
				korName: "카페라떼",
				engName: "cafe latte",
				price: 2500,
				hasIce: false,
				createdAt: "2025-04-06T05:17:25.155Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 1,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 14,
				korName: "토마토 샌드위치",
				engName: "tomato sandwich",
				price: 3500,
				hasIce: false,
				createdAt: "2025-04-06T05:19:38.619Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 3,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 15,
				korName: "햄 샌드위치",
				engName: "ham sandwich",
				price: 7000,
				hasIce: false,
				createdAt: "2025-04-06T05:21:59.682Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 3,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 16,
				korName: "오랜지 피지오",
				engName: "orange fizzio",
				price: 5600,
				hasIce: false,
				createdAt: "2025-04-06T05:31:18.121Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 2,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 17,
				korName: "치즈 샌드위치",
				engName: "cheese sandwich",
				price: 6000,
				hasIce: false,
				createdAt: "2025-04-06T05:33:01.690Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 3,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 18,
				korName: "자몽 아이스티",
				engName: "jamong icetee",
				price: 4000,
				hasIce: true,
				createdAt: "2025-04-08T00:48:49.873Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 2,
				updatedAt: null,
				defaultImage: "americano.png",
			},
			{
				id: 19,
				korName: "초코쿠키",
				engName: "choco cookie",
				price: 3000,
				hasIce: false,
				createdAt: "2025-04-08T00:51:43.425Z",
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 4,
				updatedAt: null,
				defaultImage: "americano.png",
			},
		],
		currentPage: 1,
		endPage: 1,
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>예제1 코드 실행방법</h1>
				<div className={styles.descBox}>
					<div className={styles.descTitle}>설명</div>
					<div className={styles.descText}>
						예제1은 관리자에게 menu 목록을 반환하는 업무로직을 클린 아키텍처
						패턴을 적용한 코드이다.
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
						<p>Postman 또는 브라우저를 이용해서 다음 URL 요청 테스트:</p>
						<div className={styles.urlBox}>
							<code className={styles.url}>
								http://localhost:3000/api/admin/menus
							</code>
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
							<li>
								카테고리별로 분류되어 있습니다 (1: 음료, 2: 주스, 3: 샌드위치,
								4: 쿠키)
							</li>
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
