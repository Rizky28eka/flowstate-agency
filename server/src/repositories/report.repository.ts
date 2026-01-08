import { PrismaClient, Report, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class ReportRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findMany(organizationId: string) {
        return this.prisma.report.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' }
        });
    }

    async create(data: Prisma.ReportCreateInput) {
        return this.prisma.report.create({
            data,
        });
    }
}

export default new ReportRepository();
