export default function MemberPage() {
	return (
		<main>
			<h1>회원 전용 페이지</h1>
			<p>
				이 페이지는 MEMBER 또는 ADMIN 권한을 가진 사용자만 접근할 수 있습니다.
			</p>
			<div>
				<h2>회원 기능</h2>
				<ul>
					<li>내 주문 내역</li>
					<li>장바구니 관리</li>
					<li>프로필 수정</li>
					<li>좋아요한 메뉴</li>
				</ul>
			</div>
		</main>
	);
}
