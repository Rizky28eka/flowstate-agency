import { PrismaClient, Invoice, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class InvoiceRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findMany(organizationId: string) {
        return this.prisma.invoice.findMany({
            where: { organizationId },
            include: {
                client: true,
                project: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string, organizationId: string) {
        return this.prisma.invoice.findFirst({
            where: { id, organizationId },
            include: {
                client: true,
                project: true,
                items: true
            }
        });
    }

    async create(data: Prisma.InvoiceCreateInput) {
        return this.prisma.invoice.create({
            data,
            include: {
                client: true,
                project: true,
                items: true
            },
        });
    }

    async update(id: string, organizationId: string, data: Prisma.InvoiceUpdateInput) {
        return this.prisma.invoice.update({
            where: { id, organizationId },
            data,
            include: {
                client: true,
                project: true,
                items: true
            },
        });
    }

    async delete(id: string, organizationId: string) {
        return this.prisma.invoice.delete({
            where: { id, organizationId },
        });
    }
}

export default new InvoiceRepository();
