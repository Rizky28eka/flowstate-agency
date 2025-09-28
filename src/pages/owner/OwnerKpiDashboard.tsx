
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  reports,
  monthlyRevenueData,
  clientAcquisitionData,
  projects,
} from '@/lib/mock-data';
import {
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Heart,
  CheckCircle,
  Clock,
  Percent
} from 'lucide-react';

// --- KPI Calculation ---

// Financial KPIs
const totalRevenue = monthlyRevenueData.reduce((sum, month) => sum + month.revenue, 0);
const totalProfit = monthlyRevenueData.reduce((sum, month) => sum + month.profit, 0);
const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

// Client KPIs
const totalNewClients = clientAcquisitionData.reduce((sum, month) => sum + month.newClients, 0);
const totalLostClients = clientAcquisitionData.reduce((sum, month) => sum + month.lostClients, 0);
const netClientGrowth = totalNewClients - totalLostClients;
const clientSatisfactionReport = reports.find(r => r.type === 'Client');
const avgClientSatisfaction = clientSatisfactionReport?.data.averageSatisfaction || 0;

// Project KPIs
const totalProjects = projects.length;
const completedProjects = projects.filter(p => p.status === 'Completed').length;
const projectSuccessRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
const avgProjectProgress = projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects;

// Team KPIs
const teamUtilizationReport = reports.find(r => r.type === 'Resource');
const avgTeamUtilization = teamUtilizationReport?.data.averageUtilization || 0;

// --- Components ---

const KpiCard = ({ title, value, icon: Icon, footer, footerIcon: FooterIcon, footerColor }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      {footer && (
        <div className={`text-xs text-muted-foreground flex items-center mt-2 ${footerColor}`}>
          {FooterIcon && <FooterIcon className="h-3 w-3 mr-1"/>}
          {footer}
        </div>
      )}
    </CardContent>
  </Card>
);

const OwnerKpiDashboard = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Company KPI Dashboard</h1>
      <p className="text-gray-500 mb-8">A high-level overview of the most important business metrics.</p>

      {/* Financial Section */}
      <h2 className="text-xl font-semibold mb-4">Financials</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <KpiCard 
          title="Total Revenue (YTD)"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(totalRevenue)}
          icon={DollarSign}
          footer="Year-to-date performance"
        />
        <KpiCard 
          title="Net Profit (YTD)"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(totalProfit)}
          icon={DollarSign}
          footer={`Overall margin: ${profitMargin.toFixed(1)}%`}
          footerIcon={TrendingUp}
          footerColor="text-green-600"
        />
        <KpiCard 
          title="Profit Margin"
          value={`${profitMargin.toFixed(1)}%`}
          icon={Percent}
          footer="Target: 50%"
        />
      </div>

      {/* Client Section */}
      <h2 className="text-xl font-semibold mb-4">Clients & Growth</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <KpiCard 
          title="Net Client Growth (YTD)"
          value={`+${netClientGrowth}`}
          icon={Users}
          footer={`${totalNewClients} new vs. ${totalLostClients} lost`}
          footerIcon={netClientGrowth > 0 ? TrendingUp : TrendingDown}
          footerColor={netClientGrowth > 0 ? 'text-green-600' : 'text-red-600'}
        />
        <KpiCard 
          title="Avg. Client Satisfaction"
          value={`${avgClientSatisfaction} / 5.0`}
          icon={Heart}
          footer="Based on Q4 surveys"
        />
      </div>

      {/* Operations Section */}
      <h2 className="text-xl font-semibold mb-4">Projects & Operations</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <KpiCard 
          title="Project Success Rate"
          value={`${projectSuccessRate.toFixed(1)}%`}
          icon={CheckCircle}
          footer={`${completedProjects} of ${totalProjects} projects completed`}
        />
        <KpiCard 
          title="Average Project Progress"
          value={`${avgProjectProgress.toFixed(1)}%`}
          icon={Clock}
          footer="Across all active projects"
        />
        <KpiCard 
          title="Average Team Utilization"
          value={`${avgTeamUtilization}%`}
          icon={Target}
          footer="Target: 85-90%"
        />
      </div>

    </div>
  );
};

export default OwnerKpiDashboard;
