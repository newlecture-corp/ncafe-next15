import { GetMenuListDto } from "../../dtos/GetMenuListDto";
import { GetMenuListQueryDto } from "../../dtos/GetMenuListQueryDto";

export interface GetMenuListUsecase {
	execute(queryDto: GetMenuListQueryDto): Promise<GetMenuListDto>;
}
