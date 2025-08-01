"use client";

import { useState, useEffect } from "react";
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

	// 컴포넌트 마운트 시 사용자의 좋아요 상태 확인
	useEffect(() => {
		const checkLikeStatus = async () => {
			if (!session?.user) return;

			try {
				const response = await fetch(`/api/member/menu-likes?menuId=${menuId}`);
				if (response.ok) {
					const data = await response.json();
					if (data.success) {
						setIsLiked(data.isLiked);
						setLikeCount(data.likeCount);
					}
				}
			} catch (error) {
				console.error("좋아요 상태 확인 중 오류:", error);
			}
		};

		checkLikeStatus();
	}, [session, menuId]);

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
