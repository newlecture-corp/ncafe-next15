import { NextResponse } from "next/server";
import { GetCategoryListUsecase } from "@/backend/application/menus/usecases/GetCategoryListUsecase";
import { PrCategoryRepository } from "@/backend/infrastructure/repositories/PrCategoryRepository";

// GET /api/categories
export async function GET() {
	try {
		const usecase = new GetCategoryListUsecase(new PrCategoryRepository());
		const result = await usecase.execute();

		return NextResponse.json(result);
	} catch (error) {
		console.error("카테고리 목록 조회 오류:", error);
		return NextResponse.json(
			{ error: "카테고리 목록을 불러오는데 실패했습니다." },
			{ status: 500 }
		);
	}
}
