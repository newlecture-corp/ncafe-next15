import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
	request: NextRequest,
	// 서버 컴포넌트에서 13+ 버전 이상에서 params는 무조건 비동기로 처리해야 함.
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const resolvedParams = await params;
		const menuId = parseInt(resolvedParams.id);
		if (isNaN(menuId)) {
			return NextResponse.json({ error: "Invalid menu ID" }, { status: 400 });
		}

		// 개발용 지연 (필요시 주석 해제)
		// await new Promise((resolve) => setTimeout(resolve, 3000));

		// 이미지 정보가 포함된 메뉴 데이터 조회 (삭제되지 않은 메뉴만)
		const menuWithImage = await prisma.menu.findUnique({
			where: {
				id: menuId,
				deletedAt: null,
			},
			include: {
				images: true,
			},
		});

		console.log(menuWithImage);

		if (!menuWithImage) {
			return NextResponse.json({ error: "Menu not found" }, { status: 404 });
		}

		return NextResponse.json(menuWithImage);
	} catch (error) {
		console.error("Error fetching menu with image:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
