import { PrismaClient, Project, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class ProjectRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findMany(organizationId: string) {
        return this.prisma.project.findMany({
            where: { organizationId },
            include: { client: true, team: true, tasks: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string, organizationId: string) {
        return this.prisma.project.findFirst({
            where: { id, organizationId },
            include: {
                client: true,
                team: true,
                tasks: {
                    include: {
                        assignee: true
                    }
                },
                milestones: true,
                documents: true
            }
        });
    }


    async create(data: Prisma.ProjectCreateInput) {
        return this.prisma.project.create({
            data,
            include: { client: true, team: true },
        });
    }

    async update(id: string, organizationId: string, data: Prisma.ProjectUpdateInput) {
        return this.prisma.project.update({
            where: { id, organizationId },
            data,
            include: { client: true, team: true },
        });
    }

    async delete(id: string, organizationId: string) {
        return this.prisma.project.delete({
            where: { id, organizationId },
        });
    }
}

export default new ProjectRepository();
