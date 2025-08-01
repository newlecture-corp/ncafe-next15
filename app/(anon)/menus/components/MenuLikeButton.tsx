"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface MenuLikeButtonProps {
	menuId: number;
	initialLikeCount: number;
	initialIsLiked?: boolean;
}

function MenuLikeButton({
	menuId,
	initialLikeCount,
	initialIsLiked = false,
}: MenuLikeButtonProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const [isLiked, setIsLiked] = useState(initialIsLiked);
	const [likeCount, setLikeCount] = useState(initialLikeCount);
	const [isLoading, setIsLoading] = useState(false);

	// 디버깅용 로그
	console.log(
		`Menu ${menuId}: initialIsLiked=${initialIsLiked}, isLiked=${isLiked}`
	);

	const handleLikeToggle = async () => {
		if (isLoading) return;

		// 로그인 상태 확인
		if (!session) {
			router.push("/login?callbackUrl=/menus");
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/member/menu-likes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					menuId,
				}),
			});

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					// API 응답에서 상태 업데이트
					setIsLiked(data.isLiked || false);
					setLikeCount(data.likeCount || 0);
				} else {
					console.error("좋아요 처리 실패:", data.message);
					// 에러 처리 (사용자에게 알림 등)
				}
			} else {
				console.error("좋아요 처리 실패:", response.statusText);
				// 에러 처리 (사용자에게 알림 등)
			}
		} catch (error) {
			console.error("좋아요 처리 중 오류:", error);
			// 에러 처리 (사용자에게 알림 등)
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<label
				className={`n-icon n-icon:favorite ${
					isLiked ? "liked icon-style:filled" : ""
				} ${isLoading ? "loading" : ""}`}
				onClick={handleLikeToggle}
				title={isLiked ? "좋아요 취소" : "좋아요"}
			>
				<input
					className="d:none"
					type="checkbox"
					checked={isLiked}
					readOnly
					disabled={isLoading}
				/>
			</label>
			<span>{likeCount}</span>
		</>
	);
}

export default MenuLikeButton;
