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

		const menu = await menuRepository.findById(menuId);
		if (!menu) {
			return NextResponse.json({ error: "Menu not found" }, { status: 404 });
		}

		return NextResponse.json(menu);
	} catch (error) {
		console.error("Error fetching menu:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
