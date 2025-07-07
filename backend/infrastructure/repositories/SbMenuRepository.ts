import { SupabaseClient } from "@supabase/supabase-js";
import { MenuRepository } from "../../domain/repositories/MenuRepository";
import { Menu } from "../../domain/entities/Menu";
import {
	MenuSearchCriteria,
	MenuRelationsOptions,
} from "../../domain/repositories/criteria/MenuSearchCriteria";
import { MenuImage } from "../../domain/entities/MenuImage";

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
	private static mapToMenu(menu: {
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
		}[];
	}): Menu {
		const menuImages =
			menu.images?.map(
				(image) =>
					new MenuImage(image.id, image.name, image.is_default, menu.id)
			) || [];

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
			menu.description,
			menuImages
		);
	}

	/*
	findAll, count 메서드에서 공통으로 사용하는 필터링, 정렬, 검색 필드 매핑 코드를 집중화한 메서드
	*/
	private buildMenuQuery(
		base: string,
		selectStr: string,
		criteria: MenuSearchCriteria,
		options?: {
			skipSort?: boolean;
			skipPagination?: boolean;
			isCount?: boolean;
		}
	) {
		let query = this.supabase
			.from(base)
			.select(selectStr, options?.isCount ? { count: "exact" } : undefined);

		// criteria가 undefined인 경우 처리
		if (!criteria) {
			console.log("============== criteria가 undefined입니다!");
			return query;
		}

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

		// 정렬 (skipSort이 true가 아닌 경우에만)
		if (!options?.skipSort) {
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

			if (criteria.sortField) {
				const dbSortField = getSortField(criteria.sortField);
				query = query.order(dbSortField, { ascending: criteria.ascending });
			} else {
				// 기본 정렬: 생성일 내림차순
				query = query.order("created_at", { ascending: false });
			}
		}

		// 페이지네이션 (skipPagination이 true가 아닌 경우에만)
		if (!options?.skipPagination) {
			query = query.range(
				criteria.offset,
				criteria.offset + criteria.limit - 1
			);
		}

		return query;
	}

	// MenuSearchCriteria를 이용해서 메뉴 목록 조회
	async findAll(
		criteria: MenuSearchCriteria,
		relations?: MenuRelationsOptions
	): Promise<Menu[]> {
		// 관계 데이터 포함 여부에 따라 select 쿼리 결정
		const selectArr = ["*"];
		if (relations?.includeImages) {
			selectArr.push("images:menu_images(id,name,is_default)");
		}
		if (relations?.includeMember) {
			selectArr.push("member:members(id,name,email)");
		}
		const selectStr = selectArr.join(", ");

		const query = this.buildMenuQuery("menus", selectStr, criteria);
		const { data, error } = await query;
		if (error) throw new Error(error.message);

		return (data as unknown as MenuTable[]).map(
			SbMenuRepository.mapToMenu
		) as Menu[];
	}

	// 특정 메뉴 조회
	async findById(
		id: number,
		relations?: MenuRelationsOptions
	): Promise<Menu | null> {
		// 관계 데이터 포함 여부에 따라 select 쿼리 결정
		const selectArr = ["*"];
		if (relations?.includeImages) {
			selectArr.push("images:menu_images(id,name,is_default)");
		}
		if (relations?.includeMember) {
			selectArr.push("member:members(id,name,email)");
		}
		const selectStr = selectArr.join(", ");

		const { data, error } = await this.supabase
			.from("menus")
			.select(selectStr)
			.eq("id", id)
			.single();
		if (error) throw new Error(error.message);
		if (!data) return null;
		return SbMenuRepository.mapToMenu(data as unknown as MenuTable);
	}

	// 메뉴 개수 조회 (필터링된 레코드 수)
	async count(criteria: MenuSearchCriteria): Promise<number> {
		const query = this.buildMenuQuery("menus", "*", criteria, {
			skipSort: true,
			skipPagination: true,
			isCount: true,
		});
		const { count, error } = await query;
		if (error) throw new Error(error.message);
		return count ?? 0;
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
