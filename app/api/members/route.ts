import { NextRequest, NextResponse } from "next/server";
import { CreateMemberUsecase } from "@/backend/application/members/usecases/CreateMemberUsecase";
import { CreateMemberRequestDto } from "@/backend/application/members/dtos/CreateMemberRequestDto";
import { PrMemberRepository } from "@/backend/infrastructure/repositories/PrMemberRepository";
import { PrMemberRoleRepository } from "@/backend/infrastructure/repositories/PrMemberRoleRepository";

export async function POST(request: NextRequest) {
	try {
		console.log("📝 회원가입 API 호출");

		// 1. 요청 데이터 파싱
		const formData = await request.formData();
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const phone = formData.get("phone") as string;
		const profileImage = formData.get("profileImage") as string;

		console.log("📋 파싱된 데이터:", {
			username,
			email,
			password: "***",
			phone,
			profileImage,
		});

		// 2. 유효성 검사
		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "필수 필드가 누락되었습니다." },
				{ status: 400 }
			);
		}

		// 3. DTO 생성
		const requestDto = new CreateMemberRequestDto(
			username,
			email,
			password,
			phone,
			profileImage
		);

		// 4. UseCase 실행
		const usecase = new CreateMemberUsecase(
			new PrMemberRepository(),
			new PrMemberRoleRepository()
		);

		const result = await usecase.execute(requestDto);

		// 5. 응답 반환
		if (result.success) {
			console.log("✅ 회원가입 성공");
			return NextResponse.json(result, { status: 201 });
		} else {
			console.log("❌ 회원가입 실패:", result.message);
			return NextResponse.json({ error: result.message }, { status: 400 });
		}
	} catch (error) {
		console.error("💥 회원가입 API 오류:", error);
		return NextResponse.json(
			{ error: "서버 오류가 발생했습니다." },
			{ status: 500 }
		);
	}
}
