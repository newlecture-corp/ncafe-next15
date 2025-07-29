import { MemberRepository } from "@/backend/domain/repositories/MemberRepository";
import { Member } from "@/backend/domain/entities/Member";
import prisma from "@/utils/prisma";
import { MemberRelationsOptions } from "@/backend/domain/repositories/options/MemberRelationsOptions";

export class PrMemberRepository implements MemberRepository {
	async findByUsername(username: string): Promise<Member | null> {
		const member = await prisma.member.findUnique({ where: { username } });
		return member as Member | null;
	}

	async findAll(relations?: MemberRelationsOptions): Promise<Member[]> {
		const include: Record<string, boolean> = {};
		if (relations?.includeMenus) include.menus = true;
		const members = await prisma.member.findMany({ include });
		return members as Member[];
	}

	async findByMemberId(
		id: string,
		relations?: MemberRelationsOptions
	): Promise<Member | null> {
		const include: Record<string, boolean> = {};
		if (relations?.includeMenus) include.menus = true;
		const member = await prisma.member.findUnique({
			where: { id },
			include,
		});
		return member as Member | null;
	}

	async save(member: Member): Promise<Member> {
		const created = await prisma.member.create({
			data: {
				username: member.username,
				password: member.password,
				email: member.email,
				phone: member.phone,
				createdAt: member.createdAt,
				updatedAt: member.updatedAt,
			},
		});
		return created as Member;
	}

	async update(member: Member): Promise<Member> {
		const updated = await prisma.member.update({
			where: { id: member.id },
			data: {
				username: member.username,
				password: member.password,
			},
		});

		return updated as Member;
	}

	async delete(id: string): Promise<void> {
		await prisma.member.delete({ where: { id } });
	}
}
