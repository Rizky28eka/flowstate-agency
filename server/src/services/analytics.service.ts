import analyticsRepository from '../repositories/analytics.repository';

export class AnalyticsService {
    async getDashboardData(organizationId: string) {
        const [
            revenue,
            totalClients,
            activeProjects,
            completedTasks,
            revenueData,
            projectStats
        ] = await Promise.all([
            analyticsRepository.getRevenue(organizationId),
            analyticsRepository.getActiveClientsCount(organizationId),
            analyticsRepository.getActiveProjectsCount(organizationId),
            analyticsRepository.getCompletedTasksCount(organizationId),
            analyticsRepository.getMonthlyRevenue(organizationId),
            analyticsRepository.getProjectStats(organizationId)
        ]);

        return {
            revenue,
            totalClients,
            activeProjects,
            completedTasks,
            revenueData,
            projectStats
        };
    }

}

export default new AnalyticsService();
