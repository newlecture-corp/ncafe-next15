import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import NextAuthSessionProvider from "./components/NextAuthSessionProvider";
import RootFooter from "./components/RootFooter";
import RootHeader from "./components/RootHeader";

export default async function AnonLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<div className="d:flex flex-direction:column h:100p">
			<NextAuthSessionProvider session={session}>
				<RootHeader />
				{children}
				<RootFooter />
			</NextAuthSessionProvider>
		</div>
	);
}
