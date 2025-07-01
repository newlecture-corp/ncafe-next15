import { MenuSearchCriteria } from "./criteria/MenuSearchCriteria";
import { Menu } from "../entities/Menu";

export interface MenuRepository {
	// 조회 메소드들
	findAll(criteria: MenuSearchCriteria): Promise<Menu[]>;
	findById(id: number): Promise<Menu | null>;
	count(): Promise<number>;

	// 조작 메소드들
	save(menu: Menu): Promise<Menu>;
	update(menu: Menu): Promise<Menu>;
}
