import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ToggleMenuLikeUsecase } from "@/backend/application/member/menu-likes/usecases/ToggleMenuLikeUsecase";
import { CreateMenuLikeDto } from "@/backend/application/member/menu-likes/dtos/CreateMenuLikeDto";
import { PrMenuLikeRepository } from "@/backend/infrastructure/repositories/PrMenuLikeRepository";
import { PrMenuRepository } from "@/backend/infrastructure/repositories/PrMenuRepository";

export async function GET(req: NextRequest) {
	try {
		// 세션 확인
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json(
				{
					success: false,
					message: "로그인이 필요합니다.",
					requiresLogin: true,
				},
				{ status: 200 }
			);
		}

		// 쿼리 파라미터에서 menuId 추출
		const { searchParams } = new URL(req.url);
		const menuId = searchParams.get("menuId");

		if (!menuId) {
			return NextResponse.json(
				{ success: false, message: "메뉴 ID가 필요합니다." },
				{ status: 400 }
			);
		}

		// 좋아요 상태 확인
		const menuLikeRepository = new PrMenuLikeRepository();
		const existingLike = await menuLikeRepository.findByMemberIdAndMenuId(
			session.user.id,
			Number(menuId)
		);

		// 전체 좋아요 개수 조회
		const allLikes = await menuLikeRepository.findByMenuId(Number(menuId));

		return NextResponse.json({
			success: true,
			isLiked: !!existingLike,
			likeCount: allLikes.length,
		});
	} catch (error) {
		console.error("Menu like status check error:", error);
		return NextResponse.json(
			{ success: false, message: "서버 오류가 발생했습니다." },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		// 세션 확인
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json(
				{
					success: false,
					message: "로그인이 필요합니다.",
					requiresLogin: true,
				},
				{ status: 200 }
			);
		}

		// 요청 본문 파싱
		const body = await req.json();
		const { menuId } = body;

		if (!menuId) {
			return NextResponse.json(
				{ success: false, message: "메뉴 ID가 필요합니다." },
				{ status: 400 }
			);
		}

		// DTO 생성
		const dto = new CreateMenuLikeDto(session.user.id, menuId);

		// Usecase 실행
		const usecase = new ToggleMenuLikeUsecase(
			new PrMenuLikeRepository(),
			new PrMenuRepository()
		);

		const result = await usecase.execute(dto);

		return NextResponse.json(result);
	} catch (error) {
		console.error("Menu like error:", error);
		return NextResponse.json(
			{ success: false, message: "서버 오류가 발생했습니다." },
			{ status: 500 }
		);
	}
}
