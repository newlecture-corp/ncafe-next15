import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { SbMenuRepository } from "@/backend/infrastructure/repositories/SbMenuRepository";
import { GetMenuListQueryDto } from "@/backend/application/admin/product/menus/dtos/GetMenuListQueryDto";
import { NGetMenuListUsecase } from "@/backend/application/admin/product/menus/usecases/NGetMenuListUsecase";

// 관리자를 위한 메뉴 목록 조회 API
// GET /api/admin/product/menus
export async function GET(request: NextRequest) {
	// 1. URL에서 쿼리 파라미터를 가져와서
	const url: URL = new URL(request.url);
	const pageParam: string = url.searchParams.get("p") || "1";
	const categoryIdParam: string | null = url.searchParams.get("c");
	const searchNameParam: string | null = url.searchParams.get("n");
	const sortFieldParam: string | null = url.searchParams.get("sf"); // 정렬 필드
	const ascendingParam: string | null = url.searchParams.get("asc"); // 정렬 순서 (asc 또는 desc)

	// 2. 쿼리를 위해 전달할 DTO 생성한 후
	const queryDto = new GetMenuListQueryDto(
		Number(pageParam),
		categoryIdParam,
		searchNameParam,
		sortFieldParam, // 정렬 기준 필드, 기본값은 "order" 필드
		ascendingParam === "true" // 정렬 순서, 기본값은 true(오름차순)
	);

	// 3. 쿼리를 위해 전달할 DTO를 Usecase에게 전달해서 실행한다.
	// Usecase에게 주입할 infrastructure 계층의 Repository 생성
	const supabase: SupabaseClient = await createClient();
	const menuRepository = new SbMenuRepository(supabase);

	// Usecase에게 의존성을 주입
	// *** 메뉴 목록 조회하는 업무로직 *** 실행
	const getMenuListUsecase = new NGetMenuListUsecase(menuRepository);
	const menus = await getMenuListUsecase.execute(queryDto);

	// 메뉴 목록을 JSON 형식으로 반환
	return NextResponse.json(menus);
}
