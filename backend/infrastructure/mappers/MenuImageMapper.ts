import { MenuImage } from "../../domain/entities/MenuImage";

/**
 * 메뉴 이미지 데이터베이스 테이블과 도메인 엔티티 간의 매핑
 */
export class MenuImageMapper {
	/**
	 * 데이터베이스 결과를 MenuImage 엔티티로 변환
	 */
	static toMenuImage(dbImage: {
		id: number;
		name: string;
		is_default: boolean;
		menu_id: number;
	}): MenuImage {
		return new MenuImage(
			dbImage.id,
			dbImage.name,
			dbImage.is_default,
			dbImage.menu_id
		);
	}

	/**
	 * MenuImage 엔티티를 데이터베이스 저장용 객체로 변환
	 */
	static toDatabase(image: MenuImage): {
		id: number;
		name: string;
		is_default: boolean;
		menu_id: number;
	} {
		return {
			id: image.id,
			name: image.name,
			is_default: image.isDefault,
			menu_id: image.menuId,
		};
	}

	/**
	 * 배열의 데이터베이스 결과를 MenuImage 엔티티 배열로 변환
	 */
	static toMenuImageArray(
		dbImages: {
			id: number;
			name: string;
			is_default: boolean;
			menu_id: number;
		}[]
	): MenuImage[] {
		return dbImages.map((image) => this.toMenuImage(image));
	}
}
