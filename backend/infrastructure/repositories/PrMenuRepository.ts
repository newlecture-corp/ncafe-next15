import { Menu } from "@/backend/domain/entities/Menu";
import { MenuRepository } from "../../domain/repositories/MenuRepository";
import { MenuSearchCriteria } from "../../domain/repositories/criteria/MenuSearchCriteria";
import { MenuRelationsOptions } from "../../domain/repositories/options/MenuRelationsOptions";
import prisma from "@/utils/prisma";

export class PrMenuRepository implements MenuRepository {
	async findAll(
		criteria: MenuSearchCriteria,
		relations?: MenuRelationsOptions
	): Promise<Menu[]> {
		const where: Record<string, unknown> = {};

		// 검색어(한글/영문 이름)
		if (criteria.searchWord) {
			where.OR = [
				{ korName: { contains: criteria.searchWord } },
				{ engName: { contains: criteria.searchWord, mode: "insensitive" } },
			];
		}

		// 카테고리 ID
		if (criteria.categoryId) {
			where.categoryId = criteria.categoryId;
		}

		// 멤버 ID
		if (criteria.memberId) {
			where.memberId = criteria.memberId;
		}

		// 공개 여부 (isPublic)
		if (criteria.publicOnly) {
			where.isPublic = true;
		}

		// 삭제되지 않은 메뉴만 조회 (소프트 삭제)
		where.deletedAt = null;

		// 정렬 필드 매핑
		const getSortField = (field: string): string => {
			switch (field) {
				case "createdAt":
					return "createdAt";
				case "updatedAt":
					return "updatedAt";
				case "korName":
					return "korName";
				case "engName":
					return "engName";
				case "price":
					return "price";
				default:
					return "createdAt";
			}
		};

		const sortField = getSortField(criteria.sortField || "createdAt");
		const orderBy: Record<string, "asc" | "desc"> = {};
		orderBy[sortField] = criteria.ascending ? "asc" : "desc";

		// relations
		const include: Record<string, boolean> = {};
		if (relations?.includeImages) include.images = true;
		if (relations?.includeMember) include.member = true;
		if (relations?.includeLikes) include.likes = true;

		const menus = await prisma.menu.findMany({
			where,
			orderBy,
			skip: criteria.offset,
			take: criteria.limit,
			include,
		});

		return menus as Menu[];
	}

	async findById(
		id: number,
		relations?: MenuRelationsOptions
	): Promise<Menu | null> {
		const include: Record<string, boolean> = {};
		if (relations?.includeImages) include.images = true;
		if (relations?.includeMember) include.member = true;
		if (relations?.includeLikes) include.likes = true;

		const menu = await prisma.menu.findUnique({
			where: { id },
			include,
		});
		return menu as Menu | null;
	}

	async count(criteria: MenuSearchCriteria): Promise<number> {
		const where: Record<string, unknown> = {};

		if (criteria.searchWord) {
			where.OR = [
				{ korName: { contains: criteria.searchWord } },
				{ engName: { contains: criteria.searchWord, mode: "insensitive" } },
			];
		}
		if (criteria.categoryId) {
			where.categoryId = criteria.categoryId;
		}
		if (criteria.memberId) {
			where.memberId = criteria.memberId;
		}
		if (criteria.publicOnly) {
			where.isPublic = true;
		}

		// 삭제되지 않은 메뉴만 조회 (소프트 삭제)
		where.deletedAt = null;

		return await prisma.menu.count({ where });
	}

	async save(menu: Menu): Promise<Menu> {
		const created = await prisma.menu.create({
			data: {
				korName: menu.korName!,
				engName: menu.engName!,
				price: menu.price!,
				isPublic: menu.isPublic ?? false,
				hasIce: menu.hasIce ?? true,
				hasHot: menu.hasHot ?? true,
				description: menu.description,
				categoryId: menu.categoryId!,
				memberId: menu.memberId!,
			},
		});
		return created as Menu;
	}

	async update(menu: Menu): Promise<Menu> {
		if (!menu.id) {
			throw new Error("메뉴 ID가 필요합니다.");
		}

		const updated = await prisma.menu.update({
			where: { id: menu.id },
			data: {
				korName: menu.korName,
				engName: menu.engName,
				price: menu.price,
				isPublic: menu.isPublic,
				hasIce: menu.hasIce,
				hasHot: menu.hasHot,
				description: menu.description,
				categoryId: menu.categoryId,
				memberId: menu.memberId,
				updatedAt: new Date(),
			},
		});
		return updated as Menu;
	}

	async delete(id: number): Promise<void> {
		await prisma.menu.delete({
			where: { id },
		});
	}
}
