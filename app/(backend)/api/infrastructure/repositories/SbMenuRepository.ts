import { SupabaseClient } from "@supabase/supabase-js";
import { MenuRepository } from "../../domain/repositories/MenuRepository";
import { Menu } from "../../domain/entities/Menu";
import { MenuTable } from "../../domain/tables/MenuTable";
import { MenuSearchCriteria } from "../../domain/repositories/criteria/MenuSearchCriteria";

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
			isPublic: menu.is_public,
			memberId: menu.member_id,
			categoryId: menu.category_id,
			updatedAt: menu.updated_at ? new Date(menu.updated_at) : null,
			deletedAt: menu.deleted_at ? new Date(menu.deleted_at) : null,
			description: menu.description,
		};
	}

	// MenuSearchCriteria를 이용해서 메뉴 목록 조회
	async findAll(criteria: MenuSearchCriteria): Promise<Menu[]> {
		let query = this.supabase.from("menu").select();

		// 공개 메뉴만 조회 (publicOnly가 true인 경우)
		if (criteria.publicOnly) {
			query = query.eq("is_public", true);
		}

		// 카테고리 필터링
		if (criteria.categoryId) {
			query = query.eq("category_id", criteria.categoryId);
		}

		// 검색어 필터링 (한글명 또는 영어명에 포함)
		if (criteria.searchWord) {
			query = query.or(
				`kor_name.ilike.%${criteria.searchWord}%,eng_name.ilike.%${criteria.searchWord}%`
			);
		}

		// 정렬 필드를 데이터베이스 컬럼명으로 매핑
		const getSortField = (field: string): string => {
			switch (field) {
				case "createdAt":
					return "created_at";
				case "updatedAt":
					return "updated_at";
				case "korName":
					return "kor_name";
				case "engName":
					return "eng_name";
				case "price":
					return "price";
				default:
					return "created_at"; // 기본값
			}
		};

		// 정렬
		if (criteria.sortField) {
			const dbSortField = getSortField(criteria.sortField);
			query = query.order(dbSortField, { ascending: criteria.ascending });
		} else {
			// 기본 정렬: 생성일 내림차순
			query = query.order("created_at", { ascending: false });
		}

		// 페이지네이션
		query = query.range(criteria.offset, criteria.offset + criteria.limit - 1);

		const { data, error } = await query;
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
