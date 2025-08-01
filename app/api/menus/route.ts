import { NextRequest, NextResponse } from "next/server";
import { GetMenuListUsecase } from "@/backend/application/menus/usecases/GetMenuListUsecase";
import { GetMenuListQueryDto } from "@/backend/application/menus/dtos/GetMenuListQueryDto";
import { PrMenuRepository } from "@/backend/infrastructure/repositories/PrMenuRepository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

// GET /api/menus?p=1&c=2&q=검색어
export async function GET(req: NextRequest) {
	// 쿼리스트링에서 p, c, q 추출
	const { searchParams } = new URL(req.url);
	const p = Number(searchParams.get("p")) || 1;
	const c = Number(searchParams.get("c")) || 0;
	const q = searchParams.get("q") || "";
	console.log(p, c, q);

	// 세션 확인 (로그인한 사용자 ID 가져오기)
	const session = await getServerSession(authOptions);
	const currentUserId = session?.user?.id;

	const usecase = new GetMenuListUsecase(new PrMenuRepository());
	const queryDto = new GetMenuListQueryDto(c, p, q);

	const result = await usecase.execute(queryDto, currentUserId);

	return NextResponse.json(result);
}
