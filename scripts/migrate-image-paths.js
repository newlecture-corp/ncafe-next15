const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function migrateImagePaths() {
	try {
		console.log("🔄 이미지 경로 마이그레이션 시작...");

		// 모든 메뉴 이미지 조회
		const menuImages = await prisma.menuImage.findMany({
			include: {
				menu: true,
			},
		});

		console.log(`📊 총 ${menuImages.length}개의 메뉴 이미지 발견`);

		for (const menuImage of menuImages) {
			const oldPath = menuImage.name;

			// Supabase Storage URL을 로컬 경로로 변환
			if (oldPath && oldPath.includes("supabase.co")) {
				// URL에서 파일명 추출
				const fileName = oldPath.split("/").pop();
				const newPath = `/image/product/${fileName}`;

				console.log(`🔄 변환: ${oldPath} → ${newPath}`);

				// 데이터베이스 업데이트
				await prisma.menuImage.update({
					where: { id: menuImage.id },
					data: { name: newPath },
				});
			} else if (oldPath && !oldPath.startsWith("/image/")) {
				// 이미지 경로가 있지만 /image/로 시작하지 않는 경우
				const fileName = oldPath.split("/").pop() || oldPath;
				const newPath = `/image/product/${fileName}`;

				console.log(`🔄 변환: ${oldPath} → ${newPath}`);

				// 데이터베이스 업데이트
				await prisma.menuImage.update({
					where: { id: menuImage.id },
					data: { name: newPath },
				});
			} else {
				console.log(`✅ 이미 올바른 경로: ${oldPath}`);
			}
		}

		console.log("✅ 이미지 경로 마이그레이션 완료!");
	} catch (error) {
		console.error("❌ 마이그레이션 오류:", error);
	} finally {
		await prisma.$disconnect();
	}
}

migrateImagePaths();
