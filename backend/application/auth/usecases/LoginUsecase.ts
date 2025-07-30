import { MemberRepository } from "@/backend/domain/repositories/MemberRepository";
import bcrypt from "bcryptjs";

export class LoginUsecase {
	constructor(private memberRepo: MemberRepository) {}

	async execute(username: string, password: string) {
		const member = await this.memberRepo.findByUsername(username);
		if (!member || !member.password) return null;

		// 실제 환경에서는 해시된 비밀번호 비교 필요
		const isValid = await bcrypt.compare(password, member.password);
		if (!isValid) return null;

		// roles는 예시로 ADMIN만 반환
		return {
			id: member.id,
			username: member.username,
			roles: member.memberRoles
				?.map((mr) => mr.role?.name)
				.filter(Boolean) as string[],
		};
	}
}
