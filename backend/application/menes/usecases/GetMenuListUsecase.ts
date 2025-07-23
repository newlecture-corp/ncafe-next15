import { GetMenuListQueryDto } from "../dtos/GetMenuListQueryDto";
import { GetMenuListDto } from "../dtos/GetMenuListDto";
import { GetMenuDto } from "../dtos/GetMenuDto";
import { MenuRepository } from "@/backend/domain/repositories/MenuRepository";
import { Menu } from "@/backend/domain/entities/Menu";

// 실제로는 repository나 service를 주입받아야 하지만, 예시로 임시 데이터를 반환합니다.
export class GetMenuListUsecase {

    constructor(private readonly menuRepository: MenuRepository) {}

  async execute(query: GetMenuListQueryDto): Promise<GetMenuListDto> {
     
    const pageSize = 10;
    const offset = (query.pageNum - 1) * pageSize;
    const menus:Menu[] = await this.menuRepository.findAll({
      offset: offset,
      limit: pageSize,
      sortField: "korName",
      ascending: true,
      publicOnly: false,
      searchWord: query.query,
      categoryId: query.categoryId,
      memberId: query.memberId,
    });

    const getMenuDtos:GetMenuDto[] = menus.map((menu) => {
        const dto = new GetMenuDto();        
        dto.id = menu.id!;
        dto.korName = menu.korName!;
        dto.engName = menu.engName!;
        dto.price = menu.price!;
        dto.description = menu.description!;
        dto.defaultImage = "";
        return dto;
    });

    const endPage = Math.ceil(menus.length / 10);
    return {
        menus: getMenuDtos,
        endPage,
    };
  }
}
