import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { LoginUsecase } from "@/backend/application/auth/usecases/LoginUsecase";
import { LoginRequestDto } from "@/backend/application/auth/dtos/LoginRequestDto";
import { GoogleLoginUsecase } from "@/backend/application/auth/usecases/GoogleLoginUsecase";
import { PrMemberRepository } from "@/backend/infrastructure/repositories/PrMemberRepository";
import { PrMemberRoleRepository } from "@/backend/infrastructure/repositories/PrMemberRoleRepository";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
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
					const loginRequestdto = new LoginRequestDto(username, password);
					const result = await loginUsecase.execute(loginRequestdto);

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
		async signIn({
			user,
			account,
			profile,
		}: {
			user: User;
			account: { provider: string } | null;
			profile: {
				sub: string;
				email: string;
				name: string;
				picture: string;
			} | null;
		}) {
			console.log("🔐 NextAuth signIn 콜백 호출");
			console.log("👤 User:", user);
			console.log("🔑 Account:", account);
			console.log("📋 Profile:", profile);

			// 구글 로그인인 경우
			if (account?.provider === "google" && profile) {
				try {
					const googleLoginUsecase = new GoogleLoginUsecase(
						new PrMemberRepository(),
						new PrMemberRoleRepository()
					);

					const googleUser = {
						id: profile.sub as string,
						email: profile.email as string,
						name: profile.name as string,
						picture: profile.picture as string,
					};

					const result = await googleLoginUsecase.execute(googleUser);

					if (result.success && result.member) {
						console.log("✅ 구글 로그인 성공:", result.member);
						// user 객체에 필요한 정보 추가
						user.id = result.member.id;
						user.username = result.member.username;
						user.roles = result.member.roles;
						return true;
					}

					console.log("❌ 구글 로그인 실패:", result.message);
					return false;
				} catch (error) {
					console.error("💥 구글 로그인 콜백 오류:", error);
					return false;
				}
			}

			return true;
		},
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
