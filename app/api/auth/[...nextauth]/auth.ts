import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

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

				// 실제 DB 또는 API를 통한 사용자 인증 로직
				if (username === "newlec" && password === "1234") {
					return {
						id: "7ae5e5c9-0c28-426f-952f-85bdfdcfc522",
						username: "newlec",
						roles: ["ADMIN", "MEMBER"],
					};
				}

				return null;
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
