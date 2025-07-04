import { SupabaseClient } from "@supabase/supabase-js";
import { MenuRepository } from "../../domain/repositories/MenuRepository";
import { Menu } from "../../domain/entities/Menu";

interface MenuTable {
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
}

// 메뉴 리포지토리 구현체
export class SbMenuRepository implements MenuRepository {
	private supabase;

	constructor(supabase: SupabaseClient) {
		this.supabase = supabase;
	}

	// 데이터베이스 데이터를 도메인 엔티티로 변환
	private static mapToMenu(menu: MenuTable): Menu {
		return new Menu(
			menu.id,
			menu.kor_name,
			menu.eng_name,
			menu.price,
			menu.has_ice,
			new Date(menu.created_at),
			menu.is_public,
			menu.member_id,
			menu.category_id,
			menu.updated_at ? new Date(menu.updated_at) : null,
			menu.deleted_at ? new Date(menu.deleted_at) : null,
			menu.description
		);
	}

	// 모든 메뉴 조회
	async findAll(): Promise<Menu[]> {
		const { data, error } = await this.supabase.from("menus").select();
		if (error) throw new Error(error.message);
		return data.map((menu) => SbMenuRepository.mapToMenu(menu)) as Menu[];
	}

	// 특정 메뉴 조회
	async findById(id: number): Promise<Menu | null> {
		const { data, error } = await this.supabase
			.from("menus")
			.select()
			.eq("id", id)
			.single();
		if (error) throw new Error(error.message);
		return SbMenuRepository.mapToMenu(data);
	}

	// 메뉴 개수 조회
	async count(): Promise<number> {
		const { data, error } = await this.supabase
			.from("menus")
			.select("*", { count: "exact" });
		if (error) throw new Error(error.message);
		return data.length;
	}

	// 메뉴 저장
	async save(menu: Menu): Promise<Menu> {
		const { data, error } = await this.supabase
			.from("menus")
			.insert([menu])
			.select()
			.single();
		if (error) throw new Error(error.message);
		return data as Menu;
	}

	// 메뉴 수정
	async update(menu: Menu): Promise<Menu> {
		if (!menu.id) throw new Error("Menu id is required for update");
		const { data, error } = await this.supabase
			.from("menus")
			.update(menu)
			.eq("id", menu.id)
			.select()
			.single();
		if (error) throw new Error(error.message);
		return data as Menu;
	}
}
