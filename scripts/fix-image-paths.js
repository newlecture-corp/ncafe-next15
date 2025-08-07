const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fixImagePaths() {
	try {
		console.log("🔄 이미지 경로를 파일명만으로 수정 시작...");

		// 모든 메뉴 이미지 조회
		const menuImages = await prisma.menuImage.findMany({
			include: {
				menu: true,
			},
		});

		console.log(`📊 총 ${menuImages.length}개의 메뉴 이미지 발견`);

		for (const menuImage of menuImages) {
			const oldPath = menuImage.name;

			if (oldPath && oldPath.includes("/")) {
				// 경로에서 파일명만 추출
				const fileName = oldPath.split("/").pop();
				console.log(`🔄 수정: ${oldPath} → ${fileName}`);

				// 데이터베이스 업데이트
				await prisma.menuImage.update({
					where: { id: menuImage.id },
					data: { name: fileName },
				});
			} else {
				console.log(`✅ 이미 파일명만 저장됨: ${oldPath}`);
			}
		}

		console.log("✅ 이미지 경로 수정 완료!");
	} catch (error) {
		console.error("❌ 수정 오류:", error);
	} finally {
		await prisma.$disconnect();
	}
}

fixImagePaths();
