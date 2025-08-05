import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUsecase } from "@/backend/application/auth/usecases/LoginUsecase";
import { LoginRequestDto } from "@/backend/application/auth/dtos/LoginRequestDto";
import { PrMemberRepository } from "@/backend/infrastructure/repositories/PrMemberRepository";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { username, password } = credentials ?? {};

				console.log("🔐 NextAuth authorize 호출:", {
					username,
					password: "***",
				});

				if (!username || !password) {
					console.log("❌ 사용자명 또는 비밀번호 누락");
					return null;
				}

				try {
					const loginUsecase = new LoginUsecase(new PrMemberRepository());
					const request = new LoginRequestDto(username, password);
					const result = await loginUsecase.execute(request);

					console.log("📋 LoginUsecase 결과:", JSON.stringify(result, null, 2));

					if (result.success && result.member) {
						console.log("✅ NextAuth 인증 성공:", result.member);
						return {
							id: result.member.id,
							username: result.member.username,
							roles: result.member.roles,
						};
					}

					console.log("❌ NextAuth 인증 실패:", result.message);
					return null;
				} catch (error) {
					console.error("💥 NextAuth authorize 오류:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: User }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.roles = user.roles;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.username = token.username;
				session.user.roles = token.roles;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt" as const,
	},
	secret: process.env.NEXTAUTH_SECRET,
};
