import { GetMenuListDto } from "../../dto/GetMenuListDto";

export interface GetMenuListUsecase {
	execute(): Promise<GetMenuListDto>;
}
