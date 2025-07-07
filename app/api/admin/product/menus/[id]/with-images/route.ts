import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SbMenuRepository } from "@/backend/infrastructure/repositories/SbMenuRepository";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const supabase = await createClient();
		const menuRepository = new SbMenuRepository(supabase);

		const resolvedParams = await params;
		const menuId = parseInt(resolvedParams.id);
		if (isNaN(menuId)) {
			return NextResponse.json({ error: "Invalid menu ID" }, { status: 400 });
		}

		// 메뉴와 이미지 배열을 함께 조회
		const menuWithImages = await menuRepository.findByIdWithImageArray(menuId);

		if (!menuWithImages) {
			return NextResponse.json({ error: "Menu not found" }, { status: 404 });
		}

		return NextResponse.json(menuWithImages);
	} catch (error) {
		console.error("Error fetching menu with images:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
