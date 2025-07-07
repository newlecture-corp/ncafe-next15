import { MenuImage } from "./MenuImage";

export class Menu {
	constructor(
		public id: number,
		public korName: string,
		public engName: string,
		public price: number,
		public hasIce: boolean,
		public createdAt: Date,
		public isPublic: boolean,
		public memberId: string,
		public categoryId: number,
		public updatedAt: Date | null = null,
		public deletedAt: Date | null = null,
		public description: string | null = null,

		// 관계가 있는 엔티티
		public menuImages: MenuImage[]
	) {}
}
