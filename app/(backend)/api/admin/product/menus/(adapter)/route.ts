import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { NGetMenuListUsecase } from "../application/usecase/NGetMenuListUsecase";
import { SbMenuRepository } from "@/app/(backend)/api/infrastructore/repository/SbMenuRepository";
import { SupabaseClient } from "@supabase/supabase-js";

// 관리자를 위한 메뉴 목록 조회 API
// GET /api/admin/product/menus
export async function GET() {
	// Usecase에게 주입할 infrastructure 계층의 Repository 생성
	const supabase: SupabaseClient = await createClient();
	const menuRepository = new SbMenuRepository(supabase);

	// Usecase에게 의존성을 주입
	// *** 메뉴 목록 조회하는 업무로직 *** 실행
	const getMenuListUsecase = new NGetMenuListUsecase(menuRepository);
	const menus = await getMenuListUsecase.execute();

	// 메뉴 목록을 JSON 형식으로 반환
	return NextResponse.json(menus);
}
