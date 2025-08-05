import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	console.log("🔒 Middleware 실행:", pathname);

	// NextAuth JWT 토큰 가져오기
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	console.log("🔑 Token:", token ? "존재" : "없음");

	// 로그인하지 않은 사용자 처리
	if (!token) {
		// 보호된 경로에 접근하려는 경우 로그인 페이지로 리다이렉트
		if (isProtectedRoute(pathname)) {
			console.log("🚫 보호된 경로 접근 차단:", pathname);
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(loginUrl);
		}
		return NextResponse.next();
	}

	// 사용자 권한 확인
	const userRoles = (token.roles as string[]) || [];
	console.log("👤 사용자 권한:", userRoles);
	console.log("🔍 토큰 전체 데이터:", JSON.stringify(token, null, 2));

	// 페이지 권한 체크
	if (pathname.startsWith("/member")) {
		if (!hasMemberAccess(userRoles)) {
			console.log("🚫 MEMBER 권한 없음:", pathname);
			return NextResponse.redirect(new URL("/403", request.url));
		}
	}

	if (pathname.startsWith("/admin")) {
		if (!hasAdminAccess(userRoles)) {
			console.log("🚫 ADMIN 권한 없음:", pathname);
			return NextResponse.redirect(new URL("/403", request.url));
		}
	}

	// API 권한 체크
	if (pathname.startsWith("/api/member")) {
		if (!hasMemberAccess(userRoles)) {
			return new NextResponse(
				JSON.stringify({ error: "접근 권한이 없습니다." }),
				{
					status: 403,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	}

	if (pathname.startsWith("/api/admin")) {
		if (!hasAdminAccess(userRoles)) {
			return new NextResponse(
				JSON.stringify({ error: "관리자 권한이 필요합니다." }),
				{
					status: 403,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	}

	console.log("✅ 접근 허용:", pathname);
	return NextResponse.next();
}

// 보호된 경로인지 확인
function isProtectedRoute(pathname: string): boolean {
	console.log("🔍 경로 체크:", pathname);
	console.log("  - /member 시작?", pathname.startsWith("/member"));
	console.log("  - /admin 시작?", pathname.startsWith("/admin"));
	console.log("  - /api/member 시작?", pathname.startsWith("/api/member"));
	console.log("  - /api/admin 시작?", pathname.startsWith("/api/admin"));

	const isProtected =
		pathname.startsWith("/member") ||
		pathname.startsWith("/admin") ||
		pathname.startsWith("/api/member") ||
		pathname.startsWith("/api/admin");

	console.log("  - 보호된 경로?", isProtected);
	return isProtected;
}

// MEMBER 또는 ADMIN 권한 확인
function hasMemberAccess(roles: string[]): boolean {
	return roles.includes("MEMBER") || roles.includes("ADMIN");
}

// ADMIN 권한만 확인
function hasAdminAccess(roles: string[]): boolean {
	return roles.includes("ADMIN");
}

// 미들웨어가 실행될 경로 설정
export const config = {
	matcher: [
		// 페이지 경로
		"/member/:path*",
		"/admin/:path*",
		// API 경로
		"/api/member/:path*",
		"/api/admin/:path*",
	],
};
