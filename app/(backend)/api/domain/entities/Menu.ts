export class Menu {
	constructor(
		public id: number,
		public korName: string,
		public engName: string,
		public price: number,
		public hasIce: boolean,
		public createdAt: Date,
		public memberId: string,
		public categoryId: number,
		public updatedAt: Date | null = null,
		public deletedAt: Date | null = null,
		public description: string | null = null
	) {}
}
