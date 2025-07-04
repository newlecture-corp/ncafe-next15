import { Menu } from "./Menu";

export class MenuView extends Menu {
	constructor(
		id: number,
		korName: string,
		engName: string,
		price: number,
		hasIce: boolean,
		createdAt: Date,
		isPublic: boolean,
		memberId: string,
		categoryId: number,
		updatedAt: Date | null,
		deletedAt: Date | null,
		description: string | null,

		// 확장 속성
		public defaultImage: string | null
	) {
		super(
			id,
			korName,
			engName,
			price,
			hasIce,
			createdAt,
			isPublic,
			memberId,
			categoryId,
			updatedAt,
			deletedAt,
			description
		);
		this.defaultImage = defaultImage;
	}
}
