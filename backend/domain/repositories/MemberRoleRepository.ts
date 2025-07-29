import { MemberRole } from "../entities/MemberRole";
import { MemberRoleRelationsOptions } from "./options/MemberRoleRelationsOptions";

export interface MemberRoleRepository {
	findAll(relations?: MemberRoleRelationsOptions): Promise<MemberRole[]>;
	findByMemberId(
		memberId: string,
		relations?: MemberRoleRelationsOptions
	): Promise<MemberRole | null>;
	save(memberRole: MemberRole): Promise<MemberRole>;
	delete(memberId: string, roleId: number): Promise<void>;
}
