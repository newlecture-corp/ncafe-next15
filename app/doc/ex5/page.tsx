"use client";

import styles from "./page.module.scss";

const steps = [
	{
		title: "새로운 버전 다운로드 (git pull)",
		command: "git pull",
	},
	{
		title: "어플리케이션 실행",
		command: "npm run dev",
	},
];

export default function Ex1Page() {
	return (
		<div className={`${styles.container} fs:8`}>
			<div className={styles.content}>
				<h1 className={styles.title}>예제5 Mapper 클래스와 Repository 구현</h1>
				<div className={`${styles.descBox} fs:10`}>
					<div className={styles.descTitle}>설명</div>
					<div className="my:5">
						supabase api는 데이터베이스 조회 시 카멜 케이스를 스네이크 케이스로
						자동변환하는 옵션이 없기 때문에 repository에서 매핑관련 코드를
						작성해야만 했다.
					</div>

					<div className="my:5">
						이번 예제에서는 /infrastructure/repositories에 mappers 폴더를
						추가하여 데이터베이스 조회 시 카멜 케이스를 스네이크 케이스로
						자동변환하는 코드를 repository로부터 분리하였다.
					</div>

					<div className="my:5">
						<img
							src="/image/doc/ex5/repositories.png"
							alt="menu-ex"
							height="450"
						/>
					</div>

					<div className="my:5">
						⚠️ 주의 : Repository 하나만 이해하면 모든 Repository가 거의
						동일하다. 따라서 이 예제를 통해 이해한 내용을 다른 Repository에
						적용하면 된다.
					</div>

					<div className="my:5">
						공개하는 코드를 보지만 말고 복사/붙여넣기로 코드를 가져가서 수정해서
						사용할 수 있는 것이 실력이다.
					</div>

					<div className="my:5">
						만약에 개념적인 부분에서 이해가 안가는 부분이 있다면 저에게
						오시오요~~
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
			</div>
		</div>
	);
}
