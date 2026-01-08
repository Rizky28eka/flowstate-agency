import { PrismaClient, User, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                bio: true,
                phoneNumber: true,
                organizationId: true,
                roles: { include: { role: true } }
            },
        });
    }

    async findByOrganizationId(organizationId: string) {
        return this.prisma.user.findMany({
            where: { organizationId },
            include: {
                roles: { include: { role: true } },
                teams: { include: { team: true } },
            },
        });
    }

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data,
            include: {
                roles: { include: { role: true } },
                teams: { include: { team: true } },
            },
        });
    }

    async update(id: string, organizationId: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id, organizationId },
            data,
            include: {
                roles: { include: { role: true } },
                teams: { include: { team: true } },
            },
        });
    }

    async delete(id: string, organizationId: string) {
        return this.prisma.user.delete({
            where: { id, organizationId },
        });
    }
}

export default new UserRepository();
