import { SupabaseClient } from "@supabase/supabase-js";
import { MenuRepository } from "../../domain/repository/MenuRepository";
import { Menu } from "../../domain/entities/Menu";
import { MenuTable } from "../../domain/entities/MenuTable";

// 메뉴 리포지토리 구현체
export class SbMenuRepository implements MenuRepository {
	private supabase;

	constructor(supabase: SupabaseClient) {
		this.supabase = supabase;
	}

	// 데이터베이스 데이터를 도메인 엔티티로 변환
	private static mapToMenu(menu: MenuTable): Menu {
		return {
			id: menu.id,
			korName: menu.kor_name,
			engName: menu.eng_name,
			price: menu.price,
			hasIce: menu.has_ice,
			createdAt: new Date(menu.created_at),
			memberId: menu.member_id,
			categoryId: menu.category_id,
			updatedAt: menu.updated_at ? new Date(menu.updated_at) : null,
		} as Menu;
	}

	// 모든 메뉴 조회
	async findAll(): Promise<Menu[]> {
		const { data, error } = await this.supabase.from("menu").select();
		if (error) throw new Error(error.message);
		return data.map((menu) => SbMenuRepository.mapToMenu(menu)) as Menu[];
	}

	// 특정 메뉴 조회
	async findById(id: number): Promise<Menu | null> {
		const { data, error } = await this.supabase
			.from("menu")
			.select()
			.eq("id", id)
			.single();
		if (error) throw new Error(error.message);
		return SbMenuRepository.mapToMenu(data);
	}

	// 메뉴 개수 조회
	async count(): Promise<number> {
		const { data, error } = await this.supabase
			.from("menu")
			.select("*", { count: "exact" });
		if (error) throw new Error(error.message);
		return data.length;
	}

	// 메뉴 저장
	async save(menu: Menu): Promise<Menu> {
		const { data, error } = await this.supabase
			.from("menu")
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
			.from("menu")
			.update(menu)
			.eq("id", menu.id)
			.select()
			.single();
		if (error) throw new Error(error.message);
		return data as Menu;
	}
}
