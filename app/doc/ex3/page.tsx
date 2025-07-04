"use client";

import { useState } from "react";
import styles from "./page.module.scss";

const steps = [
	{
		title: "새로운 버전 다운로드 (git pull)",
		command: "git pull",
	},
	{
		title: "브랜치 변경하기",
		command: "git switch csr/ex3/add-menu-view",
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
				id: 18,
				korName: "자몽 아이스티",
				engName: "jamong icetee",
				price: 4000,
				hasIce: true,
				createdAt: "2025-04-08T00:48:49.873Z",
				isPublic: true,
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 2,
				updatedAt: null,
				deletedAt: null,
				description: null,
				defaultImage: "jamong_icetee.jpeg",
			},
			{
				id: 16,
				korName: "오랜지 피지오",
				engName: "orange fizzio",
				price: 5600,
				hasIce: false,
				createdAt: "2025-04-06T05:31:18.121Z",
				isPublic: true,
				memberId: "e755441d-1979-4617-acd5-531f2f898b22",
				categoryId: 2,
				updatedAt: null,
				deletedAt: null,
				description: null,
				defaultImage: "orange_fizzio.png",
			},
		],
		currentPage: 1,
		endPage: 1,
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>예제3 코드 실행방법</h1>
				<div className={styles.descBox}>
					<div className={styles.descTitle}>설명</div>
					<div className="my:5">
						다음은 세 번째 예제입니다. 목록을 출력할 때 다른 테이블의 데이터를
						함께 출력해야 하는 상황이 발생할 수 있다.
					</div>

					<div className="my:5">
						예를 들어 다음 그림처럼 menu 목록에서 각 항목마다 자식 테이블의
						image를 반복적으로 포함시켜야 하는 경우가 발생할 수 있다.
					</div>
					<div>
						<img
							src="/image/doc/ex3/menu_list.png"
							alt="menu-list"
							width={450}
						/>
					</div>

					<div className="my:5">다음은 두 테이블의 관계도이다.</div>

					<div>
						<img
							src="/image/doc/ex3/menu_table.png"
							alt="menu-table"
							width={450}
						/>
					</div>
					<div className="my:5">
						이런 경우는 Menu 엔티티가 아니라 MenuView 엔티티를 사용하는 것이
						바람직하다.
						<br />
						<br />
						구현 코드는 SbMenuRepository의 findViewAll 메서드를 확인해보기
						바란다.
					</div>

					<div>
						⚠️ 주의 : 아직 화면과 바인딩 되는 코드는 없으며 api코드만 작성한
						상태입니다. 🔨
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
						<div className="my:5">
							menus 배열에서 각 항목의 defaultImage 속성에서 차이가 있다.
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
								메뉴의 기본이미지가 포함되어 있습니다. defaultImage: 각 메뉴의
								기본이미지
							</li>
							<li>
								페이지네이션 정보가 포함되어 있습니다 현재 페이지:{" "}
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
