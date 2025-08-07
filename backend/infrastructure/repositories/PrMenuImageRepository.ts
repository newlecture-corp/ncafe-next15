import { MenuImage } from "@/backend/domain/entities/MenuImage";
import { MenuImageRepository } from "../../domain/repositories/MenuImageRepository";
import { MenuImageRelationsOptions } from "../../domain/repositories/options/MenuImageRelationsOptions";
import prisma from "@/utils/prisma";

export class PrMenuImageRepository implements MenuImageRepository {
	async findAll(relations?: MenuImageRelationsOptions): Promise<MenuImage[]> {
		const include: Record<string, boolean> = {};
		if (relations?.includeMenu) include.menu = true;

		const images = await prisma.menuImage.findMany({
			include,
		});
		return images as MenuImage[];
	}

	async findById(
		id: number,
		relations?: MenuImageRelationsOptions
	): Promise<MenuImage | null> {
		const include: Record<string, boolean> = {};
		if (relations?.includeMenu) include.menu = true;

		const image = await prisma.menuImage.findUnique({
			where: { id },
			include,
		});
		return image as MenuImage | null;
	}

	async save(menuImage: MenuImage): Promise<MenuImage> {
		const created = await prisma.menuImage.create({
			data: {
				name: menuImage.name!,
				isDefault: menuImage.isDefault ?? false,
				menuId: menuImage.menuId!,
			},
		});
		return created as MenuImage;
	}

	async update(menuImage: MenuImage): Promise<MenuImage> {
		if (!menuImage.id) {
			throw new Error("메뉴 이미지 ID가 필요합니다.");
		}

		const updated = await prisma.menuImage.update({
			where: { id: menuImage.id },
			data: {
				name: menuImage.name,
				isDefault: menuImage.isDefault,
				menuId: menuImage.menuId,
			},
		});
		return updated as MenuImage;
	}

	async delete(id: number): Promise<void> {
		await prisma.menuImage.delete({
			where: { id },
		});
	}
}
