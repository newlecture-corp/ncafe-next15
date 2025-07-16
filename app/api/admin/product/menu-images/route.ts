import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SbMenuImageRepository } from "@/backend/infrastructure/repositories/SbMenuImageRepository";
import { NGetMenuImageListUsecase } from "@/backend/application/admin/product/menu-images/usecases/NGetMenuImageListUsecase";
import { GetMenuImageListQueryDto } from "@/backend/application/admin/product/menu-images/dtos/GetMenuImageListQueryDto";

export async function GET(request: NextRequest) {
	try {
		const supabase = await createClient();
		const menuImageRepository = new SbMenuImageRepository(supabase);
		const getMenuImageListUsecase = new NGetMenuImageListUsecase(
			menuImageRepository
		);

		// 쿼리스트링에서 menu-id 추출하여 DTO 생성
		const { searchParams } = new URL(request.url);
		const menuIdParam = searchParams.get("menu-id");
		const queryDto: GetMenuImageListQueryDto = {};
		if (menuIdParam) queryDto.menuId = Number(menuIdParam);

		const result = await getMenuImageListUsecase.execute(queryDto);
		return NextResponse.json(result);
	} catch (error) {
		console.error("메뉴 이미지 목록 조회 오류:", error);
		return NextResponse.json(
			{
				success: false,
				error: "메뉴 이미지 목록 조회 중 오류가 발생했습니다.",
			},
			{ status: 500 }
		);
	}
}
