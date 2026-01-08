import { PrismaClient, Organization, Role, Permission, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class OrganizationRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findById(id: string) {
        return this.prisma.organization.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Prisma.OrganizationUpdateInput) {
        return this.prisma.organization.update({
            where: { id },
            data,
        });
    }

    async findSettings(id: string) {
        return this.prisma.organization.findUnique({
            where: { id },
            select: { settings: true },
        });
    }

    async updateSettings(id: string, settings: Prisma.InputJsonValue) {
        return this.prisma.organization.update({
            where: { id },
            data: { settings },
            select: { settings: true },
        });
    }

    async findRoles(organizationId: string) {
        return this.prisma.role.findMany({
            where: { organizationId },
            include: { permissions: { include: { permission: true } } },
        });
    }

    async findPermissions(organizationId: string) {
        return this.prisma.permission.findMany({
            where: { organizationId },
        });
    }

    async findRoleById(id: string) {
        return this.prisma.role.findUnique({
            where: { id },
            include: { permissions: { include: { permission: true } } },
        });
    }

    async updateRolePermissions(roleId: string, permissionIds: string[]) {
        await this.prisma.rolePermission.deleteMany({
            where: { roleId },
        });

        const newRolePermissions = permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        }));

        await this.prisma.rolePermission.createMany({
            data: newRolePermissions,
        });

        return this.findRoleById(roleId);
    }
}

export default new OrganizationRepository();
