export class MenuTable {
	constructor(
		public id: number,
		public kor_name: string,
		public eng_name: string,
		public price: number,
		public has_ice: boolean,
		public created_at: Date,
		public is_public: boolean,
		public member_id: string,
		public category_id: number,
		public updated_at: Date | null = null,
		public deleted_at: Date | null = null,
		public description: string | null = null
	) {}
}
