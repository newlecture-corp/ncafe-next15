import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getServerSession(authOptions);
	console.log("=== restricted test session print===");
	console.log("restricted Session:", session);
	console.log("=== restricted test session print===");

	if (session) {
		return NextResponse.json({
			content:
				"This is protected content. You can access this content because you are signed in.",
		});
	} else {
		return NextResponse.json({
			error:
				"You must be signed in to view the protected content on this page.",
		});
	}
}
