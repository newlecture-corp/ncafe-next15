import { SignJWT, jwtVerify } from "jose";

// 비밀 키
const secret = "my-secret-key";

// 1. jose로 JWT 생성
(async () => {
	const secretKey = new TextEncoder().encode(secret);
	const token = await new SignJWT({ id: 1, username: "test" })
		.setProtectedHeader({ alg: "HS256" })
		.sign(secretKey);
	console.log("Generated Token:", token);

	// 2. jose로 JWT 검증
	const { payload } = await jwtVerify(token, secretKey);
	console.log("Verified Payload:", payload);
})();
