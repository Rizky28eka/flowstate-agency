import { PrismaClient, Task, Prisma } from '@prisma/client';
import prisma from '../config/db';

export class TaskRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findMany(organizationId: string, projectId?: string) {
        return this.prisma.task.findMany({
            where: {
                project: { organizationId },
                ...(projectId && { projectId })
            },
            include: {
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true
                    }
                },
                project: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { position: 'asc' }
        });
    }

    async findById(id: string, organizationId: string) {
        return this.prisma.task.findFirst({
            where: {
                id,
                project: { organizationId }
            },
            include: {
                assignee: true,
                project: true,
                comments: {
                    include: {
                        author: true
                    }
                },

                documents: true
            }
        });
    }

    async create(data: Prisma.TaskCreateInput) {
        return this.prisma.task.create({
            data,
            include: {
                assignee: true,
                project: true
            },
        });
    }

    async update(id: string, organizationId: string, data: Prisma.TaskUpdateInput) {
        return this.prisma.task.update({
            where: {
                id,
                project: { organizationId }
            },
            data,
            include: {
                assignee: true,
                project: true
            },
        });
    }

    async delete(id: string, organizationId: string) {
        return this.prisma.task.delete({
            where: {
                id,
                project: { organizationId }
            },
        });
    }
}

export default new TaskRepository();
