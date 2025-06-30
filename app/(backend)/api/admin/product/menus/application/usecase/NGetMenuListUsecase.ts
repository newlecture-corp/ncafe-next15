import { GetMenuListDto } from "../dto/GetMenuListDto";
import { MenuRepository } from "@/app/(backend)/api/domain/repository/MenuRepository";
import { GetMenuListUsecase } from "../port/in/GetMenuListUsecase";
import { Menu } from "@/app/(backend)/api/domain/entities/Menu";
import { MenuDto } from "../dto/MenuDto";

// 관리자를 위한 메뉴 목록 조회 Usecase
export class NGetMenuListUsecase implements GetMenuListUsecase {
	// 의존성 주입을 위한 의존 객체
	private repository: MenuRepository;

	// 생성자에서 의존성 주입
	constructor(repository: MenuRepository) {
		this.repository = repository;
	}

	// 메뉴 목록 반환 메서드
	async execute(): Promise<GetMenuListDto> {
		// 메뉴 목록 및 전체 개수 조회
		const menus: Menu[] = await this.repository.findAll();

		// 메뉴 목록을 DTO로 변환
		const menuDtos: MenuDto[] = menus.map((menu) => ({
			...menu,
			defaultImage: "americano.png",
		}));

		// 메뉴 목록 DTO 생성 및 반환
		return {
			menus: menuDtos,
			currentPage: 1,
			endPage: 1,
		};
	}
}
