import { Menu } from "../../domain/entities/Menu";
import { MenuImage } from "../../domain/entities/MenuImage";

/**
 * 메뉴 데이터베이스 테이블과 도메인 엔티티 간의 매핑
 */
export class MenuMapper {
	/**
	 * 데이터베이스 결과를 Menu 엔티티로 변환
	 */
	static toMenu(dbMenu: {
		id: number;
		kor_name: string;
		eng_name: string;
		price: number;
		has_ice: boolean;
		created_at: string;
		updated_at: string | null;
		deleted_at: string | null;
		member_id: string;
		category_id: number;
		description: string | null;
		is_public: boolean;
		images?: {
			id: number;
			name: string;
			is_default: boolean;
			menu_id: number;
		}[];
	}): Menu {
		const menuImages =
			dbMenu.images?.map(
				(image) =>
					new MenuImage(image.id, image.name, image.is_default, image.menu_id)
			) || [];

		return new Menu(
			dbMenu.id,
			dbMenu.kor_name,
			dbMenu.eng_name,
			dbMenu.price,
			dbMenu.has_ice,
			new Date(dbMenu.created_at),
			dbMenu.is_public,
			dbMenu.member_id,
			dbMenu.category_id,
			dbMenu.updated_at ? new Date(dbMenu.updated_at) : null,
			dbMenu.deleted_at ? new Date(dbMenu.deleted_at) : null,
			dbMenu.description,
			menuImages
		);
	}

	/**
	 * Menu 엔티티를 데이터베이스 저장용 객체로 변환
	 */
	static toDatabase(menu: Menu): {
		id: number;
		kor_name: string;
		eng_name: string;
		price: number;
		has_ice: boolean;
		created_at: string;
		updated_at: string | null;
		deleted_at: string | null;
		member_id: string;
		category_id: number;
		description: string | null;
		is_public: boolean;
	} {
		return {
			id: menu.id,
			kor_name: menu.korName,
			eng_name: menu.engName,
			price: menu.price,
			has_ice: menu.hasIce,
			created_at: menu.createdAt.toISOString(),
			updated_at: menu.updatedAt?.toISOString() ?? null,
			deleted_at: menu.deletedAt?.toISOString() ?? null,
			member_id: menu.memberId,
			category_id: menu.categoryId,
			description: menu.description,
			is_public: menu.isPublic,
		};
	}

	/**
	 * 데이터베이스 결과 배열을 Menu 엔티티 배열로 변환
	 */
	static toMenuArray(
		dbMenus: {
			id: number;
			kor_name: string;
			eng_name: string;
			price: number;
			has_ice: boolean;
			created_at: string;
			updated_at: string | null;
			deleted_at: string | null;
			member_id: string;
			category_id: number;
			description: string | null;
			is_public: boolean;
			images?: {
				id: number;
				name: string;
				is_default: boolean;
				menu_id: number;
				created_at?: string;
				updated_at?: string | null;
			}[];
		}[]
	): Menu[] {
		return dbMenus.map((menu) => this.toMenu(menu));
	}
}
