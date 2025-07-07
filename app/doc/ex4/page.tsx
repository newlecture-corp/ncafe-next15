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
		command: "git switch csr/ex4/add-menu-details",
	},
	{
		title: "어플리케이션 실행",
		command: "npm run dev",
	},
];

export default function Ex1Page() {
	const [isExpanded, setIsExpanded] = useState(false);

	const expectedResponse = {
		id: 19,
		korName: "초코쿠키",
		engName: "choco cookie",
		price: 3000,
		hasIce: false,
		createdAt: "2025-04-08T00:51:43.425Z",
		isPublic: true,
		memberId: "e755441d-1979-4617-acd5-531f2f898b22",
		categoryId: 4,
		updatedAt: null,
		deletedAt: null,
		description: null,
		images: [
			{
				id: 12,
				name: "choco-cookie.png",
				is_default: true,
			},
		],
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>예제4 코드 실행방법</h1>
				<div className={styles.descBox}>
					<div className={styles.descTitle}>설명</div>
					<div className="my:5">
						다음은 4 번째 예제이다. 목록을 출력할 때 상세 내용을 숨기고
						토글형식으로 보여주는 경우가 있다.
					</div>

					<div className="my:5">
						예를 들어 다음 그림처럼 menu 목록에서 오른쪽에 확장 버튼을 클릭하면
						가려져 있던 상세 내용이 펼쳐진다.
					</div>
					<div>
						<img src="/image/doc/ex4/menu_ex.png" alt="menu-ex" width="450" />
					</div>

					<div className="my:5">
						이 에제는 목록에서 확장 버튼을 누를 때 필요한 api를 작성하는 것이다.
					</div>

					<div>
						⚠️ 주의 : 아직 화면과 바인딩 되는 코드는 없으며 api코드만 작성한
						상태입니다. 🔨
					</div>

					<h2 className="my:5 n-heading:4">추가로 변경된 사항</h2>

					<div className="my:5 max-w:10">
						supabase api는 데이터베이스 조회 시 카멜 케이스를 스네이크 케이스로
						자동변환하는 옵션이 없기 때문에 repository에서 매핑관련 코드를
						작성했었다.
					</div>

					<div className="my:5 max-w:10">
						이번 예제에서는 /infrastructure/repositories에 mappers 폴더를
						추가하여 데이터베이스 조회 시 카멜 케이스를 스네이크 케이스로
						자동변환하는 코드를 repository로부터 분리하였다.
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
								http://localhost:3000/api/admin/menus/19/details
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
							<li>현재 선택된 19번 메뉴의 모든 이미지가 포함되어 있습니다.</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
	);
}
