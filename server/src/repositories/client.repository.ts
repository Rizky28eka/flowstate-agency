import { PrismaClient, Client, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class ClientRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findMany(organizationId: string) {
        return this.prisma.client.findMany({
            where: { organizationId },
            include: {
                projects: true
            },
        });
    }

    async findById(id: string, organizationId: string) {
        return this.prisma.client.findUnique({
            where: { id, organizationId },
            include: {
                projects: {
                    include: {
                        invoices: true,
                        tasks: true,
                    }
                }
            },
        });
    }

    async create(data: Prisma.ClientCreateInput) {
        return this.prisma.client.create({
            data,
        });
    }

    async update(id: string, organizationId: string, data: Prisma.ClientUpdateInput) {
        return this.prisma.client.update({
            where: { id, organizationId },
            data,
        });
    }

    async delete(id: string, organizationId: string) {
        return this.prisma.client.delete({
            where: { id, organizationId },
        });
    }
}

export default new ClientRepository();
