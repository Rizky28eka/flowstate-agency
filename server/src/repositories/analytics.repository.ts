import prisma from '../config/db';

export class AnalyticsRepository {
    async getRevenue(organizationId: string) {
        const totalRevenue = await prisma.invoice.aggregate({
            _sum: { total: true },
            where: { status: 'PAID', organizationId },
        });
        return totalRevenue._sum.total || 0;
    }

    async getActiveClientsCount(organizationId: string) {
        return prisma.client.count({
            where: { status: 'ACTIVE', organizationId, deletedAt: null },
        });
    }

    async getActiveProjectsCount(organizationId: string) {
        return prisma.project.count({
            where: { status: 'ACTIVE', organizationId, deletedAt: null },
        });
    }

    async getCompletedTasksCount(organizationId: string) {
        return prisma.task.count({
            where: { status: 'DONE', project: { organizationId }, deletedAt: null },
        });
    }

    async getProjectStats(organizationId: string) {
        const stats = await prisma.project.groupBy({
            by: ['status'],
            where: { organizationId, deletedAt: null },
            _count: { id: true }
        });
        return stats.map(s => ({ name: s.status, value: s._count.id }));
    }

    async getMonthlyRevenue(organizationId: string) {
        // For simplicity, we'll return the last 7 months of paid invoices
        const now = new Date();
        const performanceData = [];

        for (let i = 6; i >= 0; i--) {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

            const monthRevenue = await prisma.invoice.aggregate({
                _sum: { total: true },
                where: {
                    status: 'PAID',
                    organizationId,
                    paidAt: { gte: startOfMonth, lte: endOfMonth }
                },
            });

            performanceData.push({
                name: startOfMonth.toLocaleString('default', { month: 'short' }),
                value: monthRevenue._sum.total || 0
            });
        }
        return performanceData;
    }

}

export default new AnalyticsRepository();
